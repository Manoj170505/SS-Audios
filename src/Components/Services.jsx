import React, { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Services() {
    const [selectedServiceId, setSelectedServiceId] = useState(1);

    const services = [
        {
            id: 1,
            title: "Wedding Events",
            price: "₹25,000",
            description:
                "High-end audio engineering with custom acoustic calibration, subwoofers, and crystal-clear sound staging.",
            image:
                "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
        },
        {
            id: 2,
            title: "Club & Event DJing",
            price: "$600 / night",
            description:
                "Seamless live beatmatching, crowd reading, and high-energy multi-genre music curation for all nightlife venues.",
            image:
                "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=600",
        },
        {
            id: 3,
            title: "Lighting & Stage FX",
            price: "$350 / show",
            description:
                "Intelligent moving heads, laser light shows, synchronized strobe sequences, and low-lying fog atmospheric FX.",
            image:
                "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
        },
        {
            id: 4,
            title: "Audio Production",
            price: "$250 / track",
            description:
                "Professional multi-track mixing, studio vocal tuning, stem mastering, and custom intro/outro DJ edits.",
            image:
                "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600",
        },
        {
            id: 5,
            title: "Live Mixing & Tuning",
            price: "$300 / session",
            description:
                "Real-time equalizer balancing, dynamic range compression, and feedback suppression for active stage performances.",
            image:
                "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600",
        },
        {
            id: 6,
            title: "Visual Projection",
            price: "$400 / setup",
            description:
                "Dynamic 3D video mapping, LED wall visuals, custom graphic displays, and real-time audio-reactive projections.",
            image:
                "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600",
        },
    ];

    const activeService =
        services.find((s) => s.id === selectedServiceId) || services[0];

    const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' | 'yearly'
    const [activeTab, setActiveTab] = useState("individual"); // 'individual' | 'teams'

    const plans = [
        {
            name: "Starter",
            badge: "Solo Creators",
            desc: "Essential DJ set for private home parties and intimate gatherings.",
            price: billingCycle === "monthly" ? "$199" : "$159",
            period: "/ event",
            buttonText: "Get Starter",
            theme: "standard",
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
            name: "Basic",
            badge: "Club Nights",
            desc: "Ideal for medium lounge venues, birthdays, and rooftop parties.",
            price: billingCycle === "monthly" ? "$399" : "$319",
            period: "/ event",
            buttonText: "Choose Basic",
            theme: "standard",
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
            name: "Standard",
            badge: "Corporate Events",
            desc: "Complete audio-visual setup for corporate events and weddings.",
            price: billingCycle === "monthly" ? "$699" : "$559",
            period: "/ event",
            buttonText: "Select Standard",
            theme: "standard",
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
            name: "Premium",
            badge: "MOST POPULAR",
            desc: "Full-scale concert production with silver-grade audio and staging.",
            price: billingCycle === "monthly" ? "$1,299" : "$1,039",
            period: "/ event",
            buttonText: "Upgrade to Premium",
            theme: "silver",
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
            name: "Elite",
            badge: "VIP / FESTIVAL",
            desc: "Ultimate festival experience with top-tier gold stage production.",
            price: billingCycle === "monthly" ? "$2,499" : "$1,999",
            period: "/ event",
            buttonText: "Book Elite VIP",
            theme: "gold",
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

    return (
        <div>
            <section className="bg-[#141010] text-[#FAF6F6] min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
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

                <div className="max-w-7xl w-full mx-auto bg-[#1C1717] border border-[#2B2323] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
                    {/* Header Area */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                        <div className="space-y-3 max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2B2323] bg-[#141010]/60 text-xs font-semibold uppercase tracking-wider text-[#A69B9B]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F70776]" />
                                Our Services
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#FAF6F6] leading-tight">
                                What we can do <br />
                                <span className="text-[#F70776]">for you</span>
                            </h2>
                        </div>

                        <div className="flex flex-col items-start lg:items-end gap-5 max-w-md">
                            <p className="text-[#BDB2B2] text-sm sm:text-base leading-relaxed lg:text-right font-light">
                                Tap any service card to reveal pricing and detailed
                                capabilities.
                            </p>

                            <button className="btn-animated group relative inline-flex items-center gap-3 bg-[#C3195D] hover:bg-[#F70776] text-white pl-6 pr-2 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:-translate-y-0.5">
                                <span>See our services</span>
                                <span className="w-8 h-8 rounded-full bg-[#141010] text-[#FAF6F6] flex items-center justify-center group-hover:bg-white group-hover:text-[#F70776] transition-all duration-300">
                                    <svg
                                        className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M7 17L17 7M17 7H7M17 7V17"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* 6 Services Grid Layout (6 columns on lg, 3 on md, 2 on sm, 1 on mobile) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                        {services.map((service) => {
                            const isSelected = service.id === selectedServiceId;
                            return (
                                <div
                                    key={service.id}
                                    onClick={() => setSelectedServiceId(service.id)}
                                    className={`group relative h-64 sm:h-72 lg:h-[320px] rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 transform ${isSelected
                                        ? "border-[#F70776] ring-2 ring-[#F70776]/50 scale-[1.02] shadow-[0_0_20px_rgba(247,7,118,0.3)]"
                                        : "border-[#2B2323] hover:border-[#C3195D] hover:-translate-y-1"
                                        } bg-[#141010]`}
                                >
                                    {/* Image */}
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className={`w-full h-full object-cover transition-transform duration-700 ${isSelected
                                            ? "scale-110 filter brightness-90"
                                            : "filter brightness-65 contrast-110 group-hover:scale-105"
                                            }`}
                                    />

                                    {/* Dark Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#141010] via-[#141010]/40 to-transparent opacity-90" />

                                    {/* Selection Highlight Badge / Icon */}
                                    <div
                                        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected
                                            ? "bg-[#F70776] text-white scale-110 shadow-lg"
                                            : "bg-[#141010]/60 backdrop-blur-md border border-white/10 text-white/70 group-hover:bg-[#C3195D] group-hover:text-white"
                                            }`}
                                    >
                                        <svg
                                            className={`w-3.5 h-3.5 transition-transform duration-300 ${isSelected ? "rotate-180" : ""}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.5"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>

                                    {/* Service Card Title */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                                        <span
                                            className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isSelected ? "text-[#F70776]" : "text-[#A69B9B]"}`}
                                        >
                                            Service 0{service.id}
                                        </span>
                                        <h3
                                            className={`text-sm font-bold leading-tight transition-colors duration-300 ${isSelected ? "text-white" : "text-[#FAF6F6]"}`}
                                        >
                                            {service.title}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Selected Service Dropdown Detail Box */}
                    <div className="mt-6 bg-[#141010] border border-[#F70776]/40 rounded-2xl p-6 sm:p-8 transition-all duration-500 shadow-xl relative overflow-hidden">
                        {/* Subtle Pink Ambient Glow */}
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#F70776]/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                            <div className="space-y-2 max-w-2xl">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#C3195D]/20 text-[#F70776] border border-[#C3195D]/40 uppercase tracking-widest">
                                        Selected Service
                                    </span>
                                    <span className="text-xs text-[#A69B9B]">
                                        0{activeService.id} / 06
                                    </span>
                                </div>
                                <h4 className="text-2xl sm:text-3xl font-black text-[#FAF6F6] uppercase tracking-tight">
                                    {activeService.title}
                                </h4>
                                <p className="text-[#BDB2B2] text-sm sm:text-base leading-relaxed font-light">
                                    {activeService.description}
                                </p>
                            </div>

                            {/* Price Tag & Action */}
                            <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-[#2B2323]">
                                <div className="text-left md:text-right">
                                    <span className="text-xs text-[#A69B9B] uppercase tracking-wider block">
                                        Estimated Rate
                                    </span>
                                    <span className="text-2xl sm:text-3xl font-extrabold text-[#F70776]">
                                        {activeService.price}
                                    </span>
                                </div>
                                <button className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#C3195D] hover:bg-[#F70776] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-300">
                                    Book This Service
                                </button>
                            </div>
                        </div>
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
                                        12+
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

                <div className="max-w-[90rem] mx-auto">
                    {/* Section Header Controls */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2B2323] bg-[#1C1717] text-xs font-semibold uppercase tracking-wider text-[#A69B9B] mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F70776]" />
                                Pricing Table
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FAF6F6]">
                                Pricing That Scales <br />
                                <span className="text-[#F70776]">With Your Event</span>
                            </h2>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            {/* Category Filter Pills */}
                            <div className="flex items-center bg-[#1C1717] border border-[#2B2323] p-1 rounded-full text-xs font-medium text-[#A69B9B]">
                                <button
                                    onClick={() => setActiveTab("individual")}
                                    className={`px-4 py-1.5 rounded-full transition-colors ${activeTab === "individual"
                                        ? "bg-[#2B2323] text-white"
                                        : "hover:text-white"
                                        }`}
                                >
                                    Individual
                                </button>
                                <button
                                    onClick={() => setActiveTab("teams")}
                                    className={`px-4 py-1.5 rounded-full transition-colors ${activeTab === "teams"
                                        ? "bg-[#2B2323] text-white"
                                        : "hover:text-white"
                                        }`}
                                >
                                    Venues & Teams
                                </button>
                            </div>

                            {/* Monthly / Yearly Billing Toggle */}
                            <div className="flex items-center gap-3 bg-[#1C1717] border border-[#2B2323] p-1.5 rounded-full">
                                <button
                                    onClick={() => setBillingCycle("monthly")}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${billingCycle === "monthly"
                                        ? "bg-[#C3195D] text-white shadow-md"
                                        : "text-[#A69B9B] hover:text-white"
                                        }`}
                                >
                                    Single Event
                                </button>
                                <button
                                    onClick={() => setBillingCycle("yearly")}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${billingCycle === "yearly"
                                        ? "bg-[#C3195D] text-white shadow-md"
                                        : "text-[#A69B9B] hover:text-white"
                                        }`}
                                >
                                    <span>Tour / Season</span>
                                    <span className="bg-[#F70776] text-[10px] text-white font-black px-2 py-0.5 rounded-full">
                                        SAVE 20%
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 5 Plans Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
                        {plans.map((plan, idx) => {
                            const isSilver = plan.theme === "silver";
                            const isGold = plan.theme === "gold";

                            return (
                                <div
                                    key={idx}
                                    className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border ${isSilver
                                        ? "card-silver bg-gradient-to-b from-[#2A2D32] via-[#1C1E22] to-[#141010] border-slate-300/60 lg:-translate-y-2 z-10"
                                        : isGold
                                            ? "card-gold bg-gradient-to-b from-[#332A15] via-[#1F1A10] to-[#141010] border-amber-400/80 lg:-translate-y-2 z-10"
                                            : "bg-[#1C1717] border-[#2B2323] hover:border-[#C3195D]/60"
                                        }`}
                                >
                                    <div>
                                        {/* Top Badge */}
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <span
                                                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isSilver
                                                    ? "bg-slate-200 text-black shadow-md"
                                                    : isGold
                                                        ? "bg-gradient-to-r from-amber-300 to-yellow-500 text-black font-black shadow-md"
                                                        : "bg-[#141010] text-[#A69B9B] border border-[#2B2323]"
                                                    }`}
                                            >
                                                {plan.badge}
                                            </span>
                                        </div>

                                        {/* Plan Header */}
                                        <h3
                                            className={`text-2xl font-black uppercase tracking-tight mb-2 ${isSilver
                                                ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400"
                                                : isGold
                                                    ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-amber-300 to-yellow-500"
                                                    : "text-[#FAF6F6]"
                                                }`}
                                        >
                                            {plan.name}
                                        </h3>
                                        <p className="text-xs text-[#BDB2B2] font-light leading-relaxed mb-6 min-h-[36px]">
                                            {plan.desc}
                                        </p>

                                        {/* Price Tag */}
                                        <div className="mb-6 flex items-baseline gap-1">
                                            <span
                                                className={`text-4xl font-black ${isSilver
                                                    ? "text-white"
                                                    : isGold
                                                        ? "text-amber-300"
                                                        : "text-[#FAF6F6]"
                                                    }`}
                                            >
                                                {plan.price}
                                            </span>
                                            <span className="text-xs text-[#A69B9B]">
                                                {plan.period}
                                            </span>
                                        </div>

                                        {/* Action CTA Button */}
                                        <button
                                            className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md mb-8 ${isSilver
                                                ? "bg-gradient-to-r from-slate-100 via-slate-300 to-slate-200 hover:from-white hover:to-slate-100 text-black font-black shadow-[0_0_20px_rgba(226,232,240,0.4)]"
                                                : isGold
                                                    ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-black shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                                                    : "bg-[#C3195D] hover:bg-[#F70776] text-white"
                                                }`}
                                        >
                                            {plan.buttonText}
                                        </button>

                                        <div
                                            className={`w-full h-px mb-6 ${isSilver
                                                ? "bg-slate-400/30"
                                                : isGold
                                                    ? "bg-amber-400/30"
                                                    : "bg-[#2B2323]"
                                                }`}
                                        />

                                        {/* Features List */}
                                        <ul className="space-y-3.5 text-xs">
                                            {plan.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-2.5">
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
                                                            className="w-4 h-4 shrink-0 mt-0.5 text-[#A69B9B]/40"
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
                                                            : "text-[#A69B9B]/50 line-through font-light"
                                                            }`}
                                                    >
                                                        {feat.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
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
