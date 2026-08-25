import React, { useState, useEffect } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ss-audios-backend-production.up.railway.app/api';

const DEFAULT_SERVICES = [
    {
        id: 1,
        title: "Wedding Events",
        price: "₹25,000",
        category: "Grand Celebrations",
        tag: "Tour-Grade Audio",
        description:
            "Unforgettable Wedding Audio & Staging. Tour-grade sound systems, precision acoustic tuning, and ambient staging tailored to make every vow and song crystal clear.",
        image:
            "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        features: ["Precision Acoustic Tuning", "Tour-Grade Wireless Sound", "Ambient Staging & Lighting"],
    },
    {
        id: 2,
        title: "Goldstar Orchestra",
        price: "₹25,000",
        category: "Live Orchestration",
        tag: "Multi-Genre",
        description:
            "Crafted live orchestral arrangements, high-energy beatmatching, and versatile multi-genre music curation designed to keep your celebration vibrant and unforgettable.",
        image:
            "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=600",
        features: ["Live String & Brass Ensemble", "Multi-Genre Song Curation", "Dynamic Live Beatmatching"],
    },
    {
        id: 3,
        title: "Lighting & Audio",
        price: "₹40,000",
        category: "Atmospheric FX",
        tag: "Intelligent Lighting",
        description:
            "Intelligent Lighting & Crystal-Clear Sound. Dynamic moving heads, laser shows, and synchronized strobes paired with high-fidelity audio engineering and low-fog atmospheric effects.",
        image:
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
        features: ["Moving Head Lasers & Strobes", "Synchronized FX & Low-Fog", "Hi-Fi Audio Engineering"],
    },
    {
        id: 4,
        title: "Welcome Dance",
        price: "₹15,000",
        category: "Stage Choreography",
        tag: "Opening Act",
        description:
            "Vibrant Welcome Dance Performance. Electrifying choreography, custom entrance tracks, and synchronized stage pyrotechnics designed to set an unforgettable opening tone for your guests.",
        image:
            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600",
        features: ["Custom Entrance Tracks", "Synchronized Stage Pyros", "Electrifying Choreography"],
    },
    {
        id: 5,
        title: "DJ Events",
        price: "Starting from ₹15,000",
        category: "Club & Festival",
        tag: "Live Stem Remixing",
        description:
            "Electrifying DJ Events & Festival Beats. Festival-grade audio systems, seamless live stem mixing, and real-time visual synchronization designed to keep your dance floor packed all night.",
        image:
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600",
        features: ["Real-Time Stem Mixing", "Festival-Grade Sound Array", "Synchronized Visuals"],
    },
    {
        id: 6,
        title: "Instrumentals",
        price: "₹10,000",
        category: "Acoustic Solo & Band",
        tag: "Soulful Live",
        description:
            "Mesmerizing Instrumental Performances. Soulful live solos and ensemble arrangements spanning violin, flute, saxophone, and classical instruments for an elegant, immersive ambiance.",
        image:
            "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600",
        features: ["Violin, Sax & Flute Solos", "Ensemble Arrangements", "Immersive Classical Ambiance"],
    },
];

