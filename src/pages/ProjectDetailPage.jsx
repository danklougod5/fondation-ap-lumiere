import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { cachedFetch } from '../lib/cache';
import { Target, ArrowLeft, Calendar, MapPin, Users, Heart, Share2, Loader2, CheckCircle2, Play } from 'lucide-react';

import Footer from '../components/Footer';
import SEO from '../components/SEO';

const ProjectDetailPage = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProject();
        window.scrollTo(0, 0);
    }, [slug]);

    const fetchProject = async () => {
        try {
            setLoading(true);
            if (!slug) {
                setLoading(false);
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

            setProject(data);
        } catch (error) {
            console.error('Error fetching project:', error);
        } finally {
            setLoading(false);
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


                {/* Hero Section */}
                <section className="relative min-h-[60vh] flex items-end overflow-hidden py-24 md:py-32">
                    <div className="absolute inset-0 z-0">
                        {project.image_url ? (
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover object-[center_30%]"
                            />
                        ) : project.video_url && isVideoFile(project.video_url) ? (
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover object-center"
                            >
                                <source src={project.video_url} type="video/mp4" />
                                <source src={project.video_url} type="video/webm" />
                            </video>
                        ) : (
                            <div className="w-full h-full bg-slate-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-white mt-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <nav className="mb-6">
                                <Link to="/#projects" className="text-emerald-400 font-bold flex items-center gap-2 hover:text-emerald-300 transition-colors">
                                    <ArrowLeft size={18} /> Projets en cours
                                </Link>
                            </nav>
                            <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 leading-tight text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                                {project.title}
                            </h1>
                            <div className="flex flex-wrap gap-4">
                                <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                                    {project.progress === 100 ? 'Terminé' : 'En cours'}
                                </span>
                                {project.is_featured && (
                                    <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-white/30">
                                        Prioritaire
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-12 gap-12">
                            {/* Left Column: Description & Progress */}
                            <div className="lg:col-span-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-10"
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-1.5 h-10 bg-emerald-500 rounded-full"></div>
                                        <h2 className="text-3xl font-heading font-black text-slate-900 uppercase tracking-tight">À propos du projet</h2>
                                    </div>
                                    <div className="prose prose-lg prose-slate max-w-none text-slate-600 font-medium leading-relaxed">
                                        {project.description ? (
                                            <div dangerouslySetInnerHTML={{ __html: project.description }} />
                                        ) : (
                                            <p className="italic text-slate-400">Aucune description disponible.</p>
                                        )}
                                    </div>

                                    {/* Detailed Progress */}
                                    <div className="mt-12 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <div className="flex justify-between items-end mb-4">
                                            <div className="flex items-center gap-2">
                                                <Target className="text-emerald-500" size={24} />
                                                <span className="text-sm font-black uppercase tracking-widest text-slate-900">État d'avancement</span>
                                            </div>
                                            <span className="text-4xl font-black font-heading text-emerald-500">{project.progress}%</span>
                                        </div>
                                        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${project.progress}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-emerald-400 to-accent rounded-full shadow-lg"
                                            />
                                        </div>
                                        <p className="mt-6 text-slate-500 text-sm font-medium italic">
                                            Chaque pourcentage représente une étape concrète vers la réalisation finale. Votre engagement rend cela possible.
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Video Section */}
                                {project.video_url && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="mb-10 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
                                    >
                                        <div className="flex flex-col mb-8">
                                            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-4 w-fit">
                                                <Play size={14} fill="currentColor" />
                                                Vidéo du Projet
                                            </div>
                                            <h3 className="text-3xl font-heading font-black text-slate-900 uppercase tracking-tighter">
                                                L'action en <span className="text-primary italic">Mouvement</span>
                                            </h3>
                                        </div>

                                        <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white bg-slate-900">
                                            <div className="absolute inset-0 opacity-30 blur-3xl scale-110 pointer-events-none">
                                                {isVideoFile(project.video_url) ? (
                                                    <video src={project.video_url} className="w-full h-full object-cover" muted />
                                                ) : (
                                                    <div className="w-full h-full bg-primary/20" />
                                                )}
                                            </div>

                                            <div className="relative z-10 w-full flex justify-center items-center bg-black/40 backdrop-blur-sm">
                                                <div className={`${project.video_url && (project.video_url.toLowerCase().includes('shorts') || project.video_url.toLowerCase().includes('tiktok'))
                                                    ? 'aspect-[9/16] max-h-[600px]'
                                                    : 'aspect-video w-full'
                                                    } overflow-hidden`}>
                                                    {isVideoFile(project.video_url) ? (
                                                        <video
                                                            src={project.video_url}
                                                            className="w-full h-full object-contain"
                                                            controls
                                                            playsInline
                                                        />
                                                    ) : (
                                                        <iframe
                                                            src={getEmbedUrl(project.video_url)}
                                                            className="w-full h-full"
                                                            title="Video player"
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            allowFullScreen
                                                        ></iframe>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Right Column: Sidebar */}
                            <div className="lg:col-span-4 space-y-8">
                                {/* Support CTA */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-8 -mt-8"></div>
                                    <h3 className="text-2xl font-heading font-black mb-6 text-white">Soutenir ce projet spécifique ?</h3>
                                    <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                                        Votre contribution directe est le moteur de cette initiative. Chaque don accélère la progression.
                                    </p>
                                    <a
                                        href="https://moya-pay.com/p/pl_203zikdg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white text-center font-black py-5 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 uppercase tracking-widest text-sm"
                                    >
                                        Faire un Don
                                    </a>
                                    <button className="w-full mt-4 flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors py-3 font-bold text-sm">
                                        <Share2 size={16} /> Partager l'initiative
                                    </button>
                                </motion.div>

                                {/* Impact Points */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100"
                                >
                                    <h4 className="text-xl font-heading font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-3">
                                        <CheckCircle2 className="text-emerald-500" size={20} />
                                        Impact Attendu
                                    </h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                                            <span className="text-slate-600 font-medium text-sm leading-relaxed">Amélioration durable des conditions de vie locales.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                                            <span className="text-slate-600 font-medium text-sm leading-relaxed">Renforcement des capacités de la communauté.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                                            <span className="text-slate-600 font-medium text-sm leading-relaxed">Création d'un modèle reproductible dans d'autres régions.</span>
                                        </li>
                                    </ul>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default ProjectDetailPage;
