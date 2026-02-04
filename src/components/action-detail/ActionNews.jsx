import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Newspaper, Clock, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from './animations';

const ActionNews = ({ latestNews }) => {
    return (
        <section id="news-section" className="py-12 md:py-20 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-xs mb-4">
                        <Newspaper size={14} />
                        Actualités
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                        Dernières <span className="text-primary">Nouvelles</span>
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
                        Restez informé des dernières actualités et événements de notre fondation
                    </p>
                </motion.div>

                {latestNews.length > 0 ? (
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    >
                        {latestNews.map((newsItem) => (
                            <motion.article
                                key={newsItem.id}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="group"
                            >
                                <Link to={`/actualites/${newsItem.slug}`}>
                                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-primary/30 transition-all h-full flex flex-col">
                                        {/* Image */}
                                        <div className="relative h-64 overflow-hidden bg-slate-900">
                                            {newsItem.image_url ? (
                                                <img
                                                    src={newsItem.image_url}
                                                    alt={newsItem.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : newsItem.video_url ? (
                                                <video
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                >
                                                    <source src={newsItem.video_url} type="video/mp4" />
                                                    <source src={newsItem.video_url} type="video/webm" />
                                                </video>
                                            ) : (
                                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                                    <Newspaper className="text-slate-200" size={48} />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                            {/* Date Badge */}
                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg flex flex-col items-center">
                                                <span className="text-2xl font-black text-gray-900 leading-none">
                                                    {new Date(newsItem.created_at).getDate()}
                                                </span>
                                                <span className="text-xs font-bold text-gray-500 uppercase">
                                                    {new Date(newsItem.created_at).toLocaleString('fr-FR', { month: 'short' })}
                                                </span>
                                            </div>

                                            {/* Category */}
                                            {newsItem.category && (
                                                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
                                                    {newsItem.category}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 overflow-hidden min-h-[3.5rem]">
                                                {newsItem.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 overflow-hidden flex-grow">
                                                {newsItem.summary}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <Clock size={14} />
                                                    <span>3 min</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                                                    Lire plus
                                                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-3xl">
                        <Newspaper size={64} className="text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">Aucune actualité disponible pour le moment</p>
                    </div>
                )}

                {/* View All News Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        to="/actualites"
                        className="inline-flex items-center gap-3 bg-white border-2 border-gray-200 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:border-primary hover:text-primary hover:shadow-lg transition-all"
                    >
                        Voir toutes les actualités
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ActionNews;
