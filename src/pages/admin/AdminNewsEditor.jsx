import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Loader2, ArrowLeft, X } from 'lucide-react';
import toast from 'react-hot-toast';
import logger from '../../lib/logger';

import NewsBasicInfo from '../../components/admin/news-editor/NewsBasicInfo';
import NewsMediaSection from '../../components/admin/news-editor/NewsMediaSection';

const AdminNewsEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Événement',
        date: new Date().toISOString().split('T')[0],
        image_url: '',
        video_url: '',
        additional_images: []
    });

    useEffect(() => {
        if (isEditing) {
            fetchNews();
        }
    }, [id]);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.title || '',
                    slug: data.slug || '',
                    excerpt: data.summary || '', // Database column is likely 'summary' based on NewsDetailPage
                    content: data.content || '',
                    category: data.category || 'Événement',
                    date: data.date || new Date().toISOString().split('T')[0],
                    image_url: data.image_url || '',
                    video_url: data.video_url || '',
                    additional_images: data.additional_images || []
                });
            }
        } catch (error) {
            logger.error('Error fetching news:', error);
            toast.error("Impossible de charger l'article");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
            .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dashes
            .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
        setFormData({ ...formData, slug });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSave = {
                title: formData.title,
                slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-'),
                summary: formData.excerpt,
                content: formData.content,
                category: formData.category,
                date: formData.date,
                image_url: formData.image_url,
                video_url: formData.video_url,
                additional_images: formData.additional_images
            };

            if (isEditing) {
                const { error } = await supabase
                    .from('news')
                    .update(dataToSave)
                    .eq('id', id);
                if (error) throw error;
                toast.success("Actualité mise à jour");
            } else {
                const { error } = await supabase
                    .from('news')
                    .insert([dataToSave]);
                if (error) throw error;
                toast.success("Actualité créée avec succès");
            }
            navigate('/admin/news');

        } catch (error) {
            logger.error('Error saving news:', error);
            toast.error("Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (url) => {
        setFormData(prev => ({ ...prev, image_url: url }));
    };

    const handleVideoUpload = (url) => {
        setFormData(prev => ({ ...prev, video_url: url }));
    };

    const handleAdditionalImagesUpload = (urls) => { // Expecting array here if multiple
        // But dropzone might return array even for single drag. 
        // My ImageUpload component handles 'multiple' by returning array.
        // Let's verify ImageUpload implementation.
        // It calls onUpload(urls) if multiple=true.
        setFormData(prev => ({
            ...prev,
            additional_images: [...prev.additional_images, ...urls]
        }));
    };

    const removeAdditionalImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            additional_images: prev.additional_images.filter((_, idx) => idx !== indexToRemove)
        }));
    };

    if (loading && isEditing && !formData.title) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/admin/news')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={24} className="text-gray-500" />
                </button>
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">
                        {isEditing ? 'Modifier l\'actualité' : 'Nouvelle actualité'}
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <NewsBasicInfo
                    formData={formData}
                    setFormData={setFormData}
                    isEditing={isEditing}
                    handleGenerateSlug={handleGenerateSlug}
                />

                <NewsMediaSection
                    formData={formData}
                    handleImageUpload={handleImageUpload}
                    handleAdditionalImagesUpload={handleAdditionalImagesUpload}
                    removeAdditionalImage={removeAdditionalImage}
                />

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/news')}
                        className="px-8 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminNewsEditor;
