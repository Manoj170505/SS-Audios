import React, { useState, useEffect } from "react";

const EQUALIZER_BARS = 32;

export default function InitialLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING AUDIO ENGINES...");
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
      // Advance progress smoothly
      const increment = isWindowLoaded ? 2.5 : 1.2;
      currentProgress += increment;

      if (currentProgress < 30) {
        setStatusText("INITIALIZING AUDIO ENGINES...");
      } else if (currentProgress < 65) {
        setStatusText("TUNING LINE-ARRAYS & SUBWOOFERS...");
      } else if (currentProgress < 90) {
        setStatusText("SYNCING STAGE LIGHTS & VISUAL REELS...");
      } else if (currentProgress < 100) {
        setStatusText("SOUNDSCAPE READY");
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);

        // Allow 350ms on 100% then trigger smooth fadeout
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
      className={`fixed inset-0 z-[99999] bg-[#0C080B] flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden select-none transition-all duration-700 ${
        isFading ? "opacity-0 scale-105 pointer-events-none filter blur-sm" : "opacity-100 scale-100"
      }`}
    >
      <style>{`
        @keyframes loaderEqualizerPulse {
          0%, 100% { height: 16%; }
          30% { height: 75%; }
          60% { height: 40%; }
          80% { height: 95%; }
        }

        @keyframes loaderRingExpand {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f70776]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0C080B]/60 to-[#0C080B] pointer-events-none" />

      {/* TOP STATUS BAR */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between text-[#A69B9B] text-[11px] font-mono tracking-widest uppercase">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#f70776] animate-ping" />
          <span className="text-white font-bold tracking-wider drop-shadow-[0_0_8px_#f70776]">
            SS AUDIOS // SYSTEM BOOT
          </span>
        </div>
        <span className="text-[#f70776] font-bold">48.0 kHz 24-BIT</span>
      </div>

      {/* CENTER: ANIMATED BRAND EMBLEM & AUDIO SPECTRUM */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 my-auto">
        
        {/* Pulsing Sonic Logo Emblem */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          {/* Sonic Shockwaves */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#f70776]/60 shadow-[0_0_30px_#f70776]"
            style={{ animation: "loaderRingExpand 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite" }}
          />
          <div
            className="absolute inset-2 rounded-full border border-dashed border-[#f70776]/40 animate-spin"
            style={{ animationDuration: "14s" }}
          />

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#141010]/95 border border-[#f70776] shadow-[0_0_40px_rgba(247,7,118,0.6)] flex items-center justify-center backdrop-blur-md">
            <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-[#FAF6F6] to-[#f70776]">
              SS
            </span>
          </div>
        </div>

        {/* Brand Title */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_25px_rgba(247,7,118,0.7)]">
            SOUND<span className="text-[#f70776]">SCAPE</span>
          </h1>
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#BDB2B2] font-semibold">
            Live Audio & Stage Production
          </p>
        </div>

        {/* Dynamic 32-Bar Equalizer Visualizer */}
        <div className="h-12 w-64 sm:w-80 flex items-end justify-between gap-[3px] p-1.5 bg-black/40 rounded-xl border border-white/10 shadow-inner">
          {Array.from({ length: EQUALIZER_BARS }).map((_, i) => {
            const delay = (i * 0.045).toFixed(2);
            const duration = (0.7 + (i % 5) * 0.12).toFixed(2);
            return (
              <div
                key={i}
                className="w-full rounded-t-sm bg-gradient-to-t from-[#c3195d] via-[#f70776] to-[#FAF6F6] shadow-[0_0_6px_#f70776]"
                style={{
                  animation: `loaderEqualizerPulse ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  height: `${25 + Math.sin((i / EQUALIZER_BARS) * Math.PI) * 55}%`,
                }}
              />
            );
          })}
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
          SOUNDSCAPE AUDIO SYSTEMS • ALL RIGHTS RESERVED
        </span>
      </div>
    </div>
  );
}
