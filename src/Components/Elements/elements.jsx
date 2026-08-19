import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Disc3, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

// Track metadata mock replacement
const tracks = [
    { title: "Ethereal Drift", artist: "Studio Resonance", root: 220 },
    { title: "Solar Wind", artist: "Acoustic Synthetics", root: 277.18 },
    { title: "Deep Horizon", artist: "Lumina Engine", root: 164.81 },
    { title: "Cosmic Resonance", artist: "Sub-Tone Echoes", root: 196.0 },
];

// Color palette configuration for Visualizer
const palette = {
    neon: ["#5fe6ff", "#ff5ec4"],
    gold: ["#e6be6a", "#f6e3b4"],
};

// Ambient Sound Context
const SoundContext = createContext(null);

export function useSound() {
    const ctx = useContext(SoundContext);
    if (!ctx) throw new Error("useSound must be used inside <SoundProvider>");
    return ctx;
}

export function SoundProvider({ children }) {
    const [enabled, setEnabled] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);
    const [volume, setVol] = useState(0.35);

    const audioRef = useRef(null);

    const teardown = useCallback(() => {
        const a = audioRef.current;
        if (!a) return;
        a.voices.forEach((v) => {
            try {
                v.osc.stop();
                v.lfo.stop();
            } catch {
                /* already stopped */
            }
        });
        void a.ctx.close();
        audioRef.current = null;
    }, []);

    const build = useCallback(
        (index, vol) => {
            teardown();
            const AC = window.AudioContext || window.webkitAudioContext;
            const ctx = new AC();
            const master = ctx.createGain();
            master.gain.value = 0;
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 128;
            analyser.smoothingTimeConstant = 0.8;
            master.connect(analyser);
            analyser.connect(ctx.destination);

            const root = tracks[index]?.root ?? 220;
            const ratios = [1, 1.5, 2, 2.667, 3];
            const voices = ratios.map((r, i) => {
                const osc = ctx.createOscillator();
                osc.type = i % 2 ? "triangle" : "sine";
                osc.frequency.value = root * r;
                const gain = ctx.createGain();
                gain.gain.value = 0.16 / (i + 1);

                const lfo = ctx.createOscillator();
                lfo.frequency.value = 0.08 + i * 0.13;
                const lfoGain = ctx.createGain();
                lfoGain.gain.value = 0.12 / (i + 1);
                lfo.connect(lfoGain).connect(gain.gain);
                osc.connect(gain).connect(master);
                osc.start();
                lfo.start();
                return { osc, lfo, gain };
            });

            master.gain.linearRampToValueAtTime(vol, ctx.currentTime + 1.4);
            audioRef.current = { ctx, master, analyser, voices };
        },
        [teardown]
    );

    useEffect(() => teardown, [teardown]);

    const toggleSound = useCallback(() => {
        setEnabled((on) => {
            if (on) {
                teardown();
                setPlaying(false);
                return false;
            }
            build(trackIndex, volume);
            setPlaying(true);
            return true;
        });
    }, [build, teardown, trackIndex, volume]);

    const play = useCallback(() => {
        if (!enabled) {
            toggleSound();
            return;
        }
        const a = audioRef.current;
        if (!a) build(trackIndex, volume);
        else {
            void a.ctx.resume();
            a.master.gain.linearRampToValueAtTime(volume, a.ctx.currentTime + 0.6);
        }
        setPlaying(true);
    }, [build, enabled, toggleSound, trackIndex, volume]);

    const pause = useCallback(() => {
        const a = audioRef.current;
        if (a) {
            a.master.gain.linearRampToValueAtTime(0.0001, a.ctx.currentTime + 0.4);
            void a.ctx.suspend();
        }
        setPlaying(false);
    }, []);

    const select = useCallback(
        (i) => {
            const idx = (i + tracks.length) % tracks.length;
            setTrackIndex(idx);
            if (enabled) {
                build(idx, volume);
                setPlaying(true);
            }
        },
        [build, enabled, volume]
    );

    const next = useCallback(() => select(trackIndex + 1), [select, trackIndex]);
    const prev = useCallback(() => select(trackIndex - 1), [select, trackIndex]);

    const setVolume = useCallback((v) => {
        setVol(v);
        const a = audioRef.current;
        if (a) a.master.gain.value = v;
    }, []);

    const getLevels = useCallback((out) => {
        const a = audioRef.current;
        if (!a || a.ctx.state !== "running") return false;
        a.analyser.getByteFrequencyData(out);
        return true;
    }, []);

    const value = useMemo(
        () => ({
            enabled,
            playing,
            trackIndex,
            volume,
            toggleSound,
            play,
            pause,
            next,
            prev,
            select,
            setVolume,
            getLevels,
        }),
        [
            enabled,
            playing,
            trackIndex,
            volume,
            toggleSound,
            play,
            pause,
            next,
            prev,
            select,
            setVolume,
            getLevels,
        ]
    );

    return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

