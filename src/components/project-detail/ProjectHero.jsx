import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ProjectHero = ({ project, isVideoFile }) => {
    return (
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
    );
};

export default ProjectHero;
