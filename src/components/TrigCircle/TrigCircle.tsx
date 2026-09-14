import { useEffect, useRef, useState } from "react";
import { TrigDiagram } from "./TrigDiagram";
import {
  FUNCTION_COLORS,
  FUNCTION_LABELS,
  computeTrigGeometry,
  formatValue,
  generateQuizQuestion,
  type QuizQuestion,
  type TrigFunctionName,
} from "./utils";

const ALL_FUNCTIONS: TrigFunctionName[] = [
  "sin",
  "cos",
  "tan",
  "csc",
  "sec",
  "cot",
];

export const TrigCircle = () => {
  const [mode, setMode] = useState<"explore" | "quiz">("explore");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Unit Circle
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              sin, cos, tan and friends, live on the circle
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setMode("explore")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                mode === "explore"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setMode("quiz")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                mode === "quiz"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              Quiz
            </button>
          </div>
        </div>

        {mode === "explore" ? <ExploreMode /> : <QuizMode />}
      </div>
    </div>
  );
};

const ExploreMode = () => {
  const [angleDeg, setAngleDeg] = useState(45);
  const geometry = computeTrigGeometry(angleDeg);

  const setAngleClamped = (value: number) => {
    const wrapped = ((value % 360) + 360) % 360;
    setAngleDeg(wrapped);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 sm:p-6 shadow-2xl border-4 border-slate-700">
        <TrigDiagram angleDeg={angleDeg} size={320} />

        <div className="mt-4 flex flex-col gap-3">
          <input
            type="range"
            min={0}
            max={359}
            step={1}
            value={angleDeg}
            onChange={(e) => setAngleClamped(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex items-center justify-center gap-2">
            <input
              type="number"
              value={Math.round(angleDeg)}
              onChange={(e) => setAngleClamped(Number(e.target.value) || 0)}
              className="w-20 text-center bg-gray-700 text-white rounded-lg px-2 py-1"
            />
            <span className="text-gray-300">degrees</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 sm:p-6 shadow-2xl border-4 border-slate-700">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-300">
          Values at θ = {Math.round(angleDeg)}°
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {ALL_FUNCTIONS.map((fn) => (
            <div
              key={fn}
              className="bg-gray-800/60 rounded-lg px-3 py-2 flex items-center justify-between border border-gray-700"
            >
              <span
                className="font-bold"
                style={{ color: FUNCTION_COLORS[fn] }}
              >
                {FUNCTION_LABELS[fn]}
              </span>
              <span className="font-mono text-sm sm:text-base">
                {formatValue(geometry[fn])}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400 space-y-1">
          <p>
            sin = opposite / hypotenuse
            <br /> cos = adjacent / hypotenuse tan = sin / cos
            <br /> cot = cos / sin = 1 / tan csc = 1 / sin
            <br /> sec = 1 / cos
          </p>
        </div>
      </div>
    </div>
  );
};

const TIME_LIMIT = 20;

const QuizMode = () => {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy",
  );
  const [question, setQuestion] = useState<QuizQuestion>(() =>
    generateQuizQuestion("easy"),
  );
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null,
  );
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const loadNewQuestion = (nextDifficulty = difficulty) => {
    setQuestion(generateQuizQuestion(nextDifficulty));
    setSelected(null);
    setFeedback(null);
    setTimeLeft(TIME_LIMIT);
  };

  useEffect(() => {
    if (timeLeft > 0 && !feedback && !isPaused) {
      timerRef.current = window.setTimeout(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && !feedback) {
      setFeedback("incorrect");
      setStreak(0);
      setTimeout(() => loadNewQuestion(), 2000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, feedback, isPaused]);

  const handleAnswer = (value: number) => {
    if (feedback) return;
    setSelected(value);
    const isCorrect = Math.abs(value - question.correctValue) <= 0.01;
    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => loadNewQuestion(), 1800);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 sm:mb-6 flex flex-wrap gap-3 sm:gap-4 items-center justify-between">
        <div className="flex gap-3 sm:gap-4">
          <Stat label="Score" value={score} color="text-green-400" />
          <Stat label="Streak" value={streak} color="text-orange-400" />
          <Stat
            label="Time"
            value={`${timeLeft}s`}
            color={
              timeLeft <= 5 ? "text-red-400 animate-pulse" : "text-blue-400"
            }
          />
        </div>
        <div className="flex gap-2">
          <select
            value={difficulty}
            onChange={(e) => {
              const next = e.target.value as "easy" | "medium" | "hard";
              setDifficulty(next);
              loadNewQuestion(next);
            }}
            className="text-xs sm:text-sm bg-gray-700 text-white px-2 py-1 rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded transition-colors"
          >
            {isPaused ? "▶" : "⏸"}
          </button>
        </div>
      </div>

      <div
        className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 sm:p-6 shadow-2xl border-4 transition-all duration-300 ${
          feedback === "correct"
            ? "border-green-500 shadow-green-500/50"
            : feedback === "incorrect"
              ? "border-red-500 shadow-red-500/50"
              : "border-slate-700"
        }`}
      >
        <p className="text-center text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          What is{" "}
          <span style={{ color: FUNCTION_COLORS[question.fn] }}>
            {FUNCTION_LABELS[question.fn]}
          </span>{" "}
          at θ = {question.angleDeg}°?
        </p>

        <TrigDiagram angleDeg={question.angleDeg} size={280} />

        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-6">
          {question.options.map((option) => {
            const isSelected = selected === option;
            const isCorrectOption =
              feedback && Math.abs(option - question.correctValue) <= 0.01;
            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={!!feedback}
                className={`
                  font-bold text-lg sm:text-xl px-4 py-3 rounded-xl border-2
                  transition-all duration-200 disabled:cursor-not-allowed
                  ${
                    isCorrectOption
                      ? "bg-green-600 border-green-400 text-white"
                      : isSelected
                        ? "bg-red-600 border-red-400 text-white"
                        : "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-cyan-500/50"
                  }
                `}
              >
                {option.toFixed(2)}
              </button>
            );
          })}
        </div>

        {feedback && (
          <p
            className={`text-center mt-4 font-semibold ${
              feedback === "correct" ? "text-green-400" : "text-red-400"
            }`}
          >
            {feedback === "correct"
              ? "🎉 Correct!"
              : `❌ It was ${question.correctValue.toFixed(2)}`}
          </p>
        )}
      </div>
    </div>
  );
};

const Stat = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) => (
  <div className="text-center">
    <div className="text-xs sm:text-sm text-gray-400 mb-1">{label}</div>
    <div className={`text-xl sm:text-2xl font-bold ${color}`}>{value}</div>
  </div>
);
