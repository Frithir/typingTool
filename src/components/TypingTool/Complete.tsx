type CompleteProps = {
  wpm: number;
  accuracy: number;
  errors: number;
  totalChars: number;
  handleReset: () => void;
};

export const Complete = ({
  wpm,
  accuracy,
  errors,
  totalChars,
  handleReset,
}: CompleteProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-8 border-2 border-green-500 text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-400">Complete! 🎉</h2>
      <div className="grid grid-cols-2 gap-6 mb-6 text-left max-w-md mx-auto">
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
      <button
        onClick={handleReset}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};
