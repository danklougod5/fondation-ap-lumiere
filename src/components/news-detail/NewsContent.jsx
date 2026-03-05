import React from 'react';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { Facebook, Twitter, Linkedin, Copy, Check, Play } from 'lucide-react';

const NewsContent = ({
    news,
    isVideoFile,
    getEmbedUrl,
    shareOnSocial,
    copyToClipboard,
    copied
}) => {
    return (
        <div className="lg:col-span-8">
            <article className="prose prose-lg prose-slate max-w-none mb-16">
                <div className="space-y-8 break-words overflow-visible">
                    {news.content ? (
                        <div
                            className="text-slate-600 text-lg md:text-xl leading-[1.8] font-medium rich-content prose prose-lg prose-slate max-w-none"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news.content) }}
                        />
                    ) : (
                        <p className="text-gray-400 italic">Contenu non disponible.</p>
                    )}
                </div>
            </article>

            {/* Video Section */}
            {news.video_url && (
                <section className="mb-20">
                    <div className="flex flex-col mb-8">
                        <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-4 w-fit">
                            <Play size={14} fill="currentColor" />
                            Reportage Vidéo
                        </div>
                        <h3 className="text-3xl font-heading font-black text-slate-900 uppercase tracking-tighter">
                            L'action en <span className="text-primary italic">Mouvement</span>
                        </h3>
                    </div>

                    <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white bg-slate-900">
                        {/* Blurred Background for Portrait Videos */}
                        <div className="absolute inset-0 opacity-30 blur-3xl scale-110 pointer-events-none">
                            {isVideoFile(news.video_url) ? (
                                <video src={news.video_url} className="w-full h-full object-cover" muted />
                            ) : (
                                <div className="w-full h-full bg-primary/20" />
                            )}
                        </div>

                        <div className="relative z-10 w-full flex justify-center items-center bg-black/40 backdrop-blur-sm">
                            <div className={`${news.video_url.toLowerCase().includes('shorts') || news.video_url.toLowerCase().includes('tiktok')
                                ? 'aspect-[9/16] max-h-[700px]'
                                : 'aspect-video w-full'
                                } overflow-hidden`}>
                                {isVideoFile(news.video_url) ? (
                                    <video
                                        src={news.video_url}
                                        className="w-full h-full object-contain"
                                        controls
                                        playsInline
                                        onLoadedMetadata={(e) => {
                                            const video = e.target;
                                            if (video.videoHeight > video.videoWidth) {
                                                video.parentElement.classList.add('aspect-[9/16]');
                                                video.parentElement.classList.add('max-h-[700px]');
                                                video.parentElement.classList.remove('aspect-video');
                                                video.parentElement.classList.remove('w-full');
                                            }
                                        }}
                                    />
                                ) : (
                                    <iframe
                                        src={getEmbedUrl(news.video_url)}
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
                </section>
            )}

            {/* Share & Social */}
            <div className="mt-20 p-10 bg-slate-50 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
                <div>
                    <h4 className="font-black text-slate-900 text-2xl uppercase tracking-tighter mb-2">Partager l'impact</h4>
                    <p className="text-slate-500 font-medium italic">Diffondez nos actions auprès de votre communauté</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button onClick={() => shareOnSocial('facebook')} className="w-12 h-12 flex items-center justify-center bg-white text-[#1877F2] rounded-2xl hover:bg-[#1877F2] hover:text-white transition-all shadow-sm border border-slate-100"><Facebook size={20} /></button>
                    <button onClick={() => shareOnSocial('twitter')} className="w-12 h-12 flex items-center justify-center bg-white text-[#1DA1F2] rounded-2xl hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm border border-slate-100"><Twitter size={20} /></button>
                    <button onClick={() => shareOnSocial('linkedin')} className="w-12 h-12 flex items-center justify-center bg-white text-[#0A66C2] rounded-2xl hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm border border-slate-100"><Linkedin size={20} /></button>
                    <button onClick={copyToClipboard} className="flex items-center gap-3 px-8 py-3 bg-primary text-white rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 font-black uppercase text-xs tracking-widest">
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? 'Copié !' : 'Copier le lien'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsContent;
