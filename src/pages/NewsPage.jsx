import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import logger from '../lib/logger';
import { cachedFetch } from '../lib/cache';
import { Loader2, Calendar, ArrowRight, Clock, Tag, Search, Newspaper, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const data = await cachedFetch('news_all', async () => {
                const { data, error } = await supabase
                    .from('news')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (error) throw error;
                return data || [];
            });

            setNewsItems(data);
        } catch (error) {
            logger.error('Error fetching news:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredNews = newsItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative text-center z-10 px-6">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-10">
                        {/* Multiple pulsating rings */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 border-2 border-primary/30 rounded-[2.5rem]"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.05, 0.2] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute inset-[-20px] border border-accent/20 rounded-[3rem]"
                        />

                        {/* Central Spinner */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <Loader2 className="animate-spin text-accent w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-t-2 border-primary rounded-full"
                                />
                            </div>
                        </div>

                        {/* Icon in middle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Newspaper className="text-white w-6 h-6 md:w-8 md:h-8 opacity-20" />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-white text-2xl md:text-3xl font-heading font-black tracking-tighter mb-3">
                            Lumière d'Afrique <span className="text-accent underline decoration-accent/30 underline-offset-8">News</span>
                        </h2>
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-primary" />
                            <p className="text-primary/60 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
                                Chargement de l'actualité
                            </p>
                            <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-primary" />
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title="Actualités"
                description="Suivez les dernières nouvelles et actions de la Fondation AP Lumière d'Afrique. Articles, projets et événements en direct du terrain."
                url="/actualites"
            />
            <div className="min-h-screen bg-slate-50 pt-32 pb-24 selection:bg-primary selection:text-white">
                {/* Header */}
                <header className="container mx-auto px-4 mb-24 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-8 shadow-xl shadow-primary/5 border border-slate-100"
                        >
                            <Newspaper size={14} className="text-accent" />
                            Le Journal de la Fondation
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black font-heading text-slate-950 mb-10 tracking-tighter"
                        >
                            Suivez l'impact de nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">actions</span> quotidiennes
                        </motion.h1>

                        {/* Search Bar (Ultra Premium) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative max-w-2xl mx-auto group"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-[40px] opacity-0 group-focus-within:opacity-100 transition-opacity rounded-full"></div>
                            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={24} />
                            <input
                                type="text"
                                placeholder="Rechercher un article, un projet, une action..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white pl-20 pr-8 py-5 md:py-6 rounded-[2.5rem] border-0 outline-none ring-1 ring-slate-100/50 shadow-xl shadow-slate-200/40 focus:ring-4 focus:ring-primary/10 text-lg md:text-xl transition-all relative z-10 font-medium placeholder:text-slate-400"
                                aria-label="Rechercher des articles"
                            />
                        </motion.div>
                    </div>

                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>
                </header>

                {/* News Grid */}
                <main className="container mx-auto px-4">
                    {filteredNews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
                            {filteredNews.map((item, index) => (
                                <motion.article
                                    key={item.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    className="group h-full"
                                >
                                    <Link
                                        to={`/actualites/${item.slug}`}
                                        className="block h-full bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 overflow-hidden border border-slate-100 flex flex-col hover:-translate-y-3"
                                    >
                                        {/* Image Container */}
                                        <div className="relative h-64 md:h-72 overflow-hidden shrink-0 bg-slate-900">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                                />
                                            ) : item.video_url ? (
                                                <video
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                                >
                                                    <source src={item.video_url} type="video/mp4" />
                                                    <source src={item.video_url} type="video/webm" />
                                                </video>
                                            ) : (
                                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                                    <Newspaper className="text-slate-200" size={48} />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                            {/* Date Badge (Floating) */}
                                            <div className="absolute top-4 left-4 md:top-6 md:left-6">
                                                <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl shadow-2xl border border-white flex flex-col items-center group-hover:bg-primary transition-colors duration-500">
                                                    <span className="text-lg md:text-2xl font-black text-slate-900 leading-none group-hover:text-white transition-colors">
                                                        {new Date(item.created_at).getDate()}
                                                    </span>
                                                    <span className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest group-hover:text-white/80 transition-colors">
                                                        {new Date(item.created_at).toLocaleString('fr-FR', { month: 'short' })}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Category Pin & Video Icon */}
                                            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2">
                                                <span className="bg-accent text-white text-[9px] font-black px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest shadow-xl">
                                                    {item.category || 'Actualité'}
                                                </span>
                                                {item.video_url && (
                                                    <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest shadow-xl flex items-center gap-2">
                                                        <Play size={10} fill="currentColor" /> Vidéo
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 md:p-10 flex flex-col flex-grow">
                                            <div className="flex items-center gap-4 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-4 md:mb-6">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={12} className="text-accent" />
                                                    <span>3 min de lecture</span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg md:text-2xl font-black text-slate-950 mb-4 md:mb-6 group-hover:text-primary transition-colors leading-tight tracking-tighter line-clamp-2 overflow-hidden min-h-[3rem] md:min-h-[4rem]">
                                                {item.title}
                                            </h3>

                                            <p className="text-slate-500 font-medium leading-relaxed line-clamp-3 overflow-hidden mb-6 md:mb-8 flex-grow italic text-sm md:text-base">
                                                {item.summary}
                                            </p>

                                            <div className="inline-flex items-center gap-3 md:gap-4 text-primary font-black uppercase text-[10px] tracking-[0.2em] group/btn mt-auto">
                                                Explorer l'article
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl border-2 border-primary/20 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary group-hover/btn:scale-110 transition-all duration-300">
                                                    <ArrowRight size={14} className="md:w-4 md:h-4 group-hover/btn:text-white transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                <Search className="text-slate-300" size={40} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Aucun résultat trouvé</h2>
                            <p className="text-slate-500 text-lg">Nous n'avons trouvé aucun article correspondant à "{searchTerm}".</p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-8 text-primary font-black uppercase text-xs tracking-widest hover:underline"
                            >
                                Réinitialiser la recherche
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default NewsPage;
