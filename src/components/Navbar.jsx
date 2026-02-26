import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, ChevronDown, User, Globe, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'À Propos', path: '/apropos' },
        { name: 'Nos Actions', path: '/actions' },
        { name: 'Actualités', path: '/actualites' },
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    const isHomePage = location.pathname === '/';
    const isDetailPage = location.pathname.startsWith('/actions/') ||
        location.pathname.startsWith('/actualites/') ||
        location.pathname.startsWith('/projets/');
    const isFounderPage = location.pathname === '/fondateur';

    const isWhiteTextPage = (isHomePage || isDetailPage || isFounderPage) && !scrolled && !isOpen;

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled
                ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-4'
                : isOpen ? 'bg-white py-4' : 'bg-transparent py-8'
                }`}
        >
            <div className="container-custom flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="relative z-[110] group">
                    <div className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="Logo"
                            className={`h-12 md:h-14 w-auto transition-transform duration-500 group-hover:scale-105 ${isWhiteTextPage ? 'brightness-0 invert' : ''
                                }`}
                        />
                        <div className={`hidden lg:block border-l pl-3 py-1 transition-colors duration-500 ${isWhiteTextPage ? 'border-white/20' : 'border-slate-200'
                            }`}>
                            <h1 className={`text-base font-black leading-none tracking-tight transition-colors duration-500 ${isWhiteTextPage ? 'text-white' : 'text-slate-900'
                                }`}>
                                LUMIÈRE D'AFRIQUE
                            </h1>
                            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 transition-colors duration-500 ${isWhiteTextPage ? 'text-white/60' : 'text-slate-400'
                                }`}>
                                Fondation Humanitaire
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-2">
                    <div className={`flex items-center px-2 py-1.5 rounded-2xl transition-all duration-500 ${scrolled ? 'bg-slate-50/50' : 'bg-white/5'
                        }`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group overflow-hidden ${isWhiteTextPage
                                    ? (isActive(link.path) ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5')
                                    : (isActive(link.path) ? 'text-primary bg-primary/5' : 'text-slate-500 hover:text-primary hover:bg-primary/5')
                                    }`}
                            >
                                <span className="relative z-10">{link.name}</span>
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isWhiteTextPage ? 'bg-accent' : 'bg-primary'
                                            }`}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="w-px h-6 bg-slate-200 mx-4 hidden lg:block" />

                    <a
                        href="https://moya-pay.com/p/pl_203zikdg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hidden lg:flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 group ${isWhiteTextPage
                            ? 'bg-white text-primary hover:bg-accent hover:text-white'
                            : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'
                            }`}
                    >
                        <Heart size={16} className="group-hover:scale-110 transition-transform" fill="currentColor" />
                        Faire un don
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={`md:hidden p-3 rounded-2xl transition-all duration-300 ${isWhiteTextPage ? 'bg-white/10 text-white' : 'bg-primary/5 text-primary'
                        }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-white z-[90] md:hidden pt-32 pb-10 px-6 flex flex-col"
                    >
                        <div className="flex-1 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`block text-3xl font-black font-heading transition-colors ${isActive(link.path) ? 'text-primary' : 'text-slate-900'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-8 space-y-4">
                                <a
                                    href="https://moya-pay.com/p/pl_203zikdg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full bg-primary text-white font-black py-5 rounded-[2rem] text-lg shadow-2xl shadow-primary/30"
                                >
                                    <Heart size={24} fill="currentColor" />
                                    Faire un don
                                </a>
                            </div>
                        </div>

                        <div className="mt-auto pt-10 border-t border-slate-100 text-center">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                                Fondation AP Lumière d'Afrique
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
