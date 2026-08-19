import React, { useState } from "react";
import Navbar from "./Navbar";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Homepage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-[#141010] min-h-screen flex flex-col text-[#F3ECEC] overflow-x-hidden">
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <main className="w-full max-w-7xl mx-auto px-6 py-6 md:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 flex-grow">
                {/* Left Content Column */}
                <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6 md:space-y-8 z-10 text-left">
                    {/* Subheading Badging Layout */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-[#2B2323] flex items-center justify-center bg-[#1D1717]">
                            <DotLottieReact
                                src="https://lottie.host/d53020d8-3c69-41d8-999c-f4e95d93a86b/MYNL3kJFiS.lottie"
                                loop
                                autoplay
                            />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#A69B9B] font-semibold">
                                25 Years of Excellence
                            </p>
                        </div>
                    </div>

                    {/* Core Impact Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] uppercase max-w-xl text-[#FAF6F6]">
                        TURN EVERY EVENT INTO{" "}
                        <span className="text-[#C3195D]">AN EXPERIENCE.</span>
                    </h1>

                    {/* Description Text */}
                    <p className="text-[#BDB2B2] text-sm sm:text-base max-w-md leading-relaxed font-light">
                        We don't just create sound. We create experiences. Audio, DJ,
                        orchestra, lighting, stage and full event production.
                    </p>

                    {/* CTA Element Array */}
                    <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-[#C3195D] hover:bg-[#a6134e] text-white px-8 py-3.5 rounded-full font-medium tracking-wide text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_20px_rgba(195,25,93,0.3)]">
                            Contact me
                        </button>
                        <button className="w-full sm:w-auto border border-[#2B2323] hover:border-[#C3195D] hover:text-[#C3195D] text-[#FAF6F6] px-8 py-3.5 rounded-full font-medium tracking-wide text-sm transition-all duration-300 flex items-center justify-center gap-2 bg-[#1D1717]/50 group">
                            <svg
                                className="w-4 h-4 text-[#A69B9B] group-hover:text-[#C3195D] transition-colors"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Watch gallery
                        </button>
                    </div>
                </div>

                {/* Compact Right Media Preview Column */}
                <div className="w-full lg:w-1/2 flex justify-center items-center relative py-2">
                    <div className="relative w-full max-w-xs sm:max-w-sm aspect-[3/4] max-h-[380px] sm:max-h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#2B2323] group shadow-xl">
                        {/* Overlay Gradient Profile */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141010] via-transparent to-transparent opacity-85 z-10 transition-opacity duration-300 group-hover:opacity-65" />

                        {/* Image Placement */}
                        <img
                            src="https://images.unsplash.com/photo-1541126274323-dbac58d14741?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="DJ performing at mixer panel"
                            className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Circular Video Badge Overlay Components */}
                        <div className="absolute top-5 left-5 z-20 hidden sm:block">
                            <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer group/badge">
                                <svg
                                    className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
                                    viewBox="0 0 100 100"
                                >
                                    <path
                                        id="textPath"
                                        d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                        fill="none"
                                    />
                                    <text className="text-[8px] fill-[#FAF6F6] uppercase tracking-[0.18em] font-semibold">
                                        <textPath href="#textPath" startOffset="0%">
                                            • PLAY VIDEO • PLAY VIDEO • PLAY VIDEO{" "}
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="w-8 h-8 rounded-full bg-[#FAF6F6] text-[#141010] flex items-center justify-center transition-transform duration-300 group-hover/badge:scale-110 shadow-lg">
                                    <svg
                                        className="w-3.5 h-3.5 ml-0.5 fill-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}