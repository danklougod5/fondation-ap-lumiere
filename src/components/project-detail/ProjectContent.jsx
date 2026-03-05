import React from 'react';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { Target, Play } from 'lucide-react';

const ProjectContent = ({ project, isVideoFile, getEmbedUrl }) => {
    return (
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
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }} />
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
    );
};

export default ProjectContent;
