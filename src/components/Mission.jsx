import React from 'react';
import { Target, Users, BookOpen, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Mission = () => {
    const objectives = [
        {
            icon: Users,
            title: "Zéro Enfant dans la Rue",
            desc: "Notre engagement prioritaire : sortir les enfants de la rue d'ici 2030 et leur offrir un avenir digne.",
            color: "bg-blue-500"
        },
        {
            icon: HeartHandshake,
            title: "Santé & Maternité",
            desc: "Construction de maternités et de centres de santé pour accompagner les mères et réduire la mortalité infantile.",
            color: "bg-rose-500"
        },
        {
            icon: BookOpen,
            title: "Éducation & Infrastructures",
            desc: "Bâtir des écoles et des infrastructures hydrauliques (forages) pour les zones rurales défavorisées.",
            color: "bg-emerald-500"
        },
        {
            icon: Target,
            title: "Solidarité Active",
            desc: "Mobiliser nos donateurs pour apporter une aide financière directe aux familles précaires.",
            color: "bg-amber-500"
        }
    ];

    return (
        <section id="mission" className="section-padding bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-accent/20">
                            <Sparkles size={14} />
                            Nos Piliers
                        </div>
                        <h2 className="mb-6">
                            Une Vision <span className="text-primary italic">Audacieuse</span> pour l'Afrique
                        </h2>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed">
                            Nous ne faisons pas que donner, nous construisons l'avenir. Notre approche repose sur quatre piliers stratégiques pour un changement durable.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {objectives.map((obj, index) => (
                        <motion.div
                            key={obj.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-premium p-10 group flex flex-col h-full"
                        >
                            <div className="mb-8 relative">
                                <div className={`absolute inset-0 ${obj.color} opacity-20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
                                <div className="relative w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-800 group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-slate-100 group-hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/20">
                                    <obj.icon size={28} />
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                                {obj.title}
                            </h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
                                {obj.desc}
                            </p>

                            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">Objectif 2030</span>
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Mission;
