import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-primary-dark text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-white/10 pb-8">
                    <div className="col-span-1 md:col-span-2">
                        <img
                            src={logo}
                            alt="FONDATION AP LUMIÈRE D'AFRIQUE"
                            className="h-24 w-auto object-contain mb-4"
                        />
                        <p className="text-gray-300 max-w-sm">
                            "Là où brille la lumière, renaît l'espérance. Chaque geste compte, chaque vie compte." </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Liens Rapides</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><Link to="/" className="hover:text-accent transition-colors">Accueil</Link></li>
                            <li><a href="#about" className="hover:text-accent transition-colors">À Propos</a></li>
                            <li><a href="#actions" className="hover:text-accent transition-colors">Nos Actions</a></li>
                            <li><a href="#projects" className="hover:text-accent transition-colors">Projets</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Légal</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-accent transition-colors">Mentions Légales</a></li>
                            <li><Link to="/privacy" className="hover:text-accent transition-colors">Confidentialité</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-gray-400 text-sm flex flex-col md:flex-row items-center justify-center gap-2">
                    <span>© 2025 Fondation AP Lumière d'Afrique. Tous droits réservés.</span>
                    <span className="hidden md:inline">•</span>
                    <span className="flex items-center gap-1">
                        Fait avec <Heart size={14} className="text-accent fill-accent" /> pour la jeunesse
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
