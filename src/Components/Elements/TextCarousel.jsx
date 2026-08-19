import React from "react";

export default function TextCarousel() {
  const items = [
    "Wedding Events",
    "Audios",
    "Welcome-Dance",
    "Orchestra",
    "Lightings",
    "DJ-Events",
    "Instrumentals",
  ];

  return (
    <div className="w-full relative overflow-hidden bg-[#1D1717] py-4 border-y border-[#2B2323] text-[#FAF6F6] select-none">
      {/* Inline Keyframe Animation */}
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333333%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scrollMarquee 18s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Edge gradient masks for smooth fade effect */}
      <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#141010] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#141010] to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track */}
      <div className="marquee-track">
        {[...Array(3)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex items-center shrink-0">
            {items.map((text, index) => (
              <React.Fragment key={`${arrayIndex}-${index}`}>
                <span className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] whitespace-nowrap px-6 text-[#FAF6F6]/90 hover:text-[#C3195D] transition-colors cursor-default">
                  {text}
                </span>
                <span className="text-[#C3195D] text-xs opacity-70">•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
