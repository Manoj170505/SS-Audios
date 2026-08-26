import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { name: 'Experience', target: 'experience', type: 'scroll' },
        { name: 'Services', target: 'services', type: 'scroll' },
        { name: 'Gallery', target: '/gallery', type: 'route' },
        { name: 'Contact Us', target: 'contacts', type: 'scroll' },
    ];


    const handleNavClick = (link) => {
        if (link.type === 'route') {
            navigate(link.target);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const el = document.getElementById(link.target);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }, 100);
            } else {
                const el = document.getElementById(link.target);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                } else if (link.target === 'experience') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }
    };

    const handleBrandClick = () => {
        if (location.pathname !== '/') {
            navigate('/');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#141010] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-[#2B2323] font-sans relative overflow-hidden">

            {/* Background Neon Glow Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#f70776]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-6 relative z-10">

                {/* Main Centered Card Container */}
                <div className="bg-[#1C1717] border border-[#2B2323] rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-8 shadow-2xl">

                    {/* Logo & Brand Name */}
                    <div
                        onClick={handleBrandClick}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <img
                            src="/SS.svg"
                            alt="SS Audios"
                            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_18px_rgba(247,7,118,0.7)]"
                        />
                        <span className="font-black text-2xl sm:text-3xl tracking-wider uppercase text-white group-hover:text-[#f70776] transition-colors">
                            AUDIOS
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link)}
                                className="text-xs uppercase tracking-widest font-semibold text-[#A69B9B] hover:text-[#f70776] transition-colors cursor-pointer"
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>


                </div>

                {/* Bottom Strip: Copyright & Legal */}
                <div className="bg-[#1C1717] border border-[#2B2323] rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A69B9B]">
                    <p>© {new Date().getFullYear()} SS AUDIOS. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="text-neutral-500 hover:text-white transition-colors cursor-pointer">
                            Privacy Policy
                        </span>
                        <span className="text-neutral-500 hover:text-white transition-colors cursor-pointer">
                            Terms of Service
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
}