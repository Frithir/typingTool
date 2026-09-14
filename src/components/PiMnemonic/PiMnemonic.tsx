import {
  PI_POEM,
  PI_VIDEO_ID,
  PI_VIDEO_START_SECONDS,
  parseEmphasis,
} from "./utils";

export const PiMnemonic = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Pi Mnemonic
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            A rhyme to help remember the digits of π
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Big text box */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl border-4 border-slate-700">
            <div
              className="text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-relaxed tracking-wide"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              {PI_POEM.split("\n").map((line, i) => (
                <p key={i} className="mb-1">
                  {parseEmphasis(line).map((segment, j) =>
                    segment.emphasis ? (
                      <em key={j} className="text-cyan-300">
                        {segment.text}
                      </em>
                    ) : (
                      <span key={j}>{segment.text}</span>
                    ),
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Smaller video */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-3 sm:p-4 shadow-2xl border-4 border-slate-700 self-start">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${PI_VIDEO_ID}?start=${PI_VIDEO_START_SECONDS}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
