import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Rocket, MapPin, Target, CheckCircle2, Calendar, Quote, ArrowRight } from 'lucide-react';
import { staggerContainer, scaleIn } from './animations';

const ActionAbout = ({ action }) => {
    return (
        <section id="about-section" className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 xl:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100 mb-8 md:mb-10 relative overflow-hidden"
                        >
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl" />

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6 md:mb-8">
                                    <div className="w-1 h-8 md:w-1.5 md:h-12 bg-gradient-to-b from-accent to-emerald-400 rounded-full shrink-0" />
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900 leading-tight break-all sm:break-normal">
                                        À propos de cette initiative
                                    </h2>
                                </div>

                                <div className="prose prose-lg prose-slate max-w-none break-all sm:break-words overflow-hidden">
                                    {action.description ? (
                                        <div
                                            className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 md:mb-6 rich-content"
                                            dangerouslySetInnerHTML={{ __html: action.description }}
                                        />
                                    ) : (
                                        <p className="text-gray-400 italic text-lg">
                                            Aucune description détaillée n'est encore disponible pour ce domaine.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Impact Stats */}
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10"
                        >
                            {[
                                { number: action.impact_vies || "0+", label: "Vies impactées", icon: Users, color: "from-accent to-emerald-400" },
                                { number: action.impact_projets || "0", label: "Projets réalisés", icon: Rocket, color: "from-primary to-blue-400" },
                                { number: action.impact_regions || "0", label: "Régions couvertes", icon: MapPin, color: "from-purple-500 to-pink-400" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={scaleIn}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 group cursor-default flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0"
                                >
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center sm:mb-4 group-hover:scale-110 transition-transform shadow-lg shrink-0`}>
                                        <stat.icon size={20} className="text-white sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <div className="text-2xl sm:text-4xl font-heading font-bold text-gray-900 mb-0.5 sm:mb-1">
                                            {stat.number}
                                        </div>
                                        <div className="text-gray-500 font-medium text-xs sm:text-base">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Upcoming Projects */}
                        {action.upcoming_projects && action.upcoming_projects.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-gradient-to-br from-primary to-blue-400 p-3 rounded-xl shadow-lg shadow-primary/20">
                                        <Rocket size={28} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">
                                        Projets à Venir
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {action.upcoming_projects.map((project, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ x: 10 }}
                                            className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-gradient-to-r from-slate-50 to-transparent rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer"
                                        >
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-accent to-emerald-400 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform shrink-0">
                                                <Target size={16} className="text-white md:w-[18px] md:h-[18px]" />
                                            </div>
                                            <span className="text-base md:text-lg text-gray-700 font-semibold flex-1 leading-tight">{project}</span>
                                            <ArrowRight size={16} className="text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="lg:col-span-5 xl:col-span-4 space-y-8">
                        {/* Objectives Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-36"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-br from-primary to-blue-400 p-3 rounded-xl shadow-lg shadow-primary/20">
                                    <Target size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-gray-900">Nos Objectifs</h3>
                            </div>

                            {action.objectives && action.objectives.length > 0 ? (
                                <ul className="space-y-4 mb-8">
                                    {action.objectives.map((objective, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex gap-3 group"
                                        >
                                            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-accent rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                                <CheckCircle2 size={14} className="text-white" />
                                            </div>
                                            <span className="text-gray-600 font-medium leading-relaxed">{objective}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400 italic mb-8">Les objectifs seront bientôt disponibles.</p>
                            )}
                            <a
                                href="https://moya-pay.com/p/pl_203zikdg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-gradient-to-r from-accent to-emerald-400 hover:from-emerald-400 hover:to-accent text-white text-center font-bold py-4 rounded-2xl transition-all shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1"
                            >
                                Soutenir ce projet
                            </a>
                        </motion.div>

                        {/* Quick Info Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-primary-dark to-slate-900 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />

                            <h4 className="font-heading font-bold text-lg mb-6 flex items-center gap-2 text-white">
                                <Calendar size={18} className="text-accent" />
                                Informations
                            </h4>

                            <div className="space-y-4">
                                <div className="flex justify-between py-3 border-b border-white/10">
                                    <span className="text-white/60">Statut</span>
                                    <span className="font-semibold text-accent">{action.info_status || 'Actif'}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-white/10">
                                    <span className="text-white/60">Région</span>
                                    <span className="font-semibold">{action.info_location || 'Cameroun'}</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-white/60">Depuis</span>
                                    <span className="font-semibold">{action.info_since || '2020'}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Testimonial Card */}
                        {action.testimonials && action.testimonials[0] && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-gradient-to-br from-accent to-emerald-500 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden shadow-2xl shadow-accent/30"
                            >
                                <Quote className="absolute top-4 right-4 text-white/20" size={60} />

                                <p className="relative z-10 text-lg italic text-white/90 mb-6 leading-relaxed">
                                    "{action.testimonials[0].quote}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-bold text-xl border border-white/30">
                                        {action.testimonials[0].name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">{action.testimonials[0].name}</div>
                                        <div className="text-sm text-white/70">{action.testimonials[0].role}</div>
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
