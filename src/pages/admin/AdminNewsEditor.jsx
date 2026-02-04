import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Loader2, ArrowLeft, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '../../components/admin/ImageUpload';
import VideoUpload from '../../components/admin/VideoUpload';
import RichTextEditor from '../../components/admin/RichTextEditor';

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
            console.error('Error fetching news:', error);
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
            .replace(/(^-|-$)+/g, ''); // remove leading/trailing dashes
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
            console.error('Error saving news:', error);
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
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Titre</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                onBlur={!isEditing && !formData.slug ? handleGenerateSlug : undefined}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="Titre de l'article"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Slug (URL)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-500"
                                placeholder="titre-de-l-article"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Résumé</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium min-h-[100px]"
                            placeholder="Court résumé visible dans la liste..."
                        />
                    </div>

                    <RichTextEditor
                        label="Contenu"
                        value={formData.content}
                        onChange={(value) => setFormData({ ...formData, content: value })}
                        placeholder="Contenu complet de l'article..."
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Date de l'événement / publication</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Catégorie</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                            >
                                <option value="Événement">Événement</option>
                                <option value="Action">Action</option>
                                <option value="Communiqué">Communiqué</option>
                                <option value="Témoignage">Témoignage</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-8">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Médias</h2>

                    <ImageUpload
                        label="Photo Principale"
                        currentImage={formData.image_url}
                        onUpload={handleImageUpload}
                    />

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Option 1 : Lien Vidéo Externe (YouTube, Vimeo...)</label>
                            <input
                                type="url"
                                value={formData.video_url}
                                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                        </div>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-gray-300">
                                <span className="bg-white px-4">Ou</span>
                            </div>
                        </div>

                        <VideoUpload
                            label="Option 2 : Importer une vidéo directement"
                            currentVideo={formData.video_url && !formData.video_url.includes('youtube') && !formData.video_url.includes('vimeo') ? formData.video_url : null}
                            onUpload={handleVideoUpload}
                            onScreenshot={handleImageUpload}
                            hasImage={!!formData.image_url}
                        />

                        <p className="text-xs text-gray-400 ml-1 italic italic">
                            Afin d'économiser votre espace Supabase, privilégiez les liens YouTube ou compressez vos vidéos avant l'import (max 50MB).
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-4">Autres Photos (Galerie)</label>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {formData.additional_images.map((img, idx) => (
                                <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeAdditionalImage(idx)}
                                        className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <ImageUpload
                            label={formData.additional_images.length > 0 ? "Ajouter d'autres photos" : "Ajouter des photos"}
                            multiple={true}
                            onUpload={handleAdditionalImagesUpload}
                        />
                    </div>
                </div>

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