const DEFAULT_PLANS = [
    {
        id: "starter",
        name: "Starter",
        badge: "Solo Creators",
        desc: "Essential DJ set for private home parties and intimate gatherings.",
        monthlyPrice: "$199",
        yearlyPrice: "$159",
        period: "/ event",
        buttonText: "Get Starter",
        theme: "standard",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-party-41338-large.mp4",
        videos: [
            "https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-party-41338-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-mixing-music-41337-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-on-stage-41339-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-stage-lights-and-crowd-at-a-concert-41550-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-laser-lights-in-a-stage-show-41551-large.mp4"
        ],
        features: [
            { text: "3 Hours Live DJ Set", included: true },
            { text: "Basic Sound System (1,000W)", included: true },
            { text: "Standard Playlist Customization", included: true },
            { text: "Dynamic Stage Lighting & FX", included: false },
            { text: "Dedicated Sound Engineer", included: false },
            { text: "Wireless Mic & MC Host", included: false },
            { text: "Custom 3D Visual Projection", included: false },
        ],
    },
    {
        id: "basic",
        name: "Basic",
        badge: "Club Nights",
        desc: "Ideal for medium lounge venues, birthdays, and rooftop parties.",
        monthlyPrice: "$399",
        yearlyPrice: "$319",
        period: "/ event",
        buttonText: "Choose Basic",
        theme: "standard",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-on-stage-41339-large.mp4",
        videos: [
            "https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-on-stage-41339-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-stage-lights-and-crowd-at-a-concert-41550-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-mixing-music-41337-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-laser-lights-in-a-stage-show-41551-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41552-large.mp4"
        ],
        features: [
            { text: "5 Hours Live DJ Set", included: true },
            { text: "Pro Sound System (3,000W)", included: true },
            { text: "Standard Playlist Customization", included: true },
            { text: "Dynamic Stage Lighting & FX", included: true },
            { text: "Dedicated Sound Engineer", included: false },
            { text: "Wireless Mic & MC Host", included: false },
            { text: "Custom 3D Visual Projection", included: false },
        ],
    },
    {
        id: "standard",
        name: "Standard",
        badge: "Corporate Events",
        desc: "Complete audio-visual setup for corporate events and weddings.",
        monthlyPrice: "$699",
        yearlyPrice: "$559",
        period: "/ event",
        buttonText: "Select Standard",
        theme: "standard",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stage-lights-and-crowd-at-a-concert-41550-large.mp4",
        videos: [
            "https://assets.mixkit.co/videos/preview/mixkit-stage-lights-and-crowd-at-a-concert-41550-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-laser-lights-in-a-stage-show-41551-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41552-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-party-41338-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-on-stage-41339-large.mp4"
        ],
        features: [
            { text: "7 Hours Live DJ Performance", included: true },
            { text: "High-Impact Concert Sound (5,000W)", included: true },
            { text: "Custom Playlist & Track Edits", included: true },
            { text: "Dynamic Stage Lighting & FX", included: true },
            { text: "Dedicated Sound Engineer", included: true },
            { text: "Wireless Mic & MC Host", included: true },
            { text: "Custom 3D Visual Projection", included: false },
        ],
    },
    {
        id: "premium",
        name: "Premium",
        badge: "MOST POPULAR",
        desc: "Full-scale concert production with silver-grade audio and staging.",
        monthlyPrice: "$1,299",
        yearlyPrice: "$1,039",
        period: "/ event",
        buttonText: "Upgrade to Premium",
        theme: "silver",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-laser-lights-in-a-stage-show-41551-large.mp4",
        videos: [
            "https://assets.mixkit.co/videos/preview/mixkit-laser-lights-in-a-stage-show-41551-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41552-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-on-stage-41339-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-mixing-music-41337-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-stage-lights-and-crowd-at-a-concert-41550-large.mp4"
        ],
        features: [
            { text: "Full Night Live DJ Set (Up to 10h)", included: true },
            { text: "Tour-Grade Array Sound (10,000W)", included: true },
            { text: "Custom Playlist & Track Edits", included: true },
            { text: "Full Moving-Head Light Show & Fog", included: true },
            { text: "2x Sound & Lighting Engineers", included: true },
            { text: "Dual Wireless Mics & Pro MC", included: true },
            { text: "Custom 3D Visual Projection", included: true },
        ],
    },
    {
        id: "elite",
        name: "Elite",
        badge: "VIP / FESTIVAL",
        desc: "Ultimate festival experience with top-tier gold stage production.",
        monthlyPrice: "$2,499",
        yearlyPrice: "$1,999",
        period: "/ event",
        buttonText: "Book Elite VIP",
        theme: "gold",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-mixing-music-41337-large.mp4",
        videos: [
            "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-mixing-music-41337-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-laser-lights-in-a-stage-show-41551-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41552-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-stage-lights-and-crowd-at-a-concert-41550-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-party-41338-large.mp4"
        ],
        features: [
            { text: "Unlimited Performance Duration", included: true },
            { text: "Ultra Concert Sound System (25,000W+)", included: true },
            { text: "Exclusive Original Live Remixes & Stems", included: true },
            { text: "Full Laser Show, CO2 Jets & Pyros", included: true },
            { text: "Full Backstage Audio Crew & Director", included: true },
            { text: "Multi-Wireless System & Celebrity MC", included: true },
            { text: "Custom 3D Video Mapping & LED Wall", included: true },
        ],
    },
];

