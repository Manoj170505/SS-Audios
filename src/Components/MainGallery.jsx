import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://ss-audios-backend-production.up.railway.app/api";

const DEFAULT_CATEGORIES = [
    "All",
    "Stage & Lighting",
    "DJ Events",
    "Orchestra",
    "Audio Setup",
    "Weddings",
    "Ambient",
    "Club",
    "Festival"
];

const DEFAULT_GALLERY_VIDEOS = [
    {
        id: "demo-1",
        title: "Live Concert Stage & Neon FX",
        category: "Stage & Lighting",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "demo-2",
        title: "Arena DJ Performance & Crowd Energy",
        category: "DJ Events",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1541126274323-dbac58d14741?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "demo-3",
        title: "Symphonic Orchestra & Live Sound",
        category: "Orchestra",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "demo-4",
        title: "Grand Wedding Reception Lighting",
        category: "Weddings",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "demo-5",
        title: "Pro Line Array Sound Setup",
        category: "Audio Setup",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
];

export default function GallerySection() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [galleryVideos, setGalleryVideos] = useState(DEFAULT_GALLERY_VIDEOS);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeModalMedia, setActiveModalMedia] = useState(null);

    // Fetch live media from DynamoDB / S3 backend
    useEffect(() => {
        const loadMedia = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/media`);
                const result = await res.json();
                if (result.success && Array.isArray(result.data) && result.data.length > 0) {
                    const mapped = result.data.map(item => {
                        const directOrProxyUrl = item.url || `${API_BASE_URL}/media/stream/${item.id}`;
                        return {
                            id: item.id,
                            title: item.title,
                            category: item.category || "Ambient",
                            type: item.type || "image",
                            thumbnail: item.type === "image" ? directOrProxyUrl : "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
                            videoUrl: directOrProxyUrl
                        };
                    });

                    setGalleryVideos(mapped);

                    // Dynamically extract unique categories
                    const dynamicCats = ["All", ...new Set([...DEFAULT_CATEGORIES.slice(1), ...result.data.map(i => i.category).filter(Boolean)])];
                    setCategories(dynamicCats);
                }
            } catch (err) {
                console.log("Using default gallery data (backend initializing/offline)");
            }
        };

        loadMedia();
    }, []);

    // Filter items based on active category tag
    const filteredVideos =
        selectedCategory === "All"
            ? galleryVideos
            : galleryVideos.filter((v) => v.category?.toLowerCase() === selectedCategory.toLowerCase());

    const handleNext = () => {
        if (filteredVideos.length === 0) return;
        setActiveIndex((prev) => (prev + 1) % filteredVideos.length);
    };

    const handlePrev = () => {
        if (filteredVideos.length === 0) return;
        setActiveIndex((prev) =>
            prev === 0 ? filteredVideos.length - 1 : prev - 1
        );
    };

    return (
        <section id="main-gallery-section" className="bg-[#141010] text-[#FAF6F6] py-12 px-4 sm:px-8 relative overflow-hidden font-sans min-h-screen">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C3195D]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Top Navigation / Back Button Bar */}
                <div className="w-full flex items-center justify-between mb-8">
                    <button
                        onClick={() => {
                            navigate("/");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#1C1717] hover:bg-[#251e1e] border border-[#2B2323] hover:border-[#F70776] text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(247,7,118,0.4)] group cursor-pointer transform hover:-translate-x-1"
                    >
                        <span className="w-7 h-7 rounded-full bg-[#141010] flex items-center justify-center text-[#A69B9B] group-hover:text-[#F70776] group-hover:bg-neutral-900 border border-[#2B2323] group-hover:border-[#F70776]/50 transition-all">
                            <svg
                                className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                        </span>
                        <span>Back to Home</span>
                    </button>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2B2323] bg-[#1C1717] text-xs font-semibold uppercase tracking-wider text-[#A69B9B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F70776] animate-pulse" />
                        Live Media Vault
                    </div>
                </div>

                {/* Main Card Container */}
                <div className="bg-[#1C1717] border border-[#2B2323] rounded-[2.5rem] p-8 sm:p-12 shadow-2xl flex flex-col items-center text-center">

                    {/* Header */}
                    <span className="text-xs uppercase tracking-[0.25em] text-[#A69B9B] font-semibold mb-2">
                        LIVE MEDIA VAULT
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#FAF6F6] mb-3">
                        SOUNDSCAPE GALLERY
                    </h2>
                    <p className="text-[#BDB2B2] text-sm max-w-md font-light mb-8">
                        Explore our latest audio mixes, festival visuals, stage lighting, and production moments synced live from AWS.
                    </p>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap justify-center items-center gap-2.5 mb-12 max-w-3xl">
                        {categories.map((cat) => {
                            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                            return (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setActiveIndex(0);
                                    }}
                                    className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border ${isActive
                                            ? "bg-[#FAF6F6] text-[#141010] border-[#FAF6F6] shadow-md scale-105"
                                            : "bg-[#141010]/60 text-[#A69B9B] border-[#2B2323] hover:border-[#C3195D] hover:text-[#FAF6F6]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>

                    {/* Overlapping Card Slider Container */}
                    {filteredVideos.length > 0 ? (
                        <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center mb-8">
                            {filteredVideos.map((item, index) => {
                                const offset = index - activeIndex;
                                const isCenter = offset === 0;

                                // Hide cards that are far away from view
                                if (Math.abs(offset) > 2) return null;

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            if (isCenter) setActiveModalMedia(item);
                                            else setActiveIndex(index);
                                        }}
                                        style={{
                                            transform: `translateX(${offset * 120}px) scale(${isCenter ? 1 : 0.85 - Math.abs(offset) * 0.05
                                                })`,
                                            zIndex: 20 - Math.abs(offset),
                                            opacity: isCenter ? 1 : 0.6 - Math.abs(offset) * 0.2,
                                        }}
                                        className="absolute w-[240px] sm:w-[280px] h-[340px] sm:h-[400px] rounded-3xl overflow-hidden border border-[#2B2323] bg-[#141010] shadow-2xl transition-all duration-500 ease-out cursor-pointer group"
                                    >
                                        {/* Image or Video Thumbnail */}
                                        {item.type === "video" ? (
                                            <video
                                                src={item.videoUrl}
                                                muted
                                                loop
                                                autoPlay
                                                playsInline
                                                className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-all duration-500"
                                            />
                                        ) : (
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-all duration-500"
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop";
                                                }}
                                            />
                                        )}

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#141010] via-transparent to-transparent opacity-90" />

                                        {/* Video Info & Play Button */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 text-left">
                                            <span className="self-start px-3 py-1 bg-[#141010]/80 border border-[#2B2323] backdrop-blur-md rounded-full text-[10px] uppercase tracking-wider text-[#A69B9B]">
                                                {item.category}
                                            </span>

                                            <div>
                                                {/* Play Icon */}
                                                <div className="w-12 h-12 rounded-full bg-[#FAF6F6] text-[#141010] flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 group-hover:bg-[#C3195D] group-hover:text-white transition-all duration-300">
                                                    <svg className="w-5 h-5 ml-0.5 fill-current" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-20 text-[#A69B9B] text-sm">
                            No assets in this category yet.
                        </div>
                    )}

                    {/* Carousel Arrows */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePrev}
                            aria-label="Previous asset"
                            className="w-10 h-10 rounded-full border border-[#2B2323] bg-[#141010] flex items-center justify-center text-[#FAF6F6] hover:border-[#C3195D] hover:text-[#C3195D] transition-colors"
                        >
                            ←
                        </button>
                        <button
                            onClick={handleNext}
                            aria-label="Next asset"
                            className="w-10 h-10 rounded-full border border-[#2B2323] bg-[#141010] flex items-center justify-center text-[#FAF6F6] hover:border-[#C3195D] hover:text-[#C3195D] transition-colors"
                        >
                            →
                        </button>
                    </div>

                </div>
            </div>

            {/* Media Lightbox Modal */}
            {activeModalMedia && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl bg-[#1C1717] rounded-3xl overflow-hidden border border-[#2B2323] shadow-2xl">
                        <button
                            onClick={() => setActiveModalMedia(null)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#141010]/80 backdrop-blur-md border border-[#2B2323] text-white flex items-center justify-center hover:bg-[#C3195D] transition-colors"
                        >
                            ✕
                        </button>

                        <div className="aspect-video w-full flex items-center justify-center bg-black">
                            {activeModalMedia.type === "video" && (
                                <video
                                    src={activeModalMedia.videoUrl}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                />
                            )}
                            {activeModalMedia.type === "image" && (
                                <img
                                    src={activeModalMedia.videoUrl || activeModalMedia.thumbnail}
                                    alt={activeModalMedia.title}
                                    className="w-full h-full object-contain"
                                />
                            )}
                            {activeModalMedia.type === "audio" && (
                                <div className="p-8 flex flex-col items-center justify-center space-y-4">
                                    <span className="text-6xl">🎵</span>
                                    <h4 className="text-lg font-bold text-white">{activeModalMedia.title}</h4>
                                    <audio src={activeModalMedia.videoUrl} controls autoPlay className="w-full max-w-md" />
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-[#141010] border-t border-[#2B2323] flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-white">{activeModalMedia.title}</h3>
                                <p className="text-xs text-[#A69B9B] mt-0.5">{activeModalMedia.category}</p>
                            </div>
                            <span className="px-3 py-1 bg-[#C3195D]/20 text-[#F70776] border border-[#F70776]/30 rounded-full text-xs font-bold uppercase">
                                {activeModalMedia.type}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}