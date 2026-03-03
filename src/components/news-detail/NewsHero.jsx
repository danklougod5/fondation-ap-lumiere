import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock } from 'lucide-react';

const NewsHero = ({ news, formatDate, isVideoFile }) => {
    return (
        <header className="relative min-h-[70vh] flex items-end overflow-hidden py-24 md:py-32">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-0"
            >
                {news.image_url ? (
                    <img
                        src={news.image_url}
                        alt={news.title}
                        className="w-full h-full object-cover object-[center_30%]"
                    />
                ) : news.video_url && isVideoFile(news.video_url) ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover object-center"
                    >
                        <source src={news.video_url} type="video/mp4" />
                        <source src={news.video_url} type="video/webm" />
                    </video>
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10 text-white mt-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <div className="flex flex-wrap gap-3 mb-8">
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {news.category || 'Événement'}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-heading font-black mb-8 leading-[1.1] tracking-tighter text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] break-words">
                        {news.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-8 text-white/70 text-sm font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-3">
                            <Calendar size={18} className="text-accent" />
                            <span>{formatDate(news.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <User size={18} className="text-accent" />
                            <span>Fondation AP Lumière</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={18} className="text-accent" />
                            <span>5 min de lecture</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </header>
    );
};

export default NewsHero;
