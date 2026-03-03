import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Globe, Sparkles, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="relative bg-slate-900 text-white pt-24 pb-12 overflow-hidden">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    {/* Brand Info */}
                    <div className="lg:col-span-5 space-y-8">
                        <Link to="/" className="inline-block group">
                            <div className="flex items-center gap-4">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105 brightness-0 invert"
                                />
                                <div className="border-l border-white/20 pl-4 py-1">
                                    <h2 className="text-xl md:text-2xl font-black font-heading leading-none tracking-tight text-white">
                                        LUMIÈRE D'AFRIQUE
                                    </h2>
                                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mt-2 text-white/50">
                                        Fondation Humanitaire
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <p className="text-white/60 text-lg leading-relaxed max-w-md font-medium italic">
                            "Là où brille la lumière, renaît l'espérance. Chaque geste compte, chaque vie compte pour bâtir un avenir meilleur."
                        </p>

                        <div className="flex items-center gap-4">
                            {[
                                { icon: Facebook, href: "https://www.facebook.com/p/Fondation-AP-100068524751516/" },
                                { icon: Music, href: "https://www.tiktok.com/@apoutchou_national1" },
                                { icon: Instagram, href: "https://www.instagram.com/apoutchou_national_24/" },
                            ].map((social, idx) => (
                                <a
                                    key={social.href}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all transform hover:-translate-y-1"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12">
                        {/* Navigation */}
                        <div>
                            <h4 className="text-lg font-black font-heading mb-8 flex items-center gap-2 text-white">
                                <Sparkles size={18} className="text-accent" />
                                Navigation
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Accueil', path: '/' },
                                    { name: 'À Propos', path: '/apropos' },
                                    { name: 'Nos Actions', path: '/actions' },
                                    { name: 'Actualités', path: '/actualites' },
                                    { name: 'Faire un don', path: 'https://moya-pay.com/p/pl_203zikdg', isExternal: true }
                                ].map((link) => (
                                    <li key={link.name}>
                                        {link.isExternal ? (
                                            <a
                                                href={link.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/50 hover:text-accent font-bold transition-colors flex items-center gap-2 group"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
                                                {link.name}
                                            </a>
                                        ) : (
                                            <Link to={link.path} className="text-white/50 hover:text-accent font-bold transition-colors flex items-center gap-2 group">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="sm:col-span-2">
                            <h4 className="text-lg font-black font-heading mb-8 flex items-center gap-2 text-white">
                                <Globe size={18} className="text-accent" />
                                Nous Trouver
                            </h4>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-accent">
                                        <MapPin size={20} />
                                    </div>
                                    <p className="text-white/60 font-medium">Angré Caféier 3, Abidjan, Côte d'Ivoire</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-accent">
                                        <Mail size={20} />
                                    </div>
                                    <p className="text-white/60 font-medium">contact@fondation-ap.org</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-accent">
                                        <Phone size={20} />
                                    </div>
                                    <p className="text-white/60 font-medium">07 08 31 70 38</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-y-8 gap-x-12">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] order-2 lg:order-1 text-center lg:text-left leading-relaxed">
                        &copy; 2026 Fondation AP Lumière d'Afrique — Tous droits réservés
                    </p>

                    <div className="flex items-center gap-8 order-1 lg:order-2">
                        <Link to="/privacy" className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
                            Confidentialité
                        </Link>
                        <Link to="/legal" className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
                            Mentions Légales
                        </Link>
                    </div>

                    <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] order-3 text-center lg:text-right leading-relaxed max-w-[300px] lg:max-w-none">
                        Créé par <span className="text-white">SDSN</span> (Société de Développement de Solutions Numériques) et <span className="text-white">Moya-Pay</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
