type CompleteProps = {
  wpm: number;
  accuracy: number;
  errors: number;
  totalChars: number;
  sessionCompleted: number;
  sessionAvgWpm: number;
  sessionAvgAccuracy: number;
  handleReset: () => void;
  handleNext: () => void;
};

export const Complete = ({
  wpm,
  accuracy,
  errors,
  totalChars,
  sessionCompleted,
  sessionAvgWpm,
  sessionAvgAccuracy,
  handleReset,
  handleNext,
}: CompleteProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-8 border-2 border-green-500 text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-400">Complete! 🎉</h2>

      {/* Current Result */}
      <div className="mb-6">
        <div className="text-gray-400 text-sm mb-2">This Round</div>
        <div className="grid grid-cols-2 gap-6 text-left max-w-md mx-auto">
          <div>
            <div className="text-gray-400 text-sm mb-1">Words Per Minute</div>
            <div className="text-4xl font-bold">{wpm}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Accuracy</div>
            <div className="text-4xl font-bold">{accuracy}%</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Total Errors</div>
            <div className="text-2xl font-bold text-red-400">{errors}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Characters</div>
            <div className="text-2xl font-bold">{totalChars}</div>
          </div>
        </div>
      </div>

      {/* Session Stats */}
      {sessionCompleted > 0 && (
        <div className="mb-6 pt-6 border-t border-gray-700">
          <div className="text-gray-400 text-sm mb-2">Session Stats</div>
          <div className="grid grid-cols-3 gap-4 text-left max-w-md mx-auto">
            <div>
              <div className="text-gray-400 text-xs mb-1">Completed</div>
              <div className="text-2xl font-bold text-blue-400">
                {sessionCompleted}
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-xs mb-1">Avg WPM</div>
              <div className="text-2xl font-bold">{sessionAvgWpm}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs mb-1">Avg Accuracy</div>
              <div className="text-2xl font-bold">{sessionAvgAccuracy}%</div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Next Snippet
        </button>
        <button
          onClick={handleReset}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Retry This One
        </button>
      </div>
    </div>
  );
};
