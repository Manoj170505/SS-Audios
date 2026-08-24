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

    const socialLinks = [
        { name: 'Facebook', icon: 'FB', href: '#' },
        { name: 'Instagram', icon: 'IG', href: '#' },
        { name: 'X / Twitter', icon: 'X', href: '#' },
        { name: 'YouTube', icon: 'YT', href: '#' },
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
                        <div className="w-9 h-9 rounded-full bg-[#f70776] flex items-center justify-between px-2 py-2.5 transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(247,7,118,0.5)]">
                            <span className="w-1.5 h-1.5 bg-[#141010] rounded-full" />
                            <span className="w-1.5 h-1.5 bg-[#141010] rounded-full" />
                        </div>
                        <span className="font-black text-2xl tracking-wider uppercase text-white group-hover:text-[#f70776] transition-colors">
                            SS AUDIOS
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

                    {/* Social Icons */}
                    <div className="flex items-center justify-center gap-4 pt-2">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                aria-label={social.name}
                                className="w-10 h-10 rounded-full bg-[#141010] border border-[#2B2323] hover:border-[#f70776] text-[#A69B9B] hover:text-white flex items-center justify-center text-xs font-bold transition-all duration-300 hover:shadow-[0_0_15px_rgba(247,7,118,0.4)] hover:-translate-y-0.5"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

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