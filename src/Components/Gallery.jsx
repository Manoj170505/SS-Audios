import React, { useRef, useEffect } from "react";

export default function VideoGallerySection() {
  const scrollRef = useRef(null);

  // -------------------------------------------------------------
  // CAROUSEL SPEED SETTING:
  // Increase this number to make it scroll faster (e.g., 1.5, 2.0)
  // Decrease this number to make it scroll slower (e.g., 0.4, 0.5)
  // -------------------------------------------------------------
  const SCROLL_SPEED = 4.2;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId;

    const scroll = () => {
      // Increments scroll position from right to left
      container.scrollLeft += SCROLL_SPEED;

      // Loop back smoothly once reaching half the duplicated track width
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    // Pause animation when hovering over the carousel
    const handleMouseEnter = () => cancelAnimationFrame(animationFrameId);
    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const galleryItems = [
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

  return (
    <section className="bg-[#141010] text-[#FAF6F6] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans border-b border-[#2B2323] relative">
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
            Experience the energy from our recent shows. Hover over any video
            card to pause scrolling and view the set highlights.
          </p>
        </div>

        {/* Straight Horizontal Carousel Wrapper */}
        <div className="relative overflow-hidden py-4">
          {/* Scroll Track */}
          <div
            ref={scrollRef}
            className="flex items-center gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-4 px-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Duplicate array twice for smooth infinite loop */}
            {[...galleryItems, ...galleryItems, ...galleryItems].map(
              (item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="relative shrink-0 w-64 sm:w-72 lg:w-80 h-96 sm:h-[420px] rounded-3xl overflow-hidden border border-[#2B2323] hover:border-[#F70776] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(247,7,118,0.25)] bg-[#1C1717] group"
                >
                  {/* Playing Video */}
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141010] via-[#141010]/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#141010]/80 backdrop-blur-md border border-white/10 text-white">
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#F70776] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-2 h-2 rounded-full bg-[#F70776] animate-pulse" />
                      <span className="text-xs text-[#A69B9B] uppercase font-semibold tracking-wider">
                        Watch Performance
                      </span>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Left Side Shadow Fade */}
          <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#141010] to-transparent pointer-events-none z-20" />

          {/* Right Side Shadow Fade */}
          <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#141010] to-transparent pointer-events-none z-20" />
        </div>

        {/* Explore Gallery Button Below Carousel */}
        <div className="mt-10 sm:mt-12 text-center">
          <button className="group relative inline-flex items-center gap-3 bg-[#C3195D] hover:bg-[#F70776] text-white pl-7 pr-2.5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(195,25,93,0.4)] hover:shadow-[0_0_30px_rgba(247,7,118,0.7)] transform hover:-translate-y-0.5">
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
