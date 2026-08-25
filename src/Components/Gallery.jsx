import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://ss-audios-backend-production.up.railway.app/api";

const DEFAULT_GALLERY_ITEMS = [
  {
    id: 1,
    title: "Festival Mainstage",
    category: "Live Set",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-party-41338-large.mp4",
  },
  {
    id: 2,
    title: "Light Show Sync",
    category: "Visual FX",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-laser-lights-in-a-stage-show-41551-large.mp4",
  },
  {
    id: 3,
    title: "Crowd Vibration",
    category: "Nightclub",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-stage-lights-and-crowd-at-a-concert-41550-large.mp4",
  },
  {
    id: 4,
    title: "Live Stem Remixing",
    category: "Studio Live",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-mixing-music-41337-large.mp4",
  },
  {
    id: 5,
    title: "Stage Pyrotechnics",
    category: "Concert",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41552-large.mp4",
  },
  {
    id: 6,
    title: "Rooftop Lounge Set",
    category: "Sunset Vibes",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-on-stage-41339-large.mp4",
  },
];

export default function VideoGallerySection() {
  const navigate = useNavigate();
  const [galleryItems, setGalleryItems] = useState(DEFAULT_GALLERY_ITEMS);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch live video assets from backend DynamoDB / S3
  useEffect(() => {
    const fetchLiveMedia = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/media`);
        const result = await res.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          const videoItems = result.data.filter(item => item.type === "video" || item.type === "image");
          if (videoItems.length > 0) {
            const mapped = videoItems.map(item => ({
              id: item.id,
              title: item.title,
              category: item.category || "Live Event",
              video: item.url || `${API_BASE_URL}/media/stream/${item.id}`,
              type: item.type
            }));
            setGalleryItems(mapped);
          }
        }
      } catch (err) {
        console.log("Using default video gallery items (backend offline/loading)");
      }
    };

    fetchLiveMedia();
  }, []);

  const handleExploreFullGallery = () => {
    navigate("/gallery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="bg-[#141010] text-[#FAF6F6] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans border-b border-[#2B2323] relative select-none">
      {/* CSS Hardware-Accelerated Smooth Marquee Animation (Flicker-Free on Mobile) */}
      <style>{`
        @keyframes galleryMarqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .gallery-marquee-track {
          display: flex;
          width: max-content;
          animation: galleryMarqueeScroll 32s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .gallery-marquee-track.is-paused {
          animation-play-state: paused !important;
        }

        @media (max-width: 640px) {
          .gallery-marquee-track {
            animation-duration: 22s;
          }
        }
      `}</style>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F70776]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2B2323] bg-[#1C1717] text-xs font-semibold uppercase tracking-wider text-[#A69B9B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F70776] animate-pulse" />
            Live Event Archives
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FAF6F6] leading-tight">
            Electrifying <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F70776] via-[#C3195D] to-[#F70776]">
              Performance Moments
            </span>
          </h2>

          <p className="text-[#BDB2B2] text-sm sm:text-base font-light leading-relaxed">
            Experience the energy from our recent shows. Touch or hover over any card to pause scrolling and view highlights.
          </p>
        </div>

        {/* Straight Horizontal Marquee Wrapper with Stable Masks */}
        <div
          className="relative overflow-hidden py-4 -mx-4 sm:mx-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Edge shadow fades */}
          <div className="absolute top-0 left-0 bottom-0 w-10 sm:w-28 bg-gradient-to-r from-[#141010] to-transparent pointer-events-none z-20" />
          <div className="absolute top-0 right-0 bottom-0 w-10 sm:w-28 bg-gradient-to-l from-[#141010] to-transparent pointer-events-none z-20" />

          {/* Hardware-Accelerated Smooth 2-Set Infinite Track */}
          <div className={`gallery-marquee-track ${isPaused ? "is-paused" : ""}`}>
            {[...galleryItems, ...galleryItems].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={handleExploreFullGallery}
                className="relative shrink-0 mx-2.5 sm:mx-3.5 w-60 sm:w-72 lg:w-80 h-84 sm:h-[400px] rounded-3xl overflow-hidden border border-[#2B2323] hover:border-[#F70776] transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(247,7,118,0.3)] bg-[#1C1717] group cursor-pointer"
                style={{ transform: "translateZ(0)" }}
              >
                {/* Media Component */}
                {item.type === "image" ? (
                  <img
                    src={item.video}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141010] via-[#141010]/35 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#141010]/80 backdrop-blur-md border border-white/10 text-white shadow-md">
                    {item.category}
                  </span>
                </div>

                {/* Play Button Hover FX */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#F70776] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-[0_0_20px_rgba(247,7,118,0.8)]">
                  <svg
                    className="w-5 h-5 fill-current ml-0.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                  <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight group-hover:text-[#F70776] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F70776] animate-pulse" />
                    <span className="text-[11px] text-[#A69B9B] uppercase font-semibold tracking-wider">
                      Watch Performance
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Gallery Button Below Carousel */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={handleExploreFullGallery}
            className="group relative inline-flex items-center gap-3 bg-[#C3195D] hover:bg-[#F70776] text-white pl-7 pr-2.5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(195,25,93,0.4)] hover:shadow-[0_0_30px_rgba(247,7,118,0.7)] transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Full Gallery</span>
            <span className="w-8 h-8 rounded-full bg-[#141010] text-[#FAF6F6] flex items-center justify-center group-hover:bg-white group-hover:text-[#F70776] transition-all duration-300">
              <svg
                className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
