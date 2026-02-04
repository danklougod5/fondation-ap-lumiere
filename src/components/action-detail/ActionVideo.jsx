import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const ActionVideo = ({ videoUrl, title }) => {
    if (!videoUrl) return null;

    const isVideoFile = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
        return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || url.includes('storage/v1/object/public/videos');
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

    return (
        <section id="video-section" className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col mb-12">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-4 w-fit">
                        <Play size={14} fill="currentColor" />
                        Reportage Vidéo
                    </div>
                    <h3 className="text-3xl md:text-4xl font-heading font-black text-slate-900 uppercase tracking-tighter">
                        L'action en <span className="text-primary italic">Mouvement</span>
                    </h3>
                </div>

                <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white bg-slate-900">
                    <div className="absolute inset-0 opacity-30 blur-3xl scale-110 pointer-events-none">
                        {isVideoFile(videoUrl) ? (
                            <video src={videoUrl} className="w-full h-full object-cover" muted />
                        ) : (
                            <div className="w-full h-full bg-primary/20" />
                        )}
                    </div>

                    <div className="relative z-10 w-full flex justify-center items-center bg-black/40 backdrop-blur-sm">
                        <div className={`${videoUrl.toLowerCase().includes('shorts') || videoUrl.toLowerCase().includes('tiktok')
                            ? 'aspect-[9/16] max-h-[700px]'
                            : 'aspect-video w-full'
                            } overflow-hidden`}>
                            {isVideoFile(videoUrl) ? (
                                <video
                                    src={videoUrl}
                                    className="w-full h-full object-contain"
                                    controls
                                    playsInline
                                />
                            ) : (
                                <iframe
                                    src={getEmbedUrl(videoUrl)}
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
            </div>
        </section>
    );
};

export default ActionVideo;
