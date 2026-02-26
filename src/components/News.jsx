import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { cachedFetch } from '../lib/cache';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Sparkles, User, ArrowUpRight, Play, Newspaper } from 'lucide-react';
import { OptimizedImage, OptimizedVideo } from './OptimizedMedia';

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const data = await cachedFetch('news_homepage', async () => {
                const { data, error } = await supabase
                    .from('news')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(3);
                if (error) throw error;
                return data || [];
            });

            setNewsItems(data);
        } catch (error) {
            console.error('Error fetching news:', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null;
    if (newsItems.length === 0) return null;

    return (
        <section id="news" className="section-padding bg-slate-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-bl from-primary/5 via-accent/5 to-transparent rounded-full blur-[80px] md:blur-[120px] -mr-32 md:-mr-64 -mt-32 md:-mt-64 opacity-60"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest mb-4 md:mb-6 border border-primary/20">
                            <Sparkles size={12} className="md:w-3.5 md:h-3.5" />
                            Actualités
                        </div>
                        <h2 className="mb-0">
                            Dernières <span className="text-primary italic">Nouvelles</span> du terrain
                        </h2>
                    </motion.div>

                    <Link to="/actualites" className="btn-outline group shrink-0 w-full md:w-auto justify-center md:justify-start">
                        <span className="hidden sm:inline">Voir toutes les actualités</span>
                        <span className="sm:hidden">Toutes les actualités</span>
                        <ArrowRight size={16} className="md:w-4.5 md:h-4.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {newsItems.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group"
                        >
                            <Link
                                to={`/actualites/${item.slug}`}
                                className="block h-full bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 active:scale-[0.98]"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-slate-100">
                                    {item.image_url ? (
                                        <OptimizedImage
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                                        />
                                    ) : item.video_url ? (
                                        <OptimizedVideo
                                            src={item.video_url}
                                            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                            <Newspaper className="text-slate-200" size={48} />
                                        </div>
                                    )}
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 md:top-6 left-4 md:left-6">
                                        <div className="px-3 md:px-4 py-1.5 md:py-2 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-100 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                            <span className="text-primary group-hover:text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none transition-colors">
                                                {item.category || 'Événement'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Arrow Icon / Video Icon - Desktop hover, always visible on mobile */}
                                    <div className="absolute top-4 md:top-6 right-4 md:right-6 flex gap-2">
                                        {item.video_url && (
                                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-600 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg animate-pulse">
                                                <Play size={16} fill="currentColor" className="md:w-4.5 md:h-4.5" />
                                            </div>
                                        )}
                                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center lg:opacity-0 lg:group-hover:opacity-100 lg:transform lg:translate-x-2 lg:group-hover:translate-x-0 transition-all duration-300">
                                            <ArrowUpRight size={16} className="md:w-4.5 md:h-4.5 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 sm:p-8 md:p-10 flex flex-col">
                                    {/* Meta Info */}
                                    <div className="flex items-center gap-3 md:gap-4 text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6 pb-4 md:pb-6 border-b border-slate-100">
                                        <div className="flex items-center gap-1.5 md:gap-2">
                                            <Calendar size={11} className="md:w-3 md:h-3 text-accent" />
                                            <span>{new Date(item.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>

                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-primary transition-colors leading-tight line-clamp-2 overflow-hidden min-h-[3rem] md:min-h-[3.5rem]">
                                        {item.title}
                                    </h3>

                                    {/* Summary */}
                                    <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed line-clamp-3 overflow-hidden mb-6 md:mb-8 flex-grow">
                                        {item.summary}
                                    </p>

                                    {/* Read More Link */}
                                    <div className="inline-flex items-center gap-2 md:gap-3 text-primary font-black uppercase text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em]">
                                        Lire l'article
                                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                                            <ArrowRight size={12} className="md:w-3.5 md:h-3.5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
