import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { cachedFetch } from '../lib/cache';
import logger from '../lib/logger';
import { Target, ArrowLeft, Calendar, MapPin, Users, Heart, Share2, Loader2, CheckCircle2, Play } from 'lucide-react';

import Footer from '../components/Footer';
import SEO from '../components/SEO';

import ProjectHero from '../components/project-detail/ProjectHero';
import ProjectContent from '../components/project-detail/ProjectContent';
import ProjectSidebar from '../components/project-detail/ProjectSidebar';

const ProjectDetailPage = () => {
    // ... scope matches until updateState
    const { slug } = useParams();
    const [state, setState] = useState({
        project: null,
        loading: true
    });

    const { project, loading } = state;

    const updateState = (updates) => setState(prev => ({ ...prev, ...updates }));

    useEffect(() => {
        fetchProject();
        window.scrollTo(0, 0);
    }, [slug]);

    const fetchProject = async () => {
        try {
            updateState({ loading: true });
            if (!slug) {
                updateState({ loading: false });
                return;
            }
            const data = await cachedFetch(`project_detail_${slug}`, async () => {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('slug', slug)
                    .single();
                if (error) throw error;
                return data;
            });

            updateState({ project: data, loading: false });
        } catch (error) {
            logger.error('Error fetching project:', error);
            updateState({ loading: false });
        }
    };

    const isVideoFile = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
        return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || (url && url.includes('storage/v1/object/public/videos'));
    };

    const getEmbedUrl = (url) => {
        if (!url) return null;
        if (isVideoFile(url)) return url;

        const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^#&?]*)/);
        if (ytMatch && ytMatch[1].length === 11) {
            return `https://www.youtube.com/embed/${ytMatch[1]}`;
        }

        const vimeoMatch = url.match(/vimeo\.com\/(?:video\/|channels\/|groups\/|([^/]*)\/videos\/)?([0-9]+)/);
        if (vimeoMatch && vimeoMatch[2]) {
            return `https://player.vimeo.com/video/${vimeoMatch[2]}`;
        }

        return url;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
                {/* Visual Backdrop */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative text-center z-10">
                    <div className="relative w-44 h-44 mx-auto mb-12 flex items-center justify-center">
                        {/* Dynamic Rings */}
                        <motion.div
                            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                            transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
                            className="absolute inset-0 border-t-2 border-accent rounded-[3.5rem] shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border-b-2 border-primary rounded-[3rem] opacity-30"
                        />

                        {/* Iconic Element */}
                        <div className="relative">
                            <Target className="text-white w-14 h-14 md:w-20 md:h-20 opacity-20 animate-pulse" strokeWidth={1} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ scale: [0, 1.5], opacity: [1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-4 h-4 bg-accent rounded-full"
                                />
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-white/40 font-black uppercase tracking-[0.5em] text-[10px] mb-4">
                            Innovation & Développement
                        </p>
                        <h2 className="text-white text-3xl md:text-5xl font-heading font-black tracking-tighter mb-4">
                            Lancement du <span className="gradient-text">Projet</span>
                        </h2>
                        <div className="flex justify-center gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-1.5 h-1.5 rounded-full bg-accent"
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Projet Introuvable</h2>
                    <Link to="/" className="text-emerald-500 font-bold hover:underline flex items-center gap-2 justify-center">
                        <ArrowLeft size={18} /> Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={project.title}
                description={project.description?.replace(/<[^>]*>?/gm, '')?.substring(0, 160) || 'Découvrez ce projet de la Fondation AP Lumière.'}
                image={project.image_url}
                url={`/projets/${project.slug}`}
                type="article"
            />
            <div className="min-h-screen bg-slate-50">
                <ProjectHero project={project} isVideoFile={isVideoFile} />

                {/* Main Content */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-12 gap-12">
                            <ProjectContent
                                project={project}
                                isVideoFile={isVideoFile}
                                getEmbedUrl={getEmbedUrl}
                            />
                            <ProjectSidebar />
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default ProjectDetailPage;
