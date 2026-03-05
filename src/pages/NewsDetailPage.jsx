import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, ChevronRight, Loader2, X, BookOpen, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { cachedFetch } from '../lib/cache';
import logger from '../lib/logger';
import SEO from '../components/SEO';

// Sub-components
import NewsHero from '../components/news-detail/NewsHero';
import NewsContent from '../components/news-detail/NewsContent';
import NewsSidebar from '../components/news-detail/NewsSidebar';
import NewsGallery from '../components/news-detail/NewsGallery';
import NewsNavigation from '../components/news-detail/NewsNavigation';

const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
};

const NewsDetailPage = () => {
    const { slug } = useParams();
    const [news, setNews] = useState(null);
    const [otherNews, setOtherNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchNews();
        fetchOtherNews();
    }, [slug]);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const data = await cachedFetch(`news_detail_${slug}`, async () => {
                const { data, error } = await supabase
                    .from('news')
                    .select('*')
                    .eq('slug', slug)
                    .single();
                if (error) throw error;
                return data;
            });

            if (!data) {
                setNews(null);
            } else {
                setNews(data);
            }
        } catch (error) {
            logger.error('Fetch error:', error);
            setNews(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchOtherNews = async () => {
        try {
            const data = await cachedFetch(`news_other_${slug}`, async () => {
                const { data, error } = await supabase
                    .from('news')
                    .select('id, title, slug, image_url, video_url, created_at, summary, category')
                    .neq('slug', slug)
                    .order('created_at', { ascending: false })
                    .limit(3);
                if (error) throw error;
                return data || [];
            });

            if (data) {
                setOtherNews(data);
            }
        } catch (error) {
            logger.error('Error fetching other news:', error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnSocial = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(news?.title || '');

        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
        };

        window.open(urls[platform], '_blank', 'width=600,height=400');
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

    const isVideoFile = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
        return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || url.includes('storage/v1/object/public/videos');
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (!news.additional_images) return;
        const currentIndex = news.additional_images.findIndex(img => img === selectedImage);
        const newIndex = (currentIndex - 1 + news.additional_images.length) % news.additional_images.length;
        setSelectedImage(news.additional_images[newIndex]);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (!news.additional_images) return;
        const currentIndex = news.additional_images.findIndex(img => img === selectedImage);
        const newIndex = (currentIndex + 1) % news.additional_images.length;
        setSelectedImage(news.additional_images[newIndex]);
    };

    const getCardSpan = (index) => {
        const patterns = [
            'md:col-span-2 md:row-span-2',
            'md:col-span-1 md:row-span-1',
            'md:col-span-1 md:row-span-1',
            'md:col-span-1 md:row-span-2',
            'md:col-span-2 md:row-span-1',
            'md:col-span-1 md:row-span-1',
        ];
        return patterns[index % patterns.length];
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.05)_0%,transparent_70%)]" />

                <div className="relative text-center z-10">
                    <div className="relative w-40 h-40 mx-auto mb-12 flex items-center justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-b-2 border-accent rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border-t-2 border-primary rounded-full opacity-50"
                        />
                        <div className="relative z-20">
                            <BookOpen className="text-white w-12 h-12 md:w-16 md:h-16 animate-pulse" strokeWidth={1.5} />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-accent font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4">
                            Expérience Immersive
                        </p>
                        <h2 className="text-white text-3xl md:text-4xl font-heading font-black tracking-tighter mb-2">
                            Préparation de <span className="gradient-text">l'article</span>
                        </h2>
                        <div className="flex items-center justify-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span>Presse Fondation</span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (!news) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center px-4">
                    <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <X className="text-red-500" size={40} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-4">Article non trouvé</h1>
                    <Link to="/actualites" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-black hover:bg-primary-dark transition-all">
                        <ArrowLeft size={18} />
                        Retour aux actualités
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={news.title}
                description={news.summary}
                image={news.image_url}
                url={`/actualites/${news.slug}`}
                type="article"
            />
            <div className="min-h-screen bg-white font-body selection:bg-primary selection:text-white">
                <NewsHero news={news} formatDate={formatDate} isVideoFile={isVideoFile} />

                <nav className="bg-slate-50 border-b border-slate-100 py-5">
                    <div className="container mx-auto px-4">
                        <ol className="flex flex-wrap items-center gap-y-2 gap-x-3 text-[10px] font-black uppercase tracking-widest">
                            <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors whitespace-nowrap">Accueil</Link></li>
                            <ChevronRight size={12} className="text-slate-300 shrink-0" />
                            <li><Link to="/actualites" className="text-slate-400 hover:text-primary transition-colors whitespace-nowrap">Actualités</Link></li>
                            <ChevronRight size={12} className="text-slate-300 shrink-0" />
                            <li className="text-primary break-all line-clamp-1">{news.title}</li>
                        </ol>
                    </div>
                </nav>

                <main className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24">
                            <NewsContent
                                news={news}
                                isVideoFile={isVideoFile}
                                getEmbedUrl={getEmbedUrl}
                                shareOnSocial={shareOnSocial}
                                copyToClipboard={copyToClipboard}
                                copied={copied}
                            />
                            <NewsSidebar />
                        </div>

                        <NewsGallery
                            news={news}
                            setSelectedImage={setSelectedImage}
                            scaleIn={scaleIn}
                            getCardSpan={getCardSpan}
                        />
                    </div>
                </main>

                <NewsNavigation otherNews={otherNews} />

                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-950/98 backdrop-blur-2xl z-[100] flex items-center justify-center p-4 md:p-12"
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.button
                                whileHover={{ rotate: 90, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute top-8 right-8 w-14 h-14 bg-white text-slate-950 rounded-full flex items-center justify-center shadow-2xl z-[110]"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={28} />
                            </motion.button>

                            {news.additional_images && news.additional_images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-black/50 hover:bg-accent text-white backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all duration-300 z-[120] group shadow-lg pointer-events-auto"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                                    </button>

                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-black/50 hover:bg-accent text-white backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all duration-300 z-[120] group shadow-lg pointer-events-auto"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </>
                            )}
                            <motion.div
                                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                                className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center pointer-events-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="relative group w-full h-full flex items-center justify-center pointer-events-auto">
                                    <motion.img
                                        key={selectedImage}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        src={selectedImage}
                                        alt="Zoom immersive"
                                        className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                                    />

                                    <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 flex justify-center">
                                        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] inline-block max-w-2xl shadow-2xl">
                                            <h3 className="text-white font-black text-sm md:text-xl uppercase tracking-tight text-center">
                                                Immersion - {news.title}
                                            </h3>
                                            <div className="h-1 w-8 md:w-12 bg-accent mt-3 mx-auto rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default NewsDetailPage;
