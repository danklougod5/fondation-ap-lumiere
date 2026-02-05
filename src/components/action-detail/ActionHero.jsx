import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Heart, ArrowRight, Camera, Users } from 'lucide-react';
import { fadeInUp, staggerContainer } from './animations';
import { iconComponents } from './utils';

const ActionHero = ({ action }) => {
    const IconComponent = iconComponents[action.icon] || Heart;

    return (
        <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-end overflow-hidden py-24 md:py-32">
            <div className="absolute inset-0 z-0">
                {action.image_url ? (
                    <motion.img
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                        src={action.image_url}
                        alt={action.title}
                        className="w-full h-full object-cover object-[center_30%]"
                    />
                ) : action.video_url ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover object-center"
                    >
                        <source src={action.video_url} type="video/mp4" />
                        <source src={action.video_url} type="video/webm" />
                    </video>
                ) : (
                    <div className="w-full h-full bg-slate-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/50 to-transparent" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="hidden lg:block absolute top-32 right-8 z-20"
            >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="text-accent" size={24} />
                        <span className="text-white/70 text-sm font-medium">Bénéficiaires</span>
                    </div>
                    <span className="text-4xl font-black text-white">2,500+</span>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 relative z-10 text-white mt-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="max-w-4xl"
                >

                    <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-4 md:mb-6">
                        <div className="bg-gradient-to-br from-accent to-emerald-400 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/30 rotate-3 hover:rotate-0 transition-transform">
                            <IconComponent size={24} className="text-white sm:scale-125 md:scale-150" />
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            <span className="bg-white/10 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-bold border border-white/20 flex items-center gap-2">
                                <Sparkles size={12} className="text-accent" />
                                {action.subtitle || "Domaine d'intervention"}
                            </span>
                            <span className="bg-accent/20 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-bold border border-accent/30 text-accent">
                                En cours
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 md:mb-6 leading-[1.1] tracking-tight text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                    >
                        {action.title}
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-base sm:text-xl md:text-2xl text-white/90 max-w-2xl font-medium leading-relaxed mb-8 md:mb-10 line-clamp-3 sm:line-clamp-none drop-shadow-md"
                    >
                        {action.short_desc}
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://moya-pay.com/p/pl_203zikdg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-gradient-to-r from-accent to-emerald-400 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1 flex items-center justify-center gap-3"
                        >
                            <Heart size={18} />
                            Soutenir ce projet
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <button
                            onClick={() => document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white/10 backdrop-blur-md text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-3"
                        >
                            <Camera size={18} />
                            Voir la galerie
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center pt-2"
                >
                    <div className="w-1.5 h-3 bg-accent rounded-full" />
                </motion.div>
            </div>
        </section>
    );
};

export default ActionHero;
