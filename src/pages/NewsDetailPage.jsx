import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter,
    Linkedin, Copy, Check, ChevronRight, Loader2, X, Heart,
    BookOpen, Tag, ArrowRight, Camera, Eye, ChevronLeft, Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.12
        }
    }
};

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
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error || !data) {
                console.error('Error fetching news:', error);
                setNews(null);
            } else {
                setNews(data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOtherNews = async () => {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('id, title, slug, image_url, video_url, created_at, summary, category')
                .neq('slug', slug)
                .order('created_at', { ascending: false })
                .limit(3);

            if (!error && data) {
                setOtherNews(data);
            }
        } catch (error) {
            console.error('Error fetching other news:', error);
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

        // Si c'est un fichier direct (Supabase ou autre), on ne le transforme pas en embded
        if (isVideoFile(url)) return url;

        // YouTube
        const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^#&?]*)/);
        if (ytMatch && ytMatch[1].length === 11) {
            return `https://www.youtube.com/embed/${ytMatch[1]}`;
        }

        // Vimeo
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

    // pattern pour l'effet Bento (réutilisable)
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
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="text-center">
                    <div className="relative mb-6">
                        <div className="w-16 h-16 border-4 border-accent/20 rounded-full animate-ping absolute inset-0"></div>
                        <Loader2 className="animate-spin text-accent w-16 h-16 relative" />
                    </div>
                    <p className="text-white/60 font-black uppercase tracking-widest text-xs">Chargement de l'article</p>
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
        <div className="min-h-screen bg-white font-body selection:bg-primary selection:text-white">
            {/* Hero Section */}
            <header className="relative min-h-[70vh] flex items-end overflow-hidden py-24 md:py-32">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    {news.image_url ? (
                        <img
                            src={news.image_url}
                            alt={news.title}
                            className="w-full h-full object-cover object-[center_30%]"
                        />
                    ) : news.video_url && isVideoFile(news.video_url) ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover object-center"
                        >
                            <source src={news.video_url} type="video/mp4" />
                            <source src={news.video_url} type="video/webm" />
                        </video>
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                </motion.div>

                <div className="container mx-auto px-4 relative z-10 text-white mt-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="flex flex-wrap gap-3 mb-8">
                            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {news.category || 'Événement'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-heading font-black mb-8 leading-[1.1] tracking-tighter text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] break-words">
                            {news.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-8 text-white/70 text-sm font-bold uppercase tracking-widest">
                            <div className="flex items-center gap-3">
                                <Calendar size={18} className="text-accent" />
                                <span>{formatDate(news.created_at)}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <User size={18} className="text-accent" />
                                <span>Fondation AP Lumière</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock size={18} className="text-accent" />
                                <span>5 min de lecture</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Breadcrumb - Styled finer */}
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
                        {/* Article Content */}
                        <div className="lg:col-span-8">
                            <article className="prose prose-lg prose-slate max-w-none mb-16">
                                <div className="space-y-8 break-words overflow-visible">
                                    {news.content ? (
                                        <div
                                            className="text-slate-600 text-lg md:text-xl leading-[1.8] font-medium rich-content prose prose-lg prose-slate max-w-none"
                                            dangerouslySetInnerHTML={{ __html: news.content }}
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

                            {/* Additional Images Gallery (Bento Style) */}
                            {news.additional_images && news.additional_images.length > 0 && (
                                <section className="mt-20 pt-16 border-t border-slate-100">
                                    <div className="flex flex-col mb-12">
                                        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-4 w-fit">
                                            <Camera size={14} />
                                            Reportage Photo
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-heading font-black text-slate-900 uppercase tracking-tighter">
                                            Immersion <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Visuelle</span>
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[auto] md:auto-rows-[250px]">
                                        {news.additional_images.map((img, idx) => (
                                            <motion.div
                                                key={idx}
                                                variants={scaleIn}
                                                whileInView="animate"
                                                initial="initial"
                                                viewport={{ once: true }}
                                                className={`relative rounded-3xl md:rounded-[2rem] overflow-hidden cursor-pointer group shadow-xl shadow-slate-200/50 border-4 border-white aspect-[4/3] md:aspect-auto ${getCardSpan(idx)}`}
                                                onClick={() => setSelectedImage(img)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Photo ${idx + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
                                                        <Eye size={20} className="text-white" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
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

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-12">
                            {/* CTA Card (Enhanced) */}
                            <div className="bg-slate-950 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 text-white relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] sticky top-24">
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-accent/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-10 border border-accent/30">
                                        <Heart size={32} className="text-accent" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight uppercase tracking-tighter break-words text-white">Devenez acteur du changement</h3>
                                    <p className="text-white/60 mb-10 font-medium text-base md:text-lg leading-relaxed">Chaque don, petit ou grand, nous rapproche d'un avenir meilleur pour tous.</p>
                                    <Link to="/contact" className="block w-full bg-gradient-to-r from-accent to-emerald-400 text-white text-center font-black py-4 md:py-5 rounded-2xl hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all uppercase text-[10px] md:text-xs tracking-widest">
                                        Soutenir nos actions
                                    </Link>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
                                <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
                            </div>

                            {/* Newsletter Simple */}
                            <div className="bg-slate-50 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                    <BookOpen size={24} className="text-primary" />
                                </div>
                                <h4 className="font-black text-slate-900 text-xl uppercase tracking-tighter mb-4 break-words">Restez informé</h4>
                                <p className="text-slate-500 mb-8 font-medium text-sm md:text-base">Inscrivez-vous pour ne rien manquer de notre actualité.</p>
                                <div className="space-y-4">
                                    <input type="email" placeholder="Votre email" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" />
                                    <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all uppercase text-[10px] tracking-widest">S'abonner</button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            {/* Suggested Articles / Related News */}
            {otherNews.length > 0 && (
                <section className="py-24 bg-slate-50 border-t border-slate-100">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.2em] mb-4">
                                    <div className="w-8 h-1 bg-primary rounded-full" />
                                    Continuer la lecture
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black font-heading text-slate-950 uppercase tracking-tighter">À lire <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">également</span></h2>
                            </div>
                            <Link to="/actualites" className="inline-flex items-center gap-3 bg-white px-8 py-3 rounded-2xl text-slate-900 font-black hover:bg-slate-900 hover:text-white transition-all shadow-sm border border-slate-100 uppercase text-[10px] tracking-widest">
                                Voir Tout <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {otherNews.map((item, index) => (
                                <motion.article
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white rounded-[3rem] shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 overflow-hidden border border-slate-100 flex flex-col h-full"
                                >
                                    <div className="relative h-72 overflow-hidden shrink-0">
                                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-primary text-[10px] font-black uppercase tracking-widest shadow-xl">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-10 flex flex-col flex-grow">
                                        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 group-hover:text-primary transition-colors leading-tight tracking-tighter line-clamp-2 overflow-hidden min-h-[3.5rem] md:min-h-[4rem]">
                                            <Link to={`/actualites/${item.slug}`}>{item.title}</Link>
                                        </h3>
                                        <p className="text-slate-500 font-medium line-clamp-2 overflow-hidden mb-8 flex-grow leading-relaxed">{item.summary}</p>
                                        <Link to={`/actualites/${item.slug}`} className="inline-flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-widest group/btn">
                                            Lire Plus
                                            <div className="w-8 h-8 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary transition-all">
                                                <ArrowRight size={14} className="group-hover/btn:text-white transition-colors" />
                                            </div>
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            )
            }

            {/* Lightbox for Gallery (Ultra-Premium) */}
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

                        {/* Navigation Buttons - Enhanced Visibility */}
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
                                    key={selectedImage} // Re-animate on change
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    src={selectedImage}
                                    alt="Zoom immersive"
                                    className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                                />

                                {/* Caption if needed (News Detail usually has simpler images without titles per image, but just in case) */}
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
    );
};

export default NewsDetailPage;
