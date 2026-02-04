import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, X, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

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
            const { data, error } = await supabase
                .from('actions')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error || !data) {
                console.error('Error fetching action:', error);
                setAction(null);
            } else {
                setAction(data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOtherActions = async () => {
        try {
            const { data, error } = await supabase
                .from('actions')
                .select('id, title, slug, icon, short_desc, image_url, video_url')
                .neq('slug', slug)
                .limit(3);

            if (!error && data) {
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-primary-dark to-slate-900">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-accent/20 rounded-full animate-ping absolute inset-0"></div>
                        <Loader2 className="animate-spin text-accent w-20 h-20 relative" />
                    </div>
                    <p className="text-white/60 mt-6 font-medium">Chargement...</p>
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
    );
};

export default ActionDetailPage;
