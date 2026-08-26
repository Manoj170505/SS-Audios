import React, { useState, useEffect } from "react";

export default function InitialLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("CUEING VINYL RECORD...");
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    let isWindowLoaded = document.readyState === "complete";

    const onWindowLoad = () => {
      isWindowLoaded = true;
    };

    if (!isWindowLoaded) {
      window.addEventListener("load", onWindowLoad);
    }

    const interval = setInterval(() => {
      // Smooth incremental progress
      const increment = isWindowLoaded ? 2.6 : 1.2;
      currentProgress += increment;

      if (currentProgress < 30) {
        setStatusText("CUEING VINYL RECORD...");
      } else if (currentProgress < 65) {
        setStatusText("SYNCING AUDIO TRACKS & STAGING...");
      } else if (currentProgress < 90) {
        setStatusText("CALIBRATING 45 RPM HIGH-FIDELITY...");
      } else if (currentProgress < 100) {
        setStatusText("SOUNDSCAPE READY");
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);

        // Hold briefly at 100% then trigger smooth fade-out
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 650);
        }, 350);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", onWindowLoad);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#0A0608] flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden select-none transition-all duration-700 ${
        isFading ? "opacity-0 scale-105 pointer-events-none filter blur-sm" : "opacity-100 scale-100"
      }`}
    >
      <style>{`
        /* CONTINUOUS SMOOTH VINYL SPIN */
        @keyframes vinylRecordSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* SONIC PULSE RIPPLE FROM VINYL */
        @keyframes vinylSonicRipple {
          0% {
            transform: scale(0.7);
            opacity: 0.85;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        /* NEEDLE SUBTLE VIBRATION ON SPINNING GROOVE */
        @keyframes stylusGrooveVibe {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-1deg); }
        }
      `}</style>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#f70776]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0608]/70 to-[#0A0608] pointer-events-none" />

      {/* TOP STATUS BAR */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between text-[#A69B9B] text-[11px] font-mono tracking-widest uppercase">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#f70776] animate-ping" />
          <span className="text-white font-bold tracking-wider drop-shadow-[0_0_8px_#f70776]">
            SS AUDIOS // TURNTABLE ENGINE
          </span>
        </div>
        <span className="text-[#f70776] font-bold">45 RPM STEREO</span>
      </div>

      {/* CENTER: ROTATING 3D VINYL DISC & DJ TONEARM */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 my-auto">
        
        {/* Vinyl Platter & Tonearm Assembly */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
          
          {/* Sonic Soundwave Expanding Rings */}
          <div
            className="absolute w-44 h-44 sm:w-48 sm:h-48 rounded-full border-2 border-[#f70776]/60 shadow-[0_0_30px_#f70776]"
            style={{ animation: "vinylSonicRipple 2.2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite" }}
          />
          <div
            className="absolute w-56 h-56 sm:w-60 sm:h-60 rounded-full border border-[#c3195d]/40"
            style={{ animation: "vinylSonicRipple 2.2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite", animationDelay: "1.1s" }}
          />

          {/* THE ROTATING VINYL DISC */}
          <div
            className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#0d090c] border-4 border-[#241c21] shadow-[0_0_50px_rgba(247,7,118,0.35)] flex items-center justify-center"
            style={{ animation: "vinylRecordSpin 2s linear infinite" }}
          >
            {/* Vinyl Groove Rings */}
            <div className="absolute inset-2 rounded-full border border-white/5" />
            <div className="absolute inset-5 rounded-full border border-white/10" />
            <div className="absolute inset-8 rounded-full border border-white/5" />
            <div className="absolute inset-11 rounded-full border border-white/10" />
            <div className="absolute inset-14 rounded-full border border-white/5" />

            {/* Glossy Dynamic Light Sheen across surface */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

            {/* Central Vinyl Label (SS Audios Brand Hub in Pink #f70776) */}
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#c3195d] via-[#f70776] to-[#ff007f] border-2 border-black shadow-inner flex flex-col items-center justify-center text-center p-1.5 shadow-[0_0_15px_rgba(247,7,118,0.6)]">
              <img src="/SS.svg" alt="SS Audios" className="h-3.5 sm:h-4 w-auto object-contain brightness-200 drop-shadow" />
              <span className="text-[7px] sm:text-[8px] font-black text-white/95 uppercase tracking-widest mt-0.5">AUDIOS</span>
              {/* Center Spindle Hole */}
              <div className="w-2 h-2 rounded-full bg-[#141010] border border-black/80 mt-0.5 shadow-inner" />
            </div>
          </div>

          {/* DJ TONEARM & GLOWING NEEDLE */}
          <div className="absolute top-1 right-2 sm:top-2 sm:right-3 w-16 sm:w-20 h-28 sm:h-32 pointer-events-none">
            <div
              className="relative w-full h-full"
              style={{
                animation: "stylusGrooveVibe 1.5s ease-in-out infinite",
                transformOrigin: "85% 15%",
              }}
            >
              {/* Tonearm Base Pivot Hub */}
              <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-gradient-to-b from-gray-300 via-gray-500 to-gray-800 border border-gray-900 shadow-md flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#f70776] shadow-[0_0_8px_#f70776]" />
              </div>

              {/* Metallic Tonearm Rod */}
              <div className="absolute top-5 right-3.5 w-1 h-18 sm:h-22 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-400 rounded-full shadow-sm transform -rotate-15" />

              {/* Cartridge Head & Glowing Stylus Tip */}
              <div className="absolute bottom-1 left-2 sm:left-3 w-4 h-7 bg-gray-900 border border-gray-700 rounded-sm shadow-lg transform rotate-15 flex flex-col items-center justify-end">
                {/* Glowing Stylus Needle Tip */}
                <div className="w-1.5 h-2 rounded-full bg-[#f70776] shadow-[0_0_10px_#f70776]" />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Title */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_25px_rgba(247,7,118,0.7)]">
            SS <span className="text-[#f70776]">AUDIOS</span>
          </h1>
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#BDB2B2] font-semibold">
            Live Audio & Stage Production
          </p>
        </div>
      </div>

      {/* BOTTOM: TELEMETRY & PROGRESS BAR */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center space-y-3">
        <div className="w-full flex items-center justify-between text-xs font-mono font-bold text-[#A69B9B]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f70776] animate-pulse" />
            {statusText}
          </span>
          <span className="text-[#f70776] font-extrabold">{progress}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-2 rounded-full bg-[#181414] border border-[#2B2323] overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#c3195d] via-[#f70776] to-[#ff007f] shadow-[0_0_15px_#f70776] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[9px] uppercase tracking-widest text-[#6B6161] font-mono">
          SS AUDIOS LIVE PRODUCTION • 45 RPM ROTATING VINYL
        </span>
      </div>
    </div>
  );
}