function PlanVideoShowcase({ plan, isSilver, isGold }) {
    // 4 to 5 videos array
    const videoList = Array.isArray(plan.videos) && plan.videos.length > 0
        ? plan.videos
        : [
            plan.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-party-41338-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-mixing-music-41337-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-on-stage-41339-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-stage-lights-and-crowd-at-a-concert-41550-large.mp4",
            "https://assets.mixkit.co/videos/preview/mixkit-laser-lights-in-a-stage-show-41551-large.mp4"
        ];

    // Ensure we have at least 4-5 items for the continuous marquee
    const fullVideos = videoList.length >= 4 ? videoList : [...videoList, ...videoList].slice(0, 5);
    // Double list for seamless infinite loop
    const loopedVideos = [...fullVideos, ...fullVideos];

    const [isMuted, setIsMuted] = useState(true);
    const [activeVideoUrl, setActiveVideoUrl] = useState(null);

    const toggleMuteAll = (e) => {
        e.stopPropagation();
        setIsMuted(prev => !prev);
    };

    return (
        <div className={`relative w-full h-80 sm:h-96 lg:h-full min-h-[340px] lg:min-h-[420px] rounded-3xl overflow-hidden bg-[#0D0B0B] border flex flex-col justify-between group shadow-2xl transition-all duration-500 ${
            isSilver
                ? "border-slate-300/40"
                : isGold
                    ? "border-amber-400/50"
                    : "border-[#2B2323] group-hover:border-[#F70776]/50"
        }`}>
            {/* Keyframe for Left to Right Smooth Infinite Auto-Scrolling */}
            <style>{`
                @keyframes scrollLeftToRight {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0%);
                    }
                }
                .scrolling-video-track {
                    display: flex;
                    width: max-content;
                    animation: scrollLeftToRight 28s linear infinite;
                    will-change: transform;
                }
                .scrolling-video-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Top Bar: Live DJ Preview Badge & Audio Waveform */}
            <div className="relative z-20 p-4 sm:p-5 flex items-center justify-between gap-2 bg-gradient-to-b from-black/80 to-transparent">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white shadow-lg">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${
                        isGold ? "bg-amber-400" : isSilver ? "bg-slate-200" : "bg-[#F70776]"
                    }`} />
                    <span>{fullVideos.length} Stage Feeds • Auto-Streaming</span>
                </div>

                {/* Animated Equalizer Waveform */}
                <div className="flex items-end gap-1 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                    <span className="w-1 bg-[#F70776] rounded-full animate-bounce h-2.5" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 bg-[#25D366] rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce h-3" style={{ animationDelay: '300ms' }} />
                    <span className="w-1 bg-[#F70776] rounded-full animate-bounce h-4.5" style={{ animationDelay: '450ms' }} />
                </div>
            </div>

            {/* Middle: CONTINUOUS AUTO-SCROLLING VIDEOS TRACK (LEFT TO RIGHT) */}
            <div className="relative z-10 my-auto py-2 w-full overflow-hidden flex items-center">
                {/* Left & Right Cinematic Vignette Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-[#0D0B0B] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#0D0B0B] to-transparent z-10 pointer-events-none" />

                <div className="scrolling-video-track flex items-center gap-3 sm:gap-4 px-2">
                    {loopedVideos.map((videoSrc, vIdx) => (
                        <div
                            key={vIdx}
                            onClick={() => setActiveVideoUrl(videoSrc)}
                            className="relative w-44 sm:w-52 h-56 sm:h-64 rounded-2xl overflow-hidden bg-black/80 border border-white/15 shrink-0 group/card cursor-pointer shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#F70776] hover:shadow-[0_0_25px_rgba(247,7,118,0.5)]"
                        >
                            {/* Autoplaying video */}
                            <video
                                src={videoSrc}
                                autoPlay
                                muted={isMuted}
                                loop
                                playsInline
                                className="w-full h-full object-cover filter brightness-85 group-hover/card:brightness-100 transition-all duration-500"
                            />

                            {/* Inner Video Gradient & Badge */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/10">
                                Cam 0{(vIdx % fullVideos.length) + 1}
                            </div>

                            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white font-medium">
                                <span className="text-[#FAF6F6]/80 text-[10px] font-bold">● LIVE</span>
                                <span className="text-[9px] bg-[#F70776]/30 text-[#F70776] px-1.5 py-0.5 rounded border border-[#F70776]/40 font-bold">
                                    4K HD
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar: Sound Toggle & Interaction Hints */}
            <div className="relative z-20 p-4 sm:p-5 flex items-center justify-between gap-3 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center gap-2">
                    {/* Unmute / Mute Audio Controller */}
                    <button
                        onClick={toggleMuteAll}
                        className="px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-[#F70776] backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg cursor-pointer"
                        title={isMuted ? "Unmute all videos" : "Mute all videos"}
                    >
                        {isMuted ? (
                            <>
                                <span className="text-xs">🔇</span>
                                <span className="text-[10px] uppercase tracking-wider font-bold">Unmute Audio</span>
                            </>
                        ) : (
                            <>
                                <span className="text-xs">🔊</span>
                                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-300">Live Sound ON</span>
                            </>
                        )}
                    </button>

                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#141010]/80 text-[#BDB2B2] border border-white/10 hidden sm:inline-block">
                        {plan.name} Live Array
                    </span>
                </div>

                <span className="text-[10px] text-[#A69B9B] font-medium hidden sm:inline-block">
                    Hover to pause scroll
                </span>
            </div>
        </div>
    );
}

export default function Services() {
    const [services, setServices] = useState(DEFAULT_SERVICES);
    const [plans, setPlans] = useState(DEFAULT_PLANS);
    const [selectedServiceId, setSelectedServiceId] = useState(1);

    useEffect(() => {
        // Fetch Live Services
        fetch(`${API_BASE_URL}/services`)
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                    setServices(data.data);
                }
            })
            .catch(err => console.log('Using default services (offline or loading)'));

        // Fetch Live Plans
        fetch(`${API_BASE_URL}/plans`)
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                    setPlans(data.data);
                }
            })
            .catch(err => console.log('Using default plans (offline or loading)'));
    }, []);

    const handleServiceToggle = (id) => {
        setSelectedServiceId((prev) => (prev === id ? null : id));
    };

    const handleBookService = (service) => {
        const el = document.getElementById("contacts") || document.getElementById("contact");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <div id="services">
            <section className="bg-[#141010] text-[#FAF6F6] min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
                {/* Pulse glow animation for CTA button */}
                <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(247, 7, 118, 0.4); }
          50% { box-shadow: 0 0 24px rgba(247, 7, 118, 0.8); }
        }
        .btn-animated {
          animation: pulseGlow 2.5s infinite ease-in-out;
        }
      `}</style>

                <div className="max-w-7xl w-full mx-auto bg-[#1C1717] border border-[#2B2323] rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl">
                    {/* Header Area */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
                        <div className="space-y-3 max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2B2323] bg-[#141010]/80 text-xs font-semibold uppercase tracking-wider text-[#A69B9B]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F70776] animate-pulse" />
                                Our Signature Services
                            </div>

                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#FAF6F6] leading-tight">
                                What we can do <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F70776] via-[#C3195D] to-[#F70776]">for your event</span>
                            </h2>
                        </div>

                        <div className="flex flex-col items-start lg:items-end gap-3 max-w-md">
                            <p className="text-[#BDB2B2] text-xs sm:text-sm leading-relaxed lg:text-right font-light">
                                Select any service to explore integrated rates, stage features, and instant booking options.
                            </p>
                            <span className="text-[11px] text-[#F70776] font-semibold uppercase tracking-wider bg-[#F70776]/10 px-3 py-1 rounded-full border border-[#F70776]/20">
                                Tap card to expand rates & booking
                            </span>
                        </div>
                    </div>

                    {/* Integrated 6 Services Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {services.map((service) => {
                            const isSelected = service.id === selectedServiceId;
                            return (
                                <div
                                    key={service.id}
                                    onClick={() => handleServiceToggle(service.id)}
                                    className={`group relative rounded-3xl overflow-hidden border cursor-pointer transition-all duration-500 bg-[#141010] flex flex-col justify-between ${
                                        isSelected
                                            ? "border-[#F70776] ring-2 ring-[#F70776]/50 shadow-[0_0_30px_rgba(247,7,118,0.25)] scale-[1.01]"
                                            : "border-[#2B2323] hover:border-[#C3195D]/80 hover:shadow-lg hover:-translate-y-1"
                                    }`}
                                >
                                    {/* Media Thumbnail & Badges Container */}
                                    <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className={`w-full h-full object-cover transition-transform duration-700 ${
                                                isSelected
                                                    ? "scale-105 filter brightness-95"
                                                    : "filter brightness-80 contrast-110 group-hover:scale-105"
                                            }`}
                                        />

                                        {/* Gradient Overlay for Text Legibility */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#141010] via-[#141010]/50 to-transparent opacity-95" />

                                        {/* Top Badges: ID & Price Badge Integrated */}
                                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#141010]/85 backdrop-blur-md border border-white/10 text-white shadow-md">
                                                0{service.id}
                                            </span>

                                            {/* Integrated Price Pill Badge */}
                                            <div className="px-3 py-1 rounded-full bg-[#F70776] text-white text-xs sm:text-sm font-black tracking-wide shadow-[0_0_15px_rgba(247,7,118,0.6)] flex items-center gap-1">
                                                <span>{service.price}</span>
                                            </div>
                                        </div>

                                        {/* Service Title on Card Header */}
                                        <div className="absolute bottom-3 left-4 right-4 z-10">
                                            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                                                {service.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Card Body: Description & Details */}
                                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                                        <p className="text-xs sm:text-sm text-[#D4CCCC] font-light leading-relaxed">
                                            {service.description}
                                        </p>

                                        {/* Feature Highlights Pills */}
                                        <div className="space-y-1.5 pt-2 border-t border-[#2B2323]">
                                            {service.features.map((feat, fIdx) => (
                                                <div key={fIdx} className="flex items-center gap-2 text-xs text-[#BDB2B2]">
                                                    <span className="w-4 h-4 rounded-full bg-[#F70776]/20 text-[#F70776] flex items-center justify-center shrink-0 text-[10px] font-bold">
                                                        ✓
                                                    </span>
                                                    <span className="font-medium text-neutral-300">{feat}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Integrated Animated Price & Booking Drawer */}
                                        <div className="pt-3 border-t border-[#2B2323]/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-[#A69B9B]">
                                                    Starting Rate
                                                </span>
                                                <span className="text-lg sm:text-xl font-extrabold text-[#F70776]">
                                                    {service.price}
                                                </span>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBookService(service);
                                                }}
                                                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#C3195D] hover:bg-[#F70776] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(195,25,93,0.4)] hover:shadow-[0_0_20px_rgba(247,7,118,0.7)] flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                                            >
                                                <span>Book This</span>
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="bg-[#141010] text-[#FAF6F6] py-16 px-4 sm:px-6 lg:px-8 font-sans border-b border-[#2B2323] overflow-hidden">
                <div className="max-w-[90rem] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        {/* Left Column: DJ Explanation & Details */}
                        <div className="lg:col-span-7 space-y-8">
                            {/* Sub-badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2B2323] bg-[#1C1717] text-xs font-semibold uppercase tracking-wider text-[#A69B9B]">
                                <span className="w-2 h-2 rounded-full bg-[#F70776] animate-pulse" />
                                The Ultimate Sound Experience
                            </div>

                            {/* Main Heading */}
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#FAF6F6] leading-[1.1]">
                                Crafting Unforgettable <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F70776] via-[#C3195D] to-[#F70776]">
                                    Sonic Journeys
                                </span>
                            </h2>

                            {/* Description */}
                            <p className="text-[#BDB2B2] text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                                We don’t just play tracks—we curate electrifying atmospheres
                                tailored to your crowd. Combining decade-honed live mixing
                                skills, festival-grade acoustics, and real-time visual
                                synchronization, we bring full-scale stage energy to private
                                events, club venues, and massive festival grounds.
                            </p>

                            {/* Feature Highlights Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="bg-[#1C1717] border border-[#2B2323] p-4 rounded-2xl flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-[#C3195D]/20 border border-[#C3195D]/40 text-[#F70776] flex items-center justify-center shrink-0 mt-0.5">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#FAF6F6] uppercase tracking-wide">
                                            Live Stem Mixing
                                        </h4>
                                        <p className="text-xs text-[#A69B9B] mt-1 font-light">
                                            Seamless real-time mashups, dynamic transitions, and
                                            custom live edits.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-[#1C1717] border border-[#2B2323] p-4 rounded-2xl flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-[#C3195D]/20 border border-[#C3195D]/40 text-[#F70776] flex items-center justify-center shrink-0 mt-0.5">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 10V3L4 14h7v7l9-11h-6z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#FAF6F6] uppercase tracking-wide">
                                            High-Octane Energy
                                        </h4>
                                        <p className="text-xs text-[#A69B9B] mt-1 font-light">
                                            Expert crowd reading that keeps the dance floor packed all
                                            night long.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2B2323]">
                                <div>
                                    <span className="block text-2xl sm:text-4xl font-black text-[#F70776]">
                                        500+
                                    </span>
                                    <span className="text-xs text-[#A69B9B] uppercase tracking-wider font-medium">
                                        Events Played
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-2xl sm:text-4xl font-black text-[#FAF6F6]">
                                        25+
                                    </span>
                                    <span className="text-xs text-[#A69B9B] uppercase tracking-wider font-medium">
                                        Years Experience
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-2xl sm:text-4xl font-black text-[#F70776]">
                                        100%
                                    </span>
                                    <span className="text-xs text-[#A69B9B] uppercase tracking-wider font-medium">
                                        Client Satisfaction
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: DJ Image Showcase with Background Ambient Glow */}
                        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                            {/* Glowing Background FX */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#F70776]/20 rounded-full blur-[100px] pointer-events-none" />

                            {/* Image Frame Container */}
                            <div className="relative w-full max-w-md lg:max-w-none rounded-3xl p-2 bg-gradient-to-b from-[#2B2323] via-[#1C1717] to-[#141010] border border-[#2B2323] shadow-2xl">
                                <div className="relative h-[420px] sm:h-[500px] rounded-2xl overflow-hidden">
                                    {/* Main DJ Image */}
                                    <img
                                        src="https://images.unsplash.com/photo-1599423424751-54e0c1187a02?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="DJ Performing Live"
                                        className="w-full h-full object-cover filter contrast-110 brightness-90 transform hover:scale-105 transition-transform duration-700"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#141010] via-[#141010]/20 to-transparent opacity-80" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-[#141010] text-[#FAF6F6] min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#F70776] selection:text-white">
                {/* Custom Keyframes for Glowing Effects */}
                <style>{`
        @keyframes silverGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(226, 232, 240, 0.25), inset 0 0 15px rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 30px rgba(226, 232, 240, 0.45), inset 0 0 20px rgba(255, 255, 255, 0.2); }
        }
        @keyframes goldGlow {
          0%, 100% { box-shadow: 0 0 18px rgba(234, 179, 8, 0.3), inset 0 0 15px rgba(234, 179, 8, 0.15); }
          50% { box-shadow: 0 0 35px rgba(234, 179, 8, 0.6), inset 0 0 25px rgba(234, 179, 8, 0.3); }
        }
        .card-silver { animation: silverGlow 3s infinite ease-in-out; }
        .card-gold { animation: goldGlow 3s infinite ease-in-out; }
      `}</style>

                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2B2323] bg-[#1C1717] text-xs font-semibold uppercase tracking-wider text-[#A69B9B] mb-3">
                            <span className="w-2 h-2 rounded-full bg-[#F70776] animate-pulse" />
                            DJ Event Packages
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FAF6F6] leading-tight">
                            Pricing That Scales <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F70776] via-[#C3195D] to-[#F70776]">
                                With Your Event
                            </span>
                        </h2>
                        <p className="text-xs sm:text-sm text-[#A69B9B] font-light mt-3 max-w-xl mx-auto">
                            Transparent pricing tailored for intimate gatherings, club stages, corporate banquets, and massive festivals.
                        </p>
                    </div>

                    {/* Vertically Aligned Plans List with Left-Side Video Showcase */}
                    <div className="flex flex-col space-y-8 lg:space-y-10">
                        {plans.map((plan, idx) => {
                            const isSilver = plan.theme === "silver";
                            const isGold = plan.theme === "gold";

                            return (
                                <div
                                    key={plan.id || idx}
                                    className={`relative rounded-3xl p-5 sm:p-7 lg:p-8 transition-all duration-500 border ${isSilver
                                        ? "card-silver bg-gradient-to-br from-[#24272C] via-[#1A1C20] to-[#120F0F] border-slate-300/60 shadow-2xl hover:shadow-[0_0_40px_rgba(226,232,240,0.2)]"
                                        : isGold
                                            ? "card-gold bg-gradient-to-br from-[#2B2312] via-[#1D170D] to-[#120F0F] border-amber-400/80 shadow-2xl hover:shadow-[0_0_40px_rgba(234,179,8,0.3)]"
                                            : "bg-[#1C1717] border-[#2B2323] hover:border-[#C3195D]/70 shadow-2xl hover:shadow-[0_0_30px_rgba(247,7,118,0.15)]"
                                        }`}
                                >
                                    {/* 2-Column Responsive Layout */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                                        {/* LEFT SIDE: Auto-Scrolling Video Showcase */}
                                        <div className="lg:col-span-5 flex flex-col">
                                            <PlanVideoShowcase plan={plan} isSilver={isSilver} isGold={isGold} />
                                        </div>

                                        {/* RIGHT SIDE: Plan Details, Pricing & Inclusions */}
                                        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                                            <div className="space-y-4">
                                                {/* Top Badges */}
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <span
                                                        className={`text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${isSilver
                                                            ? "bg-slate-200 text-black shadow-md"
                                                            : isGold
                                                                ? "bg-gradient-to-r from-amber-300 to-yellow-500 text-black font-black shadow-md"
                                                                : "bg-[#141010] text-[#A69B9B] border border-[#2B2323]"
                                                            }`}
                                                    >
                                                        {plan.badge}
                                                    </span>

                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A69B9B] flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#F70776]" />
                                                        {plan.theme === 'gold' ? 'Ultra VIP Tier' : plan.theme === 'silver' ? 'Concert Grade' : 'Signature Tier'}
                                                    </span>
                                                </div>

                                                {/* Plan Header */}
                                                <div>
                                                    <h3
                                                        className={`text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight ${isSilver
                                                            ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400"
                                                            : isGold
                                                                ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-amber-300 to-yellow-500"
                                                                : "text-[#FAF6F6]"
                                                            }`}
                                                    >
                                                        {plan.name}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-[#BDB2B2] font-light leading-relaxed mt-2">
                                                        {plan.desc}
                                                    </p>
                                                </div>

                                                {/* Price Display */}
                                                <div className="flex items-baseline gap-2 pt-1">
                                                    <span
                                                        className={`text-3xl sm:text-4xl font-black ${isSilver
                                                            ? "text-white"
                                                            : isGold
                                                                ? "text-amber-300"
                                                                : "text-[#FAF6F6]"
                                                            }`}
                                                    >
                                                        {plan.monthlyPrice || plan.price}
                                                    </span>
                                                    <span className="text-xs text-[#A69B9B]">
                                                        {plan.period || "/ event"}
                                                    </span>
                                                </div>

                                                <div
                                                    className={`w-full h-px ${isSilver
                                                        ? "bg-slate-400/30"
                                                        : isGold
                                                            ? "bg-amber-400/30"
                                                            : "bg-[#2B2323]"
                                                        }`}
                                                />

                                                {/* Features Checklist in 2-Column Responsive Grid */}
                                                <div>
                                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A69B9B] block mb-2.5">
                                                        Included In This Package:
                                                    </span>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                                        {plan.features?.map((feat, fIdx) => (
                                                            <li key={fIdx} className="flex items-start gap-2">
                                                                {feat.included ? (
                                                                    <svg
                                                                        className={`w-4 h-4 shrink-0 mt-0.5 ${isSilver
                                                                            ? "text-slate-200"
                                                                            : isGold
                                                                                ? "text-amber-400"
                                                                                : "text-[#F70776]"
                                                                            }`}
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2.5"
                                                                            d="M5 13l4 4L19 7"
                                                                        />
                                                                    </svg>
                                                                ) : (
                                                                    <svg
                                                                        className="w-4 h-4 shrink-0 mt-0.5 text-[#A69B9B]/30"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M6 18L18 6M6 6l12 12"
                                                                        />
                                                                    </svg>
                                                                )}
                                                                <span
                                                                    className={`${feat.included
                                                                        ? "text-[#FAF6F6] font-medium"
                                                                        : "text-[#A69B9B]/40 line-through font-light"
                                                                        }`}
                                                                >
                                                                    {feat.text}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Action CTA Button & Guarantee Strip */}
                                            <div className="pt-3 border-t border-[#2B2323] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-3 text-[11px] text-[#A69B9B]">
                                                    <span className="flex items-center gap-1">
                                                        <span className="text-[#25D366]">✓</span> Pro Acoustic Array
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="text-[#25D366]">✓</span> 100% Reliability
                                                    </span>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        const el = document.getElementById("contacts") || document.getElementById("contact");
                                                        if (el) el.scrollIntoView({ behavior: "smooth" });
                                                    }}
                                                    className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer text-center ${isSilver
                                                        ? "bg-gradient-to-r from-slate-100 via-slate-300 to-slate-200 hover:from-white hover:to-slate-100 text-black font-black shadow-[0_0_20px_rgba(226,232,240,0.4)]"
                                                        : isGold
                                                            ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-black shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                                                            : "bg-[#C3195D] hover:bg-[#F70776] text-white shadow-[0_0_15px_rgba(195,25,93,0.4)]"
                                                        }`}
                                                >
                                                    {plan.buttonText || `Book ${plan.name}`}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
