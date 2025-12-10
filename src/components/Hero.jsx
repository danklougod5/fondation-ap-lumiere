import React from 'react';
import { ChevronDown } from 'lucide-react';
import imageFonAp from '../assets/imageFonAp.jpg';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={imageFonAp}
                    alt="Enfants africains souriants"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6" data-aos="fade-up">
                    Lumière d'Afrique <br />
                    <span className="text-accent">Espoir pour la Jeunesse</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200" data-aos="fade-up" data-aos-delay="100">
                    "Là où brille la lumière, renaît l'espérance. Chaque geste compte, chaque vie compte."</p>
                <div className="flex flex-col md:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
                    <a href="#donate" className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-bold text-lg transition-transform hover:scale-105">
                        Faire un don
                    </a>
                    <a href="#about" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-3 rounded-full font-bold text-lg transition-all">
                        Découvrir notre mission
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
                <ChevronDown size={32} />
            </div>
        </section>
    );
};

export default Hero;
