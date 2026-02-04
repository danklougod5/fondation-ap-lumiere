import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Loader2, ArrowLeft, Target, Layout } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '../../components/admin/ImageUpload';
import VideoUpload from '../../components/admin/VideoUpload';
import RichTextEditor from '../../components/admin/RichTextEditor';

const AdminProjectEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        image_url: '',
        video_url: '',
        progress: 0,
        is_featured: false
    });

    useEffect(() => {
        if (isEditing) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.title || '',
                    slug: data.slug || '',
                    description: data.description || '',
                    image_url: data.image_url || '',
                    video_url: data.video_url || '',
                    progress: data.progress || 0,
                    is_featured: data.is_featured || false
                });
            }
        } catch (error) {
            console.error('Error fetching project:', error);
            toast.error("Impossible de charger le projet");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        setFormData({ ...formData, slug });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSave = {
                ...formData
            };

            if (isEditing) {
                const { error } = await supabase
                    .from('projects')
                    .update(dataToSave)
                    .eq('id', id);
                if (error) throw error;
                toast.success("Projet mis à jour");
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([dataToSave]);
                if (error) throw error;
                toast.success("Projet créé avec succès");
            }
            navigate('/admin/projects');

        } catch (error) {
            console.error('Error saving project:', error);
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

    if (loading && isEditing && !formData.title) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/admin/projects')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={24} className="text-gray-500" />
                </button>
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">
                        {isEditing ? 'Modifier le projet' : 'Nouveau projet'}
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Titre du projet</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                onBlur={!isEditing && !formData.slug ? handleGenerateSlug : undefined}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="Ex: Construction d'une école à..."
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
                                placeholder="nom-du-projet"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Progression (%)</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                                    className="flex-1 accent-emerald-500"
                                />
                                <span className="font-bold text-emerald-500 w-12">{formData.progress}%</span>
                            </div>
                        </div>
                        <div className="flex items-end pb-1 px-1">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_featured}
                                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                        className="sr-only"
                                    />
                                    <div className={`w-12 h-6 rounded-full transition-colors ${formData.is_featured ? 'bg-primary' : 'bg-gray-200'}`} />
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.is_featured ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                                <span className="text-sm font-bold text-gray-700">Mettre en avant (Prioritaire)</span>
                            </label>
                        </div>
                    </div>

                    <RichTextEditor
                        label="Description"
                        value={formData.description}
                        onChange={(value) => setFormData({ ...formData, description: value })}
                        placeholder="Décrivez les objectifs et l'état actuel du projet..."
                    />

                    <div className="grid md:grid-cols-2 gap-8">
                        <ImageUpload
                            label="Image du projet (Thumbnail)"
                            currentImage={formData.image_url}
                            onUpload={handleImageUpload}
                        />

                        <VideoUpload
                            label="Vidéo du projet (Background)"
                            currentVideo={formData.video_url}
                            onUpload={handleVideoUpload}
                            onScreenshot={handleImageUpload}
                            hasImage={!!formData.image_url}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/projects')}
                        className="px-8 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Enregistrer le projet
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProjectEditor;
