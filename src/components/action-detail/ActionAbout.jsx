import React from 'react';
import { motion } from 'framer-motion';
import { Users, Rocket, MapPin, Target, CheckCircle2, Calendar, ArrowRight, Activity, Quote } from 'lucide-react';
import { staggerContainer, scaleIn } from './animations';

const ActionAbout = ({ action }) => {
    return (
        <section id="about-section" className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Core Description & Impact */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >


                            <h2 className="font-heading font-black text-slate-900 mb-10 leading-[1.1]">
                                <span className="block text-xs md:text-sm uppercase tracking-[0.4em] text-slate-400 mb-4 font-bold">À propos de l'action</span>
                                <span className="text-3xl md:text-5xl lg:text-6xl gradient-text leading-tight block">
                                    {action.title}
                                </span>
                            </h2>

                            <div className="h-px w-20 bg-primary/20 mb-12" />

                            <div className="relative">
                                {/* Decorative quote mark for a more editorial feel */}
                                <Quote className="absolute -top-10 -left-10 text-slate-50 w-24 h-24 -z-10 opacity-60" />

                                <div className="prose-xl md:prose-2xl prose-slate max-w-none mb-12">
                                    {action.description ? (
                                        <div
                                            className="text-slate-600 leading-[1.8] font-medium rich-content"
                                            dangerouslySetInnerHTML={{ __html: action.description }}
                                        />
                                    ) : (
                                        <p className="text-slate-400 italic">
                                            Aucune description détaillée n'est encore disponible.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Integrated Stats Bar */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                                {[
                                    { number: action.impact_vies || "20+", label: "Vies impactées", icon: Users, color: "text-accent" },
                                    { number: action.impact_projets || "Divers", label: "Projets réalisés", icon: Rocket, color: "text-primary" },
                                    { number: action.impact_regions || "Locale", label: "Zone couverte", icon: MapPin, color: "text-purple-500" }
                                ].map((stat) => (
                                    <div key={stat.label} className="flex items-start gap-4 group">
                                        <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform`}>
                                            <stat.icon size={24} />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black text-slate-900 leading-none mb-1">{stat.number}</div>
                                            <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Upcoming Projects - Rethought as a sleek grid */}
                        {action.upcoming_projects && action.upcoming_projects.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-heading font-black text-slate-900">
                                        Projets en cour
                                    </h3>
                                    <div className="h-px bg-slate-100 flex-1 mx-6 hidden sm:block" />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {action.upcoming_projects.map((project) => (
                                        <div
                                            key={project}
                                            className="group relative p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-accent/20 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                                        <Target size={20} />
                                                    </div>
                                                    <span className="font-bold text-slate-900 leading-tight">{project}</span>
                                                </div>
                                                <ArrowRight size={16} className="text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Objectives List - Integrated and lighter design */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm"
                        >
                            <h3 className="text-xl font-heading font-black mb-6 flex items-center gap-3 text-slate-900">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                                    <CheckCircle2 size={18} />
                                </div>
                                Objectifs
                            </h3>

                            <ul className="space-y-4">
                                {(action.objectives || []).map((objective) => (
                                    <li key={objective} className="flex gap-3 items-start">
                                        <div className="mt-1 w-5 h-5 flex items-center justify-center shrink-0 text-emerald-500">
                                            <CheckCircle2 size={16} strokeWidth={3} />
                                        </div>
                                        <span className="text-slate-600 font-medium leading-relaxed text-sm">{objective}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Summary Info & CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100"
                        >
                            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Calendar size={18} className="text-primary" />
                                Fiche Technique
                            </h4>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center py-2 border-b border-slate-200/50">
                                    <span className="text-slate-500 font-medium">Statut</span>
                                    <span className="font-bold text-accent">{action.info_status || 'Actif'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-200/50">
                                    <span className="text-slate-500 font-medium">Région</span>
                                    <span className="font-bold text-slate-900">{action.info_location || 'Cote d\'Ivoire'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-slate-500 font-medium">Lancement</span>
                                    <span className="font-bold text-slate-900">{action.info_since || '2024'}</span>
                                </div>
                            </div>

                            <a
                                href="https://moya-pay.com/p/pl_203zikdg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-accent w-full py-5 text-sm"
                            >
                                Soutenir ce projet
                            </a>
                        </motion.div>

                        {/* Simplified Testimonial if exists */}
                        {action.testimonials && action.testimonials[0] && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-[2rem] bg-accent/5 border border-accent/10 italic text-slate-700 relative"
                            >
                                <div className="text-5xl font-serif text-accent/20 absolute -top-2 left-4">"</div>
                                <p className="relative z-10 text-lg mb-4 leading-relaxed">
                                    {action.testimonials[0].quote}
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                                        {action.testimonials[0].name.charAt(0)}
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-bold text-slate-900">{action.testimonials[0].name}</div>
                                        <div className="text-slate-500">{action.testimonials[0].role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ActionAbout;
