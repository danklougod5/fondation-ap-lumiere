import React from 'react';
import Apoutchou from '../assets/Apoutchou.jpg';
import FondationAp from '../assets/fondationAp.jpg';


const About = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image */}
                    <div className="w-full md:w-1/2" data-aos="fade-right">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-accent/20 rounded-2xl transform rotate-3"></div>
                            <img
                                src={FondationAp}
                                alt="Enfants africains étudiant"
                                className="relative rounded-2xl shadow-xl w-full h-[400px] object-cover"
                            />
                            {/* Founder Image Overlay (Placeholder) */}
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white p-2 rounded-xl shadow-lg hidden md:block">
                                <img
                                    src={Apoutchou}
                                    alt="Fondateur"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2" data-aos="fade-left">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-dark mb-6">
                            Notre Histoire
                        </h2>
                        <div className="space-y-6 text-gray-600">
                            <p>
                                La Fondation AP Lumière d'Afrique est née de la vision de <strong>Apoutchou National (Stéphane Agbré)</strong>,
                                officiellement inaugurée le 3 décembre 2025 à Abidjan.
                            </p>
                            <p>
                                Touché par les défis auxquels fait face la jeunesse africaine, le fondateur a souhaité créer une structure
                                capable d'apporter une aide concrète et durable. Notre mission est d'éclairer l'avenir des plus vulnérables.
                            </p>

                            <blockquote className="border-l-4 border-accent pl-4 italic text-lg text-gray-800 my-6">
                                "Là où brille la lumière, renaît l'espérance. Chaque geste compte, chaque vie compte."
                            </blockquote>
                            <div className="flex gap-4">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-accent">2025</span>
                                    <span className="text-sm text-gray-500">Année de création</span>
                                </div>
                                <div className="w-px bg-gray-300"></div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-accent">Abidjan</span>
                                    <span className="text-sm text-gray-500">Siège social</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
