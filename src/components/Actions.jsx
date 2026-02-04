import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    GraduationCap, HeartPulse, ShieldAlert, Hammer,
    ArrowRight, Loader2, Heart, ChevronLeft, ChevronRight,
    Sparkles, Zap
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const iconComponents = {
    GraduationCap: GraduationCap,
    HeartPulse: HeartPulse,
    ShieldAlert: ShieldAlert,
    Hammer: Hammer,
    Heart: Heart
};

const Actions = () => {
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActions();
    }, []);

    const fetchActions = async () => {
        try {
            const { data, error } = await supabase
                .from('actions')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;
            setActions(data || []);
        } catch (error) {
            console.error('Error fetching actions:', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="py-32 flex flex-col justify-center items-center bg-white">
                <Loader2 className="animate-spin text-primary mb-4" size={48} />
            </div>
        );
    }

    if (actions.length === 0) return null;

    return (
        <section id="actions" className="section-padding bg-white relative overflow-hidden">
            {/* Enhanced Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-gradient-to-bl from-primary/5 via-accent/3 to-transparent rounded-full blur-[100px] md:blur-[120px] -mr-48 md:-mr-80 -mt-48 md:-mt-80 opacity-50 z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest mb-4 md:mb-6 border border-primary/20">
                            <Sparkles size={12} className="md:w-3.5 md:h-3.5" />
                            Nos Missions
                        </div>
                        <h2 className="mb-4 md:mb-6">
                            Domaines d'<span className="text-primary italic">Intervention</span>
                        </h2>
                        <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
                            Des actions concrètes et structurées pour répondre aux besoins vitaux des communautés les plus vulnérables.
                        </p>
                    </motion.div>

                    {/* Navigation Buttons - Hidden on mobile, shown on desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden lg:flex gap-3 shrink-0"
                    >
                        <button className="swiper-prev-actions w-12 md:w-14 h-12 md:h-14 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/20 group">
                            <ChevronLeft size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="swiper-next-actions w-12 md:w-14 h-12 md:h-14 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/20 group">
                            <ChevronRight size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                        </button>
                    </motion.div>
                </div>

                {/* Swiper Container */}
                <div className="actions-swiper-wrapper">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        speed={700}
                        navigation={{
                            prevEl: '.swiper-prev-actions',
                            nextEl: '.swiper-next-actions',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.swiper-custom-pagination-actions'
                        }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 1.5, spaceBetween: 24 },
                            768: { slidesPerView: 2, spaceBetween: 24 },
                            1024: { slidesPerView: 3, spaceBetween: 32 },
                        }}
                        className="!pb-16 md:!pb-20"
                    >
                        {actions.map((action, index) => {
                            const IconComponent = iconComponents[action.icon] || Heart;
                            return (
                                <SwiperSlide key={action.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="h-full group"
                                    >
                                        <Link
                                            to={`/actions/${action.slug}`}
                                            className="relative block h-[480px] sm:h-[500px] md:h-[520px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 active:scale-[0.98]"
                                        >
                                            {/* Background Image */}
                                            <div className="absolute inset-0">
                                                {action.image_url ? (
                                                    <img
                                                        src={action.image_url}
                                                        alt={action.title}
                                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-active:scale-105"
                                                    />
                                                ) : action.video_url ? (
                                                    <video
                                                        autoPlay
                                                        muted
                                                        loop
                                                        playsInline
                                                        className="w-full h-full object-cover transform scale-105"
                                                    >
                                                        <source src={action.video_url} type="video/mp4" />
                                                        <source src={action.video_url} type="video/webm" />
                                                    </video>
                                                ) : null}
                                                {/* Multi-layer Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-slate-900/30 group-hover:from-slate-900/98 transition-all duration-500"></div>
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                            </div>

                                            {/* Accent Bar */}
                                            <div className="absolute top-0 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-accent via-emerald-400 to-accent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30"></div>

                                            {/* Content Overlay */}
                                            <div className="absolute inset-0 z-20 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                                                {/* Top Section: Icon */}
                                                <div className="flex justify-between items-start">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                                                        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center border border-white/20 text-white group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-500 shadow-lg">
                                                            <IconComponent size={24} className="md:w-7 md:h-7" strokeWidth={2.5} />
                                                        </div>
                                                    </div>

                                                    {/* Arrow - visible on mobile tap, desktop hover */}
                                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white lg:opacity-0 lg:group-hover:opacity-100 lg:transform lg:translate-x-4 lg:group-hover:translate-x-0 transition-all duration-300">
                                                        <ArrowRight size={16} className="md:w-4.5 md:h-4.5" />
                                                    </div>
                                                </div>

                                                {/* Bottom Section */}
                                                <div className="space-y-3 md:space-y-4">
                                                    {/* Badge - Always visible on mobile */}
                                                    <div className="flex items-center gap-2 lg:opacity-0 lg:group-hover:opacity-100 lg:transform lg:translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300">
                                                        <Zap size={12} className="md:w-3.5 md:h-3.5 text-accent fill-accent" />
                                                        <span className="text-accent font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Action Directe</span>
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight group-hover:text-accent transition-colors duration-500 font-heading">
                                                        {action.title}
                                                    </h3>

                                                    {/* Description - Always visible on mobile, reveals on desktop hover */}
                                                    <div className="overflow-hidden">
                                                        <p className="text-white/70 text-sm md:text-base font-medium leading-relaxed line-clamp-2 lg:transform lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500 lg:delay-100">
                                                            {action.short_desc}
                                                        </p>
                                                    </div>

                                                    {/* CTA - Always visible on mobile */}
                                                    <div className="pt-2 md:pt-4 lg:transform lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500 lg:delay-200">
                                                        <span className="inline-flex items-center gap-2 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest border-b-2 border-accent pb-1">
                                                            Découvrir l'action
                                                            <ArrowRight size={12} className="md:w-3.5 md:h-3.5 group-hover:translate-x-1 transition-transform" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Shine Effect - Desktop only */}
                                            <div className="hidden lg:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-25 pointer-events-none">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* Pagination & Footer */}
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 mt-6 md:mt-8">
                        <div className="swiper-custom-pagination-actions flex gap-2 order-2 md:order-1"></div>

                        <Link
                            to="/actions"
                            className="group flex items-center gap-2 md:gap-3 text-gray-900 font-black uppercase text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] hover:text-primary transition-colors order-1 md:order-2"
                        >
                            <span>Découvrir toutes nos actions</span>
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm group-hover:shadow-lg">
                                <ArrowRight size={16} className="md:w-4.5 md:h-4.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .swiper-custom-pagination-actions .swiper-pagination-bullet {
                    width: 32px;
                    height: 4px;
                    background: #CBD5E1;
                    opacity: 1;
                    border-radius: 3px;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .swiper-custom-pagination-actions .swiper-pagination-bullet-active {
                    background: linear-gradient(90deg, #0066CC 0%, #00C896 100%);
                    width: 48px;
                    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
                }
                @media (max-width: 640px) {
                    .swiper-custom-pagination-actions .swiper-pagination-bullet {
                        width: 28px;
                        height: 3px;
                    }
                    .swiper-custom-pagination-actions .swiper-pagination-bullet-active {
                        width: 40px;
                    }
                }
            `}} />
        </section>
    );
};

export default Actions;
