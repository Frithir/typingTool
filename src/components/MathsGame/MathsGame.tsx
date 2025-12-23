import { useState, useEffect, useRef } from "react";
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
  const [usedEquations, setUsedEquations] = useState<Set<string>>(new Set());
  const timerRef = useRef<number | null>(null);

  // Initialize first equation
  useEffect(() => {
    loadNewEquation();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isChecking) {
      timerRef.current = window.setTimeout(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isChecking) {
      handleTimeout();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isChecking]);

  // Handle delete key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        handleUndo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlot, userAnswers, usedOptions]);

  const loadNewEquation = () => {
    const equation = getRandomEquation("easy", usedEquations);
    setCurrentEquation(equation);
    setUserAnswers(Array(equation.answers.length).fill(null));
    setUsedOptions(new Set());
    setActiveSlot(0);
    setTimeLeft(equation.timeLimit);
    setFeedback(null);
    setIsChecking(false);
  };

  const handleNumberClick = (num: number) => {
    if (isChecking || usedOptions.has(num)) return;

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
    const elements: JSX.Element[] = [];

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
              inline-block min-w-[80px] text-center mx-2 px-4 py-2 
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
          <span key={`text-${idx}`} className="mx-1">
            {part}
          </span>
        );
      }
    });

    return elements;
  };

  const allFilled = userAnswers.every((a) => a !== null);
  const availableOptions = currentEquation.options.filter(
    (opt) => !usedOptions.has(opt)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Maths Challenge
            </h1>
            <p className="text-gray-400">{currentEquation.title}</p>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Score</div>
              <div className="text-3xl font-bold text-green-400">{score}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Streak</div>
              <div className="text-3xl font-bold text-orange-400">{streak}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Time</div>
              <div
                className={`text-3xl font-bold ${
                  timeLeft <= 10
                    ? "text-red-400 animate-pulse"
                    : "text-blue-400"
                }`}
              >
                {timeLeft}s
              </div>
            </div>
          </div>
        </div>

        {/* Chalkboard */}
        <div
          className={`
          relative bg-gradient-to-br from-slate-800 to-slate-900 
          rounded-xl p-12 mb-8 shadow-2xl border-4 
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
            className="text-6xl font-bold text-center tracking-wider"
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
              <div
                className={`
                text-5xl font-bold
                ${feedback === "correct" ? "text-green-400" : "text-red-400"}
                animate-bounce
              `}
              >
                {feedback === "correct" ? "🎉 Correct!" : "❌ Try Again!"}
              </div>
            </div>
          )}
        </div>

        {/* Number Cards */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">
            Choose your numbers:
          </h3>
          <div className="grid grid-cols-6 gap-4">
            {availableOptions.map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                disabled={isChecking}
                className={`
                  relative group
                  bg-gradient-to-br from-cyan-500 to-blue-600
                  hover:from-cyan-400 hover:to-blue-500
                  text-white font-bold text-3xl
                  rounded-xl p-6 
                  shadow-lg hover:shadow-cyan-500/50
                  transform hover:scale-110 hover:-translate-y-1
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  disabled:transform-none
                  border-2 border-cyan-300/30
                `}
              >
                <div className="relative z-10">{num}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center items-center">
          <button
            onClick={handleUndo}
            disabled={isChecking || userAnswers.every((a) => a === null)}
            className="
              bg-gray-700 hover:bg-gray-600
              text-white font-semibold px-6 py-3 rounded-lg
              transition-colors
              disabled:opacity-30 disabled:cursor-not-allowed
            "
          >
            ⌫ Undo (Delete)
          </button>

          <button
            onClick={handleCheck}
            disabled={!allFilled || isChecking}
            className="
              bg-gradient-to-r from-green-500 to-emerald-600
              hover:from-green-400 hover:to-emerald-500
              text-white font-bold text-xl px-12 py-4 rounded-lg
              shadow-lg hover:shadow-green-500/50
              transform hover:scale-105
              transition-all
              disabled:opacity-30 disabled:cursor-not-allowed
              disabled:transform-none
            "
          >
            Check Answer ✓
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Click the number cards to fill in the blanks</p>
          <p className="mt-1">Press Delete or Backspace to undo</p>
        </div>
      </div>
    </div>
  );
};
