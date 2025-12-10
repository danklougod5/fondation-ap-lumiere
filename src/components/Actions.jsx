import React from 'react';
import { GraduationCap, HeartPulse, ShieldAlert, Hammer } from 'lucide-react';
import DonApf from '../assets/DonApf.jpg';
import SanteApf from '../assets/SanteApf.jpg';
import FormationApf from '../assets/FormationApf.jpg';

const Actions = () => {
    const actions = [
        {
            id: 1,
            title: "De la rue à la réussite",
            icon: <GraduationCap size={32} className="text-white" />,
            image: FormationApf,
            desc: "Formation professionnelle, permis de conduire, et insertion garantie pour sortir durablement les jeunes de la précarité."
        },
        {
            id: 2,
            title: "Santé",
            icon: <HeartPulse size={32} className="text-white" />,
            image: SanteApf,
            desc: "Accès aux soins pour tous : construction de dispensaires (projet pilote à Man) et campagnes de santé."
        },
        {
            id: 3,
            title: "Aide d'Urgence",
            icon: <ShieldAlert size={32} className="text-white" />,
            image: DonApf,
            desc: "Réponse immédiate aux situations critiques via la communauté des Missionnaires. Transparence totale sur chaque action."
        },
        {
            id: 4,
            title: "Infrastructures",
            icon: <Hammer size={32} className="text-white" />,
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop",
            desc: "Construction de forages et rénovation d'habitats pour améliorer les conditions de vie fondamentales."
        }
    ];

    return (
        <section id="actions" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-dark mb-4">
                        Nos Domaines d'Action
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Nous intervenons là où les besoins sont les plus urgents, avec une approche globale pour un impact durable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {actions.map((action, index) => (
                        <div
                            key={action.id}
                            className="group relative overflow-hidden rounded-xl shadow-lg h-96 cursor-pointer"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Background Image */}
                            <img
                                src={action.image}
                                alt={action.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
                                <div className="bg-accent/90 w-12 h-12 rounded-full flex items-center justify-center mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    {action.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{action.title}</h3>

                                <p className="text-gray-200 text-sm transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    {action.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Actions;
