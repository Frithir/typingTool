import { useState, useEffect, useRef } from "react";
import { Complete } from "./Complete";
import { getCharColor, getCharOpacity, getRandomSnippet } from "./Utils";
import type { CodeSnippet } from "../../data/snippets";

export const TypingTool = () => {
  const [input, setInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [usedSnippets, setUsedSnippets] = useState<Set<string>>(new Set());
  const [currentSnippet, setCurrentSnippet] = useState<CodeSnippet | null>(
    null
  );
  const [sessionStats, setSessionStats] = useState({
    completed: 0,
    totalWpm: 0,
    totalAccuracy: 0,
  });
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const codeSnippet = currentSnippet?.code || "";
  const totalChars = codeSnippet.length;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!currentSnippet) {
      const snippet = getRandomSnippet(null, usedSnippets);
      setCurrentSnippet(snippet);
    }
  }, [currentSnippet, usedSnippets]);

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (input.length === totalChars && totalChars > 0) {
      setIsComplete(true);
      calculateStats(startTime);
    }
  }, [input]);

  const calculateStats = (startTime: number | null) => {
    if (!startTime) return;
    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    const calculatedWpm = Math.round(totalChars / 5 / timeInMinutes);
    setWpm(calculatedWpm);

    // Update session stats
    setSessionStats((prev) => ({
      completed: prev.completed + 1,
      totalWpm: prev.totalWpm + calculatedWpm,
      totalAccuracy: prev.totalAccuracy + accuracy,
    }));

    // Mark snippet as used
    if (currentSnippet) {
      setUsedSnippets((prev) => new Set([...prev, currentSnippet.id]));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isComplete) return;

    const newInput = e.target.value;

    // Only process if text was added (not deleted)
    if (newInput.length > input.length) {
      const currentChar = newInput[newInput.length - 1];
      const expectedChar = codeSnippet[newInput.length - 1];

      // Don't allow Enter or Tab through normal input (they're handled in onKeyDown)
      if (currentChar === "\n" || currentChar === "\t") {
        return;
      }

      if (currentChar !== expectedChar) {
        setErrors((prev) => prev + 1);
      }
    }

    setInput(newInput);

    // Calculate accuracy
    if (newInput.length > 0) {
      const acc = ((newInput.length - errors) / newInput.length) * 100;
      setAccuracy(Math.max(0, Math.round(acc)));
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComplete) return;

    const currentPos = input.length;
    const expectedChar = codeSnippet[currentPos];

    // Handle Enter key
    if (e.key === "Enter") {
      e.preventDefault();
      if (expectedChar === "\n") {
        setInput((prev) => prev + "\n");
        checkCharacter("\n", expectedChar);
      }
    }

    // Handle Tab key
    if (e.key === "Tab") {
      e.preventDefault();
      if (expectedChar === "\t") {
        setInput((prev) => prev + "\t");
        checkCharacter("\t", expectedChar);
      } else if (expectedChar === " ") {
        // If snippet uses spaces instead of tabs, add the space
        setInput((prev) => prev + " ");
        checkCharacter(" ", expectedChar);
      }
    }
  };

  const checkCharacter = (inputChar: string, expectedChar: string) => {
    if (inputChar !== expectedChar) {
      setErrors((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setInput("");
    setStartTime(null);
    setIsComplete(false);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    inputRef.current?.focus();
  };

  const handleNext = () => {
    const nextSnippet = getRandomSnippet(null, usedSnippets);
    setCurrentSnippet(nextSnippet);
    setInput("");
    setStartTime(null);
    setIsComplete(false);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            Code Typing Practice
          </h1>
          <p className="text-gray-400">Learn {currentSnippet?.title}</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">
              WPM
              <span className="text-white font-bold pl-2">
                {isComplete
                  ? wpm
                  : startTime
                  ? Math.round(
                      input.length / 5 / ((Date.now() - startTime) / 1000 / 60)
                    )
                  : 0}
              </span>
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">
              Accuracy
              <span className="text-white font-bold pl-2">{accuracy}%</span>
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">
              Progress
              <span className="text-white font-bold pl-2">
                {input.length}/{totalChars}
              </span>
            </p>
          </div>
        </div>

        {/* Code Display Area */}
        <div className="text-left bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700 relative overflow-hidden">
          <div className="absolute top-3 right-3 text-xs text-gray-500 uppercase tracking-wider">
            {currentSnippet?.language || "JavaScript"}
          </div>
          <pre
            className="text-lg leading-relaxed"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <code>
              {codeSnippet.split("").map((char, index) => (
                <span
                  key={index}
                  className={`${getCharColor(
                    index,
                    codeSnippet,
                    input
                  )} ${getCharOpacity(
                    index,
                    input
                  )} transition-all duration-75 ${
                    index === input.length ? "cursor-blink" : ""
                  }`}
                >
                  {char}
                </span>
              ))}
            </code>
          </pre>
          <style>{`
            @keyframes blink {
              0%,
              50% {
                border-left: 2px solid #61afef;
              }
              51%,
              100% {
                border-left: 2px solid transparent;
              }
            }
            .cursor-blink {
              animation: blink 1s step-end infinite;
              border-left: 2px solid #61afef;
            }
          `}</style>
        </div>

        {/* Hidden Input */}
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute pointer-events-none resize-none"
          disabled={isComplete}
          rows={1}
        />

        {/* Completion Modal */}
        {isComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Complete
              wpm={wpm}
              accuracy={accuracy}
              errors={errors}
              totalChars={totalChars}
              sessionCompleted={sessionStats.completed}
              sessionAvgWpm={
                sessionStats.completed > 0
                  ? Math.round(sessionStats.totalWpm / sessionStats.completed)
                  : 0
              }
              sessionAvgAccuracy={
                sessionStats.completed > 0
                  ? Math.round(
                      sessionStats.totalAccuracy / sessionStats.completed
                    )
                  : 0
              }
              handleReset={handleReset}
              handleNext={handleNext}
            />
          </div>
        )}

        {/* Instructions */}
        {!startTime && !isComplete && (
          <div className="text-center text-gray-400 mt-6">
            <p className="mb-2">Click anywhere to focus and start typing...</p>
            <p className="text-sm">
              Type the code exactly as shown above. Errors will be highlighted
              in red.
            </p>
          </div>
        )}

        {/* Focus helper */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="absolute inset-0 cursor-text"
          style={{ zIndex: isComplete ? -1 : 1 }}
        />
      </div>
    </div>
  );
};
