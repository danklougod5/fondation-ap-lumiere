import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, X, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { cachedFetch } from '../lib/cache';
import SEO from '../components/SEO';

// Sub-components
import ActionHero from '../components/action-detail/ActionHero';
import ActionTabs from '../components/action-detail/ActionTabs';
import ActionAbout from '../components/action-detail/ActionAbout';
import ActionGallery from '../components/action-detail/ActionGallery';
import ActionNews from '../components/action-detail/ActionNews';
import ActionDiscovery from '../components/action-detail/ActionDiscovery';
import ActionCTA from '../components/action-detail/ActionCTA';
import ActionVideo from '../components/action-detail/ActionVideo';

// Images de démonstration pour la galerie
const demoGalleryImages = [
    { id: 1, image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800', title: 'Distribution de fournitures scolaires' },
    { id: 2, image_url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800', title: 'Activités éducatives' },
    { id: 3, image_url: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800', title: 'Soutien aux communautés' },
    { id: 4, image_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800', title: 'Aide humanitaire' },
    { id: 5, image_url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800', title: 'Actions de solidarité' },
    { id: 6, image_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800', title: 'Moments de partage' }
];

const ActionDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [action, setAction] = useState(null);
    const [otherActions, setOtherActions] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [latestNews, setLatestNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAction();
        fetchOtherActions();
        fetchLatestNews();
    }, [slug]);

    useEffect(() => {
        if (action) {
            fetchGalleryImages();
        }
    }, [action]);

    const fetchAction = async () => {
        try {
            setLoading(true);
            const data = await cachedFetch(`action_detail_${slug}`, async () => {
                const { data, error } = await supabase
                    .from('actions')
                    .select('*')
                    .eq('slug', slug)
                    .single();
                if (error) throw error;
                return data;
            });

            if (!data) {
                setAction(null);
            } else {
                setAction(data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setAction(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchOtherActions = async () => {
        try {
            const data = await cachedFetch(`action_other_${slug}`, async () => {
                const { data, error } = await supabase
                    .from('actions')
                    .select('id, title, slug, icon, short_desc, image_url, video_url')
                    .neq('slug', slug)
                    .limit(3);
                if (error) throw error;
                return data || [];
            });

            if (data) {
                setOtherActions(data);
            }
        } catch (error) {
            console.error('Error fetching other actions:', error);
        }
    };

    const fetchGalleryImages = async () => {
        try {
            // Check if action has its own additional_images
            if (action && action.additional_images && action.additional_images.length > 0) {
                const formattedGallery = action.additional_images.map((url, index) => ({
                    id: `action-img-${index}`,
                    image_url: url,
                    title: `Moment capté - ${action.title}`
                }));
                setGalleryImages(formattedGallery);
                return;
            }

            // Fallback to general gallery
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .limit(6);

            if (!error && data && data.length > 0) {
                setGalleryImages(data);
            } else {
                setGalleryImages(demoGalleryImages);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
            setGalleryImages(demoGalleryImages);
        }
    };

    const fetchLatestNews = async () => {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('id, title, slug, image_url, created_at, summary, category')
                .order('created_at', { ascending: false })
                .limit(3);

            if (!error && data) {
                setLatestNews(data);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
                {/* Immersive Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[130px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[130px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative text-center z-10 px-6">
                    <div className="relative w-40 h-40 mx-auto mb-12">
                        {/* Glowing Atmosphere */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.2, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-[-40px] bg-accent/5 rounded-full blur-3xl"
                        />

                        {/* High-end Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-t-2 border-r-2 border-accent rounded-[3rem]"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border-b-2 border-l-2 border-primary rounded-[2.5rem] opacity-40"
                        />

                        {/* Heart Pulse Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Heart className="text-white w-12 h-12 md:w-16 md:h-16 opacity-30 fill-white/10" strokeWidth={1.5} />
                            </motion.div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="animate-spin text-accent w-24 h-24 opacity-10" strokeWidth={1} />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-white text-3xl md:text-5xl font-heading font-black tracking-tighter mb-4 uppercase">
                            Impact <span className="gradient-text">&</span> Solidarité
                        </h2>
                        <div className="flex items-center justify-center gap-4">
                            <span className="h-[1px] w-12 bg-white/20" />
                            <p className="text-accent font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
                                Chargement du domaine
                            </p>
                            <span className="h-[1px] w-12 bg-white/20" />
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (!action) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-primary-dark to-slate-900">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center px-4"
                >
                    <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                        <X size={48} className="text-red-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Action non trouvée</h1>
                    <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto">
                        Désolé, nous ne trouvons pas le domaine d'intervention que vous recherchez.
                    </p>
                    <Link
                        to="/#actions"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-accent to-emerald-400 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-accent/30 transition-all hover:-translate-y-1"
                    >
                        <ArrowLeft size={20} /> Retour aux actions
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={action.title}
                description={action.short_desc}
                image={action.image_url}
                url={`/actions/${action.slug}`}
                type="article"
            />
            <div className="min-h-screen bg-slate-50 overflow-x-hidden font-body">
                <ActionHero action={action} />

                <nav className="bg-white border-b border-gray-100 py-4 hidden md:block">
                    <div className="container mx-auto px-4">
                        <ol className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <li className="hover:text-primary transition-colors">
                                <Link to="/">Accueil</Link>
                            </li>
                            <ChevronRight size={12} strokeWidth={3} />
                            <li className="hover:text-primary transition-colors">
                                <Link to="/#actions">Domaines d'action</Link>
                            </li>
                            <ChevronRight size={12} strokeWidth={3} />
                            <li className="text-primary truncate max-w-[200px] sm:max-w-none">
                                {action.title}
                            </li>
                        </ol>
                    </div>
                </nav>

                <ActionTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <ActionAbout action={action} />

                {action.video_url && (
                    <ActionVideo videoUrl={action.video_url} title={action.title} />
                )}

                <ActionGallery
                    galleryImages={galleryImages}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                />

                <ActionNews latestNews={latestNews} />

                <ActionDiscovery otherActions={otherActions} />

                <ActionCTA />
            </div>
        </>
    );
};

export default ActionDetailPage;
