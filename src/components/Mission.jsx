import React from 'react';
import { Target, Users, BookOpen, HeartHandshake } from 'lucide-react';

const Mission = () => {
    const objectives = [
        {
            icon: <Users size={40} className="text-accent" />,
            title: "Soutenir la Jeunesse",
            desc: "Accompagner les jeunes en difficulté vers l'autonomie et l'emploi."
        },
        {
            icon: <HeartHandshake size={40} className="text-accent" />,
            title: "Aider les Familles",
            desc: "Apporter un réconfort matériel et moral aux familles vulnérables."
        },
        {
            icon: <BookOpen size={40} className="text-accent" />,
            title: "Éducation & Formation",
            desc: "Scolariser les enfants et former les jeunes aux métiers d'avenir."
        },
        {
            icon: <Target size={40} className="text-accent" />,
            title: "Vision 2030",
            desc: "Travailler sans relâche pour l'objectif zéro enfant dans la rue."
        }
    ];

    return (
        <section id="mission" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-dark mb-4">
                        Notre Mission
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Nous ne faisons pas que donner, nous construisons l'avenir. Notre approche repose sur quatre piliers fondamentaux.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {objectives.map((obj, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-b-4 border-transparent hover:border-accent group"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="mb-6 p-4 bg-accent/10 rounded-full inline-block group-hover:bg-accent/20 transition-colors">
                                {obj.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">{obj.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {obj.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Mission;