// Canvas Audio Visualizer
export function Visualizer({
    tone = "neon",
    mode = "bars",
    className = "",
    height = 160,
    intensity = 1,
}) {
    const canvasRef = useRef(null);
    const { getLevels, playing } = useSound();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const data = new Uint8Array(64);
        let raf = 0;
        let t = 0;
        let dpr = 1;

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;
        };
        resize();
        window.addEventListener("resize", resize);

        const [c1, c2] = palette[tone];

        const draw = () => {
            t += reduce ? 0 : 0.016;
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const live = getLevels(data);
            const bins = 48;
            const values = [];
            for (let i = 0; i < bins; i++) {
                if (live) {
                    values.push((data[Math.floor((i / bins) * data.length)] ?? 0) / 255);
                } else {
                    const v =
                        0.28 +
                        0.22 * Math.sin(t * 1.6 + i * 0.35) +
                        0.16 * Math.sin(t * 0.7 + i * 0.13);
                    values.push(Math.max(0.05, v));
                }
            }

            const grad = ctx.createLinearGradient(0, 0, w, 0);
            grad.addColorStop(0, c1);
            grad.addColorStop(1, c2);
            ctx.strokeStyle = grad;
            ctx.fillStyle = grad;
            ctx.shadowBlur = 18 * dpr;
            ctx.shadowColor = c1;

            if (mode === "bars") {
                const bw = w / bins;
                for (let i = 0; i < bins; i++) {
                    const v = (values[i] ?? 0) * intensity;
                    const bh = Math.max(2 * dpr, v * h * 0.9);
                    ctx.fillRect(i * bw + bw * 0.22, (h - bh) / 2, bw * 0.56, bh);
                }
            } else if (mode === "wave") {
                ctx.lineWidth = 2 * dpr;
                ctx.beginPath();
                for (let i = 0; i < bins; i++) {
                    const x = (i / (bins - 1)) * w;
                    const y = h / 2 + ((values[i] ?? 0) - 0.35) * h * 0.8 * intensity;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            } else {
                const cx = w / 2;
                const cy = h / 2;
                const r = Math.min(w, h) * 0.22;
                ctx.lineWidth = 2 * dpr;
                for (let i = 0; i < bins; i++) {
                    const a = (i / bins) * Math.PI * 2;
                    const len = r * 0.45 + (values[i] ?? 0) * r * 1.1 * intensity;
                    ctx.beginPath();
                    ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
                    ctx.lineTo(cx + Math.cos(a) * (r + len), cy + Math.sin(a) * (r + len));
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.stroke();
            }

            raf = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, [getLevels, intensity, mode, tone, playing]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className={`w-full ${className}`}
            style={{ height }}
        />
    );
}

// Main Music Player Component
export function MusicPlayer() {
    const { enabled, playing, trackIndex, volume, play, pause, next, prev, select, setVolume } =
        useSound();
    const [openList, setOpenList] = useState(true);
    const current = tracks[trackIndex];

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-md md:p-8 text-slate-100 shadow-xl max-w-xl mx-auto my-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="relative mx-auto h-32 w-32 shrink-0 md:mx-0">
                    <div
                        className={`absolute inset-0 rounded-full border border-amber-400/40 ${playing ? "animate-spin" : ""
                            }`}
                        style={{
                            animationDuration: "8s",
                            background:
                                "repeating-radial-gradient(circle at center, rgba(230,190,106,0.22) 0 2px, transparent 2px 6px)",
                        }}
                    />
                    <div className="absolute inset-[38%] rounded-full bg-gradient-to-tr from-amber-500 to-yellow-200" />
                    <Disc3 className="absolute inset-0 m-auto h-6 w-6 text-slate-900/70" />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                        Now cueing
                    </p>
                    <h3 className="mt-1 text-3xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent truncate">
                        {current?.title}
                    </h3>
                    <p className="text-sm text-slate-400">{current?.artist}</p>

                    <Visualizer tone="gold" mode="wave" height={64} className="mt-3" />

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <button
                            onClick={prev}
                            aria-label="Previous track"
                            className="rounded-full border border-slate-700 p-2.5 transition-colors hover:bg-slate-800 text-slate-200"
                        >
                            <SkipBack className="h-4 w-4" />
                        </button>
                        <button
                            onClick={playing ? pause : play}
                            aria-label={playing ? "Pause" : "Play"}
                            className="rounded-full p-3.5 text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 transition-transform hover:scale-105 shadow-md shadow-amber-500/20"
                        >
                            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next track"
                            className="rounded-full border border-slate-700 p-2.5 transition-colors hover:bg-slate-800 text-slate-200"
                        >
                            <SkipForward className="h-4 w-4" />
                        </button>

                        <label className="ml-2 flex items-center gap-2 text-xs text-slate-400">
                            <Volume2 className="h-4 w-4" aria-hidden />
                            <span className="sr-only">Volume</span>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={volume}
                                onChange={(e) => setVolume(Number(e.target.value))}
                                className="h-1 w-24 accent-amber-400 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </label>
                    </div>

                    {!enabled && (
                        <p className="mt-3 text-xs text-slate-400">
                            Ambient studio tones are generated live — press play to enable sound. The site works fully with sound off.
                        </p>
                    )}
                </div>
            </div>

            <button
                onClick={() => setOpenList((v) => !v)}
                className="mt-6 block text-xs uppercase tracking-widest text-amber-400 hover:underline font-semibold"
                aria-expanded={openList}
            >
                {openList ? "Hide playlist" : "Show playlist"}
            </button>

            {openList && (
                <ul className="mt-3 divide-y divide-slate-800 border-t border-slate-800">
                    {tracks.map((t, i) => (
                        <li key={t.title}>
                            <button
                                onClick={() => select(i)}
                                className={`flex w-full items-center justify-between gap-4 py-3 text-left text-sm transition-colors hover:text-amber-300 ${i === trackIndex ? "text-amber-400 font-medium" : "text-slate-400"
                                    }`}
                            >
                                <span className="truncate">
                                    <span className="mr-3 font-mono text-xs opacity-60">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    {t.title}
                                </span>
                                <span className="hidden shrink-0 text-xs opacity-70 sm:block">
                                    {t.artist}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// App wrapper exporting default entry point
export default function App() {
    return (
        <SoundProvider>
            <div className="min-h-screen bg-slate-950 p-4 flex items-center justify-center">
                <MusicPlayer />
            </div>
        </SoundProvider>
    );
}