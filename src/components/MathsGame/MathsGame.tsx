import React, { useState, useEffect, useRef } from "react";
import { validateEquation } from "./utils";
import { getRandomEquation, type Equation } from "../../data/equations";

export const MathsGame = () => {
  const [currentEquation, setCurrentEquation] = useState<Equation | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [usedOptions, setUsedOptions] = useState<Set<number>>(new Set());
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [isPaused, setIsPaused] = useState(false);
  const [usedEquations, setUsedEquations] = useState<Set<string>>(new Set());
  const [showIntro, setShowIntro] = useState(() => {
    const hasSeenIntro = localStorage.getItem("mathsGameIntroSeen");
    return hasSeenIntro !== "true";
  });
  const [wrongAnswerDisplay, setWrongAnswerDisplay] = useState<string | null>(
    null
  );
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const timerRef = useRef<number | null>(null);

  // Initialize first equation
  useEffect(() => {
    loadNewEquation();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isChecking && !showIntro && !isPaused) {
      timerRef.current = window.setTimeout(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isChecking && !showIntro) {
      handleTimeout();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isChecking, showIntro, isPaused]);

  // Handle keyboard input for number selection and navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isChecking || showIntro) return;

      // Number keys 0-9
      if (/^[0-9]$/.test(e.key)) {
        const digit = parseInt(e.key);
        const availableOptions =
          currentEquation?.options.filter((opt) => !usedOptions.has(opt)) || [];

        // Find available option that matches this digit
        const matchingOption = availableOptions.find((opt) => {
          const optStr = opt.toString();
          return (
            optStr === digit.toString() || optStr.startsWith(digit.toString())
          );
        });

        if (matchingOption !== undefined) {
          handleNumberClick(matchingOption);
        }
      }

      // Arrow keys to navigate slots
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const direction = e.key === "ArrowLeft" ? -1 : 1;
        const newSlot = activeSlot + direction;
        if (newSlot >= 0 && newSlot < userAnswers.length) {
          setActiveSlot(newSlot);
        }
      }

      // Enter to check answer
      if (e.key === "Enter") {
        const allFilled = userAnswers.every((a) => a !== null);
        if (allFilled) {
          handleCheck();
        }
      }

      // Delete/Backspace to undo
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    isChecking,
    showIntro,
    usedOptions,
    activeSlot,
    userAnswers,
    currentEquation,
  ]);

  const loadNewEquation = () => {
    const equation = getRandomEquation(difficulty, usedEquations);
    setCurrentEquation(equation);
    setUserAnswers(Array(equation.answers.length).fill(null));
    setUsedOptions(new Set());
    setActiveSlot(0);
    setTimeLeft(equation.timeLimit);
    setFeedback(null);
    setWrongAnswerDisplay(null);
    setIsChecking(false);
  };

  const handleNumberClick = (num: number) => {
    if (isChecking) return;

    // Count how many times this number appears in options
    const totalAvailable =
      currentEquation?.options.filter((opt) => opt === num).length || 0;
    // Count how many times we've already used it
    const timesUsed = userAnswers.filter((a) => a === num).length;

    // Don't allow if we've used all available instances
    if (timesUsed >= totalAvailable) return;

    const newAnswers = [...userAnswers];
    newAnswers[activeSlot] = num;
    setUserAnswers(newAnswers);

    const newUsed = new Set(usedOptions);
    newUsed.add(num);
    setUsedOptions(newUsed);

    // Move to next empty slot
    const nextSlot = newAnswers.findIndex(
      (a, i) => i > activeSlot && a === null
    );
    if (nextSlot !== -1) {
      setActiveSlot(nextSlot);
    }
  };

  const handleUndo = () => {
    if (isChecking) return;

    // Find the last filled slot
    let lastFilledSlot = -1;
    for (let i = userAnswers.length - 1; i >= 0; i--) {
      if (userAnswers[i] !== null) {
        lastFilledSlot = i;
        break;
      }
    }

    if (lastFilledSlot !== -1) {
      const removedNum = userAnswers[lastFilledSlot];
      const newAnswers = [...userAnswers];
      newAnswers[lastFilledSlot] = null;
      setUserAnswers(newAnswers);

      if (removedNum !== null) {
        const newUsed = new Set(usedOptions);
        newUsed.delete(removedNum);
        setUsedOptions(newUsed);
      }

      setActiveSlot(lastFilledSlot);
    }
  };

  const handleCheck = () => {
    if (!currentEquation || userAnswers.some((a) => a === null)) return;

    setIsChecking(true);

    // Validate the equation mathematically
    const isCorrect = validateEquation(
      currentEquation.equation,
      userAnswers as number[],
      currentEquation.category
    );

    setFeedback(isCorrect ? "correct" : "incorrect");

    // Calculate wrong answer for display
    if (!isCorrect) {
      const [a, b] = userAnswers as number[];
      let result = 0;
      switch (currentEquation.category) {
        case "addition":
          result = a + b;
          break;
        case "subtraction":
          result = a - b;
          break;
        case "multiplication":
          result = a * b;
          break;
        case "division":
          result = a / b;
          break;
      }

      const operator =
        currentEquation.category === "addition"
          ? "+"
          : currentEquation.category === "subtraction"
          ? "-"
          : currentEquation.category === "multiplication"
          ? "×"
          : "÷";

      setWrongAnswerDisplay(`${a} ${operator} ${b} = ${result}`);
    }

    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      setUsedEquations((prev) => new Set([...prev, currentEquation.id]));

      setTimeout(() => {
        loadNewEquation();
      }, 3000);
    } else {
      setStreak(0);

      setTimeout(() => {
        setUserAnswers(Array(currentEquation.answers.length).fill(null));
        setUsedOptions(new Set());
        setActiveSlot(0);
        setTimeLeft(currentEquation.timeLimit);
        setFeedback(null);
        setWrongAnswerDisplay(null);
        setIsChecking(false);
      }, 3000);
    }
  };

  const handleTimeout = () => {
    setFeedback("incorrect");
    setStreak(0);
    setIsChecking(true);

    setTimeout(() => {
      loadNewEquation();
    }, 3000);
  };

  if (!currentEquation) return null;

  // Parse equation to render with slots
  const renderEquation = () => {
    const parts = currentEquation.equation.split("_");
    const elements: React.ReactElement[] = [];

    parts.forEach((part, idx) => {
      if (idx > 0) {
        // Add answer slot before this part
        const slotIdx = idx - 1;
        const isActive = slotIdx === activeSlot && !isChecking;
        const answer = userAnswers[slotIdx];

        elements.push(
          <span
            key={`slot-${slotIdx}`}
            onClick={() => !isChecking && setActiveSlot(slotIdx)}
            className={`
              inline-block min-w-[50px] sm:min-w-[60px] md:min-w-[80px] text-center mx-1 sm:mx-2 px-2 sm:px-3 md:px-4 py-1 sm:py-2 
              border-b-4 border-dashed cursor-pointer transition-all
              ${isActive ? "border-yellow-400 scale-110" : "border-gray-400"}
              ${answer !== null ? "text-yellow-300" : "text-gray-500"}
            `}
          >
            {answer !== null ? answer : "?"}
          </span>
        );
      }

      if (part.trim()) {
        elements.push(
          <span key={`text-${idx}`} className="mx-0.5 sm:mx-1">
            {part}
          </span>
        );
      }
    });

    return elements;
  };

  const allFilled = userAnswers.every((a) => a !== null);
  const availableOptions = currentEquation.options.filter((opt) => {
    const timesInOptions = currentEquation.options.filter(
      (o) => o === opt
    ).length;
    const timesUsed = userAnswers.filter((a) => a === opt).length;
    return timesUsed < timesInOptions;
  });
  // Get unique available options for display
  const uniqueAvailableOptions = Array.from(new Set(availableOptions));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 p-3 sm:p-6 md:p-8">
      {/* Intro Modal */}
      {showIntro && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 md:p-12 max-w-2xl w-full border-4 border-purple-500 shadow-2xl shadow-purple-500/50 max-h-[90vh] overflow-y-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Welcome to Maths Challenge! 🧮
            </h1>
            <div className="text-gray-300 space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-base sm:text-lg">
              <p>
                <strong className="text-purple-400">Goal:</strong> Fill in the
                blanks to complete the equation correctly!
              </p>
              <p>
                <strong className="text-purple-400">How to play:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Tap number cards to fill the blanks</li>
                <li>Or type numbers on your keyboard</li>
                <li>Use arrow keys to move between blanks</li>
                <li>Press Delete/Backspace to undo</li>
                <li>Press Enter to check your answer</li>
              </ul>
              <p>
                <strong className="text-purple-400">Beat the clock:</strong>{" "}
                Complete each equation before time runs out!
              </p>
            </div>
            <button
              onClick={() => {
                localStorage.setItem("mathsGameIntroSeen", "true");
                setShowIntro(false);
              }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold text-xl sm:text-2xl py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all"
            >
              Let's Go! 🚀
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Maths Challenge
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              {currentEquation.title}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
            <div className="text-center flex-1 sm:flex-initial">
              <div className="text-xs sm:text-sm text-gray-400 mb-1">Score</div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400">
                {score}
              </div>
            </div>
            <div className="text-center flex-1 sm:flex-initial">
              <div className="text-xs sm:text-sm text-gray-400 mb-1">
                Streak
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400">
                {streak}
              </div>
            </div>
            <div className="text-center flex-1 sm:flex-initial">
              <div className="text-xs sm:text-sm text-gray-400 mb-1">Time</div>
              <div
                className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                  timeLeft <= 10
                    ? "text-red-400 animate-pulse"
                    : "text-blue-400"
                }`}
              >
                {timeLeft}s
              </div>
              <div className="flex gap-1 sm:gap-2 mt-2">
                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value as "easy" | "medium" | "hard")
                  }
                  className="text-xs bg-gray-700 text-white px-1.5 sm:px-2 py-1 rounded"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <button
                  onClick={() => {
                    setIsPaused(!isPaused);
                    if (isPaused) loadNewEquation();
                  }}
                  className="text-xs bg-blue-600 hover:bg-blue-500 px-2 sm:px-3 py-1 rounded transition-colors"
                >
                  {isPaused ? "▶" : "⏸"}
                </button>
                <button
                  onClick={() => {
                    setIsPaused(false);
                    loadNewEquation();
                  }}
                  className="text-xs bg-purple-600 hover:bg-purple-500 px-2 sm:px-3 py-1 rounded transition-colors"
                >
                  🔄
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chalkboard */}
        <div
          className={`
          relative bg-gradient-to-br from-slate-800 to-slate-900 
          rounded-xl p-4 sm:p-8 md:p-12 mb-4 sm:mb-6 md:mb-8 shadow-2xl border-4 
          ${
            feedback === "correct"
              ? "border-green-500 shadow-green-500/50"
              : feedback === "incorrect"
              ? "border-red-500 shadow-red-500/50"
              : "border-slate-700"
          }
          transition-all duration-300
        `}
        >
          {/* Chalk dust texture overlay */}
          <div className="absolute inset-0 opacity-10 rounded-xl pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

          <div
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-wider break-words"
            style={{
              fontFamily: "'Courier New', monospace",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              color: "#f0f0e8",
            }}
          >
            {renderEquation()}
          </div>

          {/* Feedback message */}
          {feedback && (
            <div
              className={`
              absolute inset-0 flex items-center justify-center 
              bg-black/60 rounded-xl backdrop-blur-sm
            `}
            >
              <div className="text-center p-4">
                <div
                  className={`
                  text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4
                  ${feedback === "correct" ? "text-green-400" : "text-red-400"}
                  animate-bounce
                `}
                >
                  {feedback === "correct" ? "🎉 Correct!" : "❌ Try Again!"}
                </div>
                {wrongAnswerDisplay && (
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300 mt-2 sm:mt-4">
                    {wrongAnswerDisplay}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Number Cards */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-gray-300">
            Choose your numbers:
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {uniqueAvailableOptions.map((num) => {
              const totalAvailable = currentEquation.options.filter(
                (opt) => opt === num
              ).length;
              const timesUsed = userAnswers.filter((a) => a === num).length;
              const remaining = totalAvailable - timesUsed;

              return (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  disabled={isChecking || remaining === 0}
                  className={`
            relative group
            bg-gradient-to-br from-cyan-500 to-blue-600
            hover:from-cyan-400 hover:to-blue-500
            active:scale-95
            text-white font-bold text-2xl sm:text-3xl
            rounded-xl p-4 sm:p-5 md:p-6 
            shadow-lg hover:shadow-cyan-500/50
            transform hover:scale-105 hover:-translate-y-1
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:transform-none
            border-2 border-cyan-300/30
            min-h-[60px] sm:min-h-[70px] md:min-h-[80px]
          `}
                >
                  <div className="relative z-10">{num}</div>
                  {remaining > 1 && (
                    <div className="absolute top-1 right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {remaining}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
          <button
            onClick={handleUndo}
            disabled={isChecking || userAnswers.every((a) => a === null)}
            className="
              bg-gray-700 hover:bg-gray-600
              active:scale-95
              text-white font-semibold px-4 sm:px-6 py-3 rounded-lg
              transition-all
              disabled:opacity-30 disabled:cursor-not-allowed
              min-h-[48px]
            "
          >
            ⌫ Undo
          </button>

          <button
            onClick={handleCheck}
            disabled={!allFilled || isChecking}
            className="
              bg-gradient-to-r from-green-500 to-emerald-600
              hover:from-green-400 hover:to-emerald-500
              active:scale-95
              text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 rounded-lg
              shadow-lg hover:shadow-green-500/50
              transform hover:scale-105
              transition-all
              disabled:opacity-30 disabled:cursor-not-allowed
              disabled:transform-none
              min-h-[48px]
            "
          >
            Check Answer ✓
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 sm:mt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>Tap number cards or type numbers to fill in the blanks</p>
          <p className="mt-1 hidden sm:block">
            Arrow keys to navigate • Delete/Backspace to undo • Enter to check
          </p>
        </div>
      </div>
    </div>
  );
};
