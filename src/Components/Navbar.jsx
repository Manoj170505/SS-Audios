import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: "Experience", target: "experience", type: "scroll" },
        { name: "Services", target: "services", type: "scroll" },
        { name: "Gallery", target: "/gallery", type: "route" },
    ];

    const isGalleryPage = location.pathname === "/gallery";

    const handleItemClick = (item) => {
        setIsOpen(false);
        if (item.type === "route") {
            navigate(item.target);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            if (location.pathname !== "/") {
                navigate("/");
                setTimeout(() => {
                    const el = document.getElementById(item.target);
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                    } else {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                }, 100);
            } else {
                const el = document.getElementById(item.target);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                } else if (item.target === "experience") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            }
        }
    };

    const handleLogoClick = () => {
        setIsOpen(false);
        if (location.pathname !== "/") {
            navigate("/");
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBookingClick = () => {
        setIsOpen(false);
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                const el = document.getElementById("contacts") || document.getElementById("contact");
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            }, 100);
        } else {
            const el = document.getElementById("contacts") || document.getElementById("contact");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full max-w-full overflow-hidden bg-[#141010]/95 backdrop-blur-md text-white px-6 py-4 border-b border-neutral-800">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Brand / Logo */}
                <div
                    onClick={handleLogoClick}
                    className="flex items-center space-x-3 cursor-pointer shrink-0 group"
                >
                    <div className="w-8 h-8 rounded-full bg-[#f70776] flex items-center justify-between px-1.5 py-2 transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(247,7,118,0.5)]">
                        <span className="w-1.5 h-1.5 bg-[#141010] rounded-full"></span>
                        <span className="w-1.5 h-1.5 bg-[#141010] rounded-full"></span>
                    </div>
                    <span className="font-bold text-xl tracking-wide uppercase text-white group-hover:text-[#f70776] transition-colors">
                        SS AUDIOS
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1 bg-[#1a1515] p-1.5 rounded-full border border-neutral-800">
                    {navItems.map((item, index) => {
                        const isCurrentActive = item.target === "/gallery" ? isGalleryPage : (!isGalleryPage && false);
                        return (
                            <button
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className={`px-5 py-2 text-xs uppercase font-medium tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                                    isCurrentActive
                                        ? "bg-neutral-800 text-[#f70776] shadow-[0_0_10px_rgba(247,7,118,0.3)]"
                                        : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
                                }`}
                            >
                                {item.name}
                            </button>
                        );
                    })}

                    {/* Styled Glowing Button */}
                    <button
                        onClick={handleBookingClick}
                        className="ml-2 px-5 py-2 text-xs uppercase font-bold tracking-[3px] text-white bg-[#f70776] rounded-[16px] transition-all duration-300 shadow-[0_0_15px_rgba(247,7,118,0.5)] hover:shadow-[0_0_25px_rgba(247,7,118,0.9)] hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        Booking
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-neutral-300 hover:text-[#f70776] focus:outline-none cursor-pointer"
                        aria-label="Toggle Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-neutral-800 space-y-3">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className="w-full text-left block px-4 py-2 text-sm uppercase tracking-wider text-neutral-300 hover:text-[#f70776] hover:bg-[#1C1717] rounded-lg transition-colors cursor-pointer"
                        >
                            {item.name}
                        </button>
                    ))}
                    <button
                        onClick={handleBookingClick}
                        className="w-full text-center mt-2 px-5 py-2.5 text-xs uppercase font-bold tracking-[3px] text-white bg-[#f70776] rounded-[7px] transition-all duration-300 shadow-[0_0_15px_rgba(247,7,118,0.5)] cursor-pointer"
                    >
                        Booking
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;