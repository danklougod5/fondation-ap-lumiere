import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { staggerContainer, fadeInUp } from './animations';
import { iconComponents } from './utils';

const ActionDiscovery = ({ otherActions }) => {
    return (
        <section id="discover-section" className="py-12 md:py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full font-bold text-xs mb-4">
                        <Sparkles size={14} />
                        Explorer
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                        Découvrez d'autres <span className="text-accent">domaines</span>
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
                        Explorez nos autres initiatives et voyez comment nous transformons des vies chaque jour
                    </p>
                </motion.div>

                {otherActions.length > 0 ? (
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    >
                        {otherActions.map((otherAction) => {
                            const OtherIcon = iconComponents[otherAction.icon] || Heart;
                            return (
                                <motion.div
                                    key={otherAction.id}
                                    variants={fadeInUp}
                                    whileHover={{ y: -10 }}
                                    className="group"
                                >
                                    <Link to={`/actions/${otherAction.slug}`}>
                                        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-accent/30 transition-all">
                                            <div className="relative h-64 overflow-hidden bg-slate-100">
                                                {otherAction.image_url ? (
                                                    <img
                                                        src={otherAction.image_url}
                                                        alt={otherAction.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                ) : otherAction.video_url ? (
                                                    <video
                                                        autoPlay
                                                        muted
                                                        loop
                                                        playsInline
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                                                    >
                                                        <source src={otherAction.video_url} type="video/mp4" />
                                                        <source src={otherAction.video_url} type="video/webm" />
                                                    </video>
                                                ) : null}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                <div className="absolute bottom-4 left-4">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                                                        <OtherIcon size={24} className="text-white" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                                                    {otherAction.title}
                                                </h3>
                                                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                                    {otherAction.short_desc}
                                                </p>
                                                <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                                                    En savoir plus
                                                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <div className="text-center py-16 bg-slate-50 rounded-3xl">
                        <Sparkles size={64} className="text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">Aucun autre domaine disponible</p>
                    </div>
                )}

                {/* Back to All Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        to="/#actions"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
                    >
                        <ArrowLeft size={20} />
                        Voir tous les domaines d'action
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ActionDiscovery;
