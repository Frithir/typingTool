import { useState, useEffect, useRef } from "react";
import { Complete } from "./Complete";
import { getCharColor, getCharOpacity } from "./Utils";

export const TypingTool = () => {
  const [input, setInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [errors, setErrors] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample code snippet - we'll expand this later
  const codeSnippet = `const fetchUser = async (id) => {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();
  return data;
};`;

  const totalChars = codeSnippet.length;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (input.length === totalChars) {
      setIsComplete(true);
      calculateStats(startTime);
    }
  }, [input]);

  const calculateStats = (startTime) => {
    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    const calculatedWpm = Math.round(totalChars / 5 / timeInMinutes);
    setWpm(calculatedWpm);
  };

  const handleInputChange = (e) => {
    if (isComplete) return;

    const newInput = e.target.value;
    const currentChar = newInput[newInput.length - 1];
    const expectedChar = codeSnippet[newInput.length - 1];

    if (currentChar !== expectedChar && newInput.length > input.length) {
      setErrors((prev) => prev + 1);
    }

    setInput(newInput);

    // Calculate accuracy
    const acc = ((newInput.length - errors) / newInput.length) * 100;
    setAccuracy(Math.max(0, Math.round(acc)));
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            Code Typing Practice
          </h1>
          <p className="text-gray-400">
            Practice typing code snippets to improve your speed and accuracy
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">WPM</div>
            <div className="text-2xl font-bold">
              {isComplete
                ? wpm
                : startTime
                ? Math.round(
                    input.length / 5 / ((Date.now() - startTime) / 1000 / 60)
                  )
                : 0}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Accuracy</div>
            <div className="text-2xl font-bold">{accuracy}%</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Progress</div>
            <div className="text-2xl font-bold">
              {input.length}/{totalChars}
            </div>
          </div>
        </div>

        {/* Code Display Area */}
        <div className="text-left bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700 relative overflow-hidden">
          <div className="absolute top-3 right-3 text-xs text-gray-500 uppercase tracking-wider">
            JavaScript
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
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="opacity-0 absolute pointer-events-none"
          disabled={isComplete}
        />

        {/* Completion Modal */}
        {isComplete && (
          <Complete {...{ wpm, accuracy, errors, totalChars, handleReset }} />
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
