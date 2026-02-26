import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { cachedFetch } from '../lib/cache';
import { Target, ArrowRight, Loader2, Sparkles, Sprout, Hammer } from 'lucide-react';
import { OptimizedImage, OptimizedVideo } from './OptimizedMedia';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await cachedFetch('projects_homepage', async () => {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (error) throw error;
                return data || [];
            });

            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null;
    if (projects.length === 0) return null;

    const SingleProjectCard = ({ project }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-slate-900 rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[500px]"
        >
            <div className="lg:w-1/2 relative overflow-hidden h-64 lg:h-auto bg-slate-800">
                {project.image_url ? (
                    <OptimizedImage
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000"
                    />
                ) : project.video_url ? (
                    <OptimizedVideo
                        src={project.video_url}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000"
                    />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:hidden" />

                <div className="absolute top-8 left-8 flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-emerald-500 text-white rounded-xl shadow-lg border border-emerald-400">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest">En cours</span>
                        </div>
                    </div>
                    {project.is_featured && (
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-xl shadow-lg font-black text-[10px] uppercase tracking-widest border border-white/30">
                            Prioritaire
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white">
                <div className="inline-flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-4">
                    <Sparkles size={14} />
                    Projet Vedette
                </div>
                <h3 className="text-3xl md:text-5xl font-heading font-black mb-6 leading-tight text-white">
                    {project.title}
                </h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10 line-clamp-4">
                    {project.description?.replace(/<[^>]*>?/gm, '')}
                </p>

                <div className="space-y-6 mb-12">
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Progression globale</span>
                        <span className="text-3xl font-black font-heading text-emerald-400">{project.progress}%</span>
                    </div>
                    <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${project.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-accent rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        />
                    </div>
                </div>

                <Link
                    to={`/projets/${project.slug}`}
                    className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-emerald-500/20"
                >
                    Voir les détails du projet
                    <ArrowRight size={18} />
                </Link>
            </div>
        </motion.div>
    );

    const ProjectGridCard = ({ project, index }) => (
        <Link to={`/projets/${project.slug}`} className="block group">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col h-full bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-emerald-500/10 group-hover:-translate-y-2"
            >
                <div className="relative h-64 overflow-hidden shrink-0 bg-slate-800">
                    {project.image_url ? (
                        <OptimizedImage
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                        />
                    ) : project.video_url ? (
                        <OptimizedVideo
                            src={project.video_url}
                            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                        />
                    ) : null}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-emerald-50">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                {project.progress === 100 ? 'Terminé' : 'En cours'}
                            </span>
                        </div>
                    </div>
                    {project.is_featured && (
                        <div className="absolute top-6 right-6 px-4 py-2 bg-primary text-white rounded-xl shadow-lg font-black text-[10px] uppercase tracking-widest">
                            Prioritaire
                        </div>
                    )}
                </div>

                <div className="p-10 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 group-hover:text-emerald-500 transition-colors leading-tight">
                        {project.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                        {project.description?.replace(/<[^>]*>?/gm, '')}
                    </p>

                    <div className="mt-auto space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Progression</span>
                            <span className="text-lg font-black font-heading text-emerald-500">{project.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${project.progress}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-emerald-400 to-accent rounded-full shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );

    return (
        <section id="projects" className="pt-6 md:pt-10 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-white relative overflow-hidden">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-emerald-100">
                            <Target size={14} />
                            Impact Réel
                        </div>
                        <h2 className="mb-6">
                            Nos Projets <span className="text-emerald-500 italic">en Cours</span>
                        </h2>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed">
                            Chaque brique posée, chaque vie touchée. Découvrez l'avancement concret de nos initiatives sur le terrain.
                        </p>
                    </motion.div>
                </div>

                {projects.length === 1 ? (
                    <SingleProjectCard project={projects[0]} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project, index) => (
                            <ProjectGridCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
