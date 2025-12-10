import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Accueil', href: '#home' },
        { name: 'À Propos', href: '#about' },
        { name: 'Notre Mission', href: '#mission' },
        { name: 'Nos Actions', href: '#actions' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="block">
                    <img
                        src={logo}
                        alt="FONDATION AP LUMIÈRE D'AFRIQUE"
                        className="h-16 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'}`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#donate"
                        className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition-transform hover:scale-105"
                    >
                        <Heart size={18} fill="currentColor" />
                        Faire un don
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-accent"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} color={scrolled ? '#0066CC' : 'white'} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg py-4 px-4 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-700 font-medium hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#donate"
                        className="bg-accent text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2"
                        onClick={() => setIsOpen(false)}
                    >
                        <Heart size={18} fill="currentColor" />
                        Faire un don
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
