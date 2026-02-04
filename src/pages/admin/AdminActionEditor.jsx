import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Loader2, ArrowLeft, X, Plus, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '../../components/admin/ImageUpload';
import VideoUpload from '../../components/admin/VideoUpload';
import RichTextEditor from '../../components/admin/RichTextEditor';

const AdminActionEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        subtitle: '',
        short_desc: '',
        description: '',
        icon: 'Heart',
        image_url: '',
        video_url: '',
        additional_images: [],
        upcoming_projects: [],
        objectives: [],
        impact_vies: '0+',
        impact_projets: '0',
        impact_regions: '0',
        info_status: 'Actif',
        info_location: 'Cameroun',
        info_since: '2020'
    });

    const [newProject, setNewProject] = useState('');
    const [newObjective, setNewObjective] = useState('');

    useEffect(() => {
        if (isEditing) {
            fetchAction();
        }
    }, [id]);

    const fetchAction = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('actions')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.title || '',
                    slug: data.slug || '',
                    subtitle: data.subtitle || '',
                    short_desc: data.short_desc || '',
                    description: data.description || '',
                    icon: data.icon || 'Heart',
                    image_url: data.image_url || '',
                    video_url: data.video_url || '',
                    additional_images: data.additional_images || [],
                    upcoming_projects: data.upcoming_projects || [],
                    objectives: data.objectives || [],
                    impact_vies: data.impact_vies || '0+',
                    impact_projets: data.impact_projets || '0',
                    impact_regions: data.impact_regions || '0',
                    info_status: data.info_status || 'Actif',
                    info_location: data.info_location || 'Cameroun',
                    info_since: data.info_since || '2020'
                });
            }
        } catch (error) {
            console.error('Error fetching action:', error);
            toast.error("Impossible de charger l'action");
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
                title: formData.title,
                slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-'),
                subtitle: formData.subtitle,
                short_desc: formData.short_desc,
                description: formData.description,
                icon: formData.icon,
                image_url: formData.image_url,
                video_url: formData.video_url,
                additional_images: formData.additional_images,
                upcoming_projects: formData.upcoming_projects,
                objectives: formData.objectives,
                impact_vies: formData.impact_vies,
                impact_projets: formData.impact_projets,
                impact_regions: formData.impact_regions,
                info_status: formData.info_status,
                info_location: formData.info_location,
                info_since: formData.info_since
            };

            if (isEditing) {
                const { error } = await supabase
                    .from('actions')
                    .update(dataToSave)
                    .eq('id', id);
                if (error) throw error;
                toast.success("Action mise à jour");
            } else {
                const { error } = await supabase
                    .from('actions')
                    .insert([dataToSave]);
                if (error) throw error;
                toast.success("Action créée avec succès");
            }
            navigate('/admin/actions');

        } catch (error) {
            console.error('Error saving action:', error);
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

    const handleAdditionalImagesUpload = (urls) => {
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

    // --- Dynamic Lists Handlers ---
    const addProject = () => {
        if (!newProject.trim()) return;
        setFormData(prev => ({
            ...prev,
            upcoming_projects: [...prev.upcoming_projects, newProject.trim()]
        }));
        setNewProject('');
    };

    const removeProject = (index) => {
        setFormData(prev => ({
            ...prev,
            upcoming_projects: prev.upcoming_projects.filter((_, idx) => idx !== index)
        }));
    };

    const addObjective = () => {
        if (!newObjective.trim()) return;
        setFormData(prev => ({
            ...prev,
            objectives: [...prev.objectives, newObjective.trim()]
        }));
        setNewObjective('');
    };

    const removeObjective = (index) => {
        setFormData(prev => ({
            ...prev,
            objectives: prev.objectives.filter((_, idx) => idx !== index)
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
                <button onClick={() => navigate('/admin/actions')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={24} className="text-gray-500" />
                </button>
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">
                        {isEditing ? 'Modifier l\'action' : 'Nouvelle action'}
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
                                placeholder="Nom de l'action"
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
                                placeholder="nom-de-l-action"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Sous-titre (Badge)</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="Ex: Santé, Éducation..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Icône representative</label>
                            <select
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                            >
                                <option value="Heart">Cœur (Solidarité)</option>
                                <option value="GraduationCap">Diplôme (Éducation)</option>
                                <option value="HeartPulse">Pouls (Santé)</option>
                                <option value="ShieldAlert">Bouclier (Protection)</option>
                                <option value="Hammer">Marteau (Construction)</option>
                                <option value="Users">Groupe (Social)</option>
                                <option value="Sprout">Pousse (Écologie)</option>
                                <option value="Rocket">Fusée (Innovation)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Description courte (Hero)</label>
                        <textarea
                            value={formData.short_desc}
                            onChange={(e) => setFormData({ ...formData, short_desc: e.target.value })}
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium min-h-[80px]"
                            placeholder="Phrase d'accroche visible sur la bannière..."
                        />
                    </div>

                    <RichTextEditor
                        label="Description détaillée"
                        value={formData.description}
                        onChange={(value) => setFormData({ ...formData, description: value })}
                        placeholder="Le détail complet du projet..."
                    />
                </div>

                {/* Impact Stats Card */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Statistiques d'Impact</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Vies impactées</label>
                            <input
                                type="text"
                                value={formData.impact_vies}
                                onChange={(e) => setFormData({ ...formData, impact_vies: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="Ex: 500+"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Projets réalisés</label>
                            <input
                                type="text"
                                value={formData.impact_projets}
                                onChange={(e) => setFormData({ ...formData, impact_projets: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="Ex: 12"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Régions couvertes</label>
                            <input
                                type="text"
                                value={formData.impact_regions}
                                onChange={(e) => setFormData({ ...formData, impact_regions: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="Ex: 3"
                            />
                        </div>
                    </div>
                </div>

                {/* Quick Info Card */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Informations Rapides</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Statut</label>
                            <input
                                type="text"
                                value={formData.info_status}
                                onChange={(e) => setFormData({ ...formData, info_status: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="Ex: Actif"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Région / Localisation</label>
                            <input
                                type="text"
                                value={formData.info_location}
                                onChange={(e) => setFormData({ ...formData, info_location: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="Ex: Cameroun"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Depuis (Année)</label>
                            <input
                                type="text"
                                value={formData.info_since}
                                onChange={(e) => setFormData({ ...formData, info_since: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="Ex: 2020"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Objectives List */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 h-full">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Objectifs</h2>
                        <ul className="space-y-3 mb-6">
                            {formData.objectives.map((obj, idx) => (
                                <li key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                                    <span className="flex-1 text-sm font-medium text-gray-700">{obj}</span>
                                    <button type="button" onClick={() => removeObjective(idx)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newObjective}
                                onChange={(e) => setNewObjective(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                                placeholder="Nouvel objectif..."
                                className="flex-1 px-4 py-2 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                            <button type="button" onClick={addObjective} className="bg-gray-900 text-white p-2 rounded-xl hover:bg-black"><Plus size={20} /></button>
                        </div>
                    </div>

                    {/* Upcoming Projects List */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 h-full">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Projets en Cours</h2>
                        <ul className="space-y-3 mb-6">
                            {formData.upcoming_projects.map((proj, idx) => (
                                <li key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                                    <span className="flex-1 text-sm font-medium text-gray-700">{proj}</span>
                                    <button type="button" onClick={() => removeProject(idx)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newProject}
                                onChange={(e) => setNewProject(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addProject())}
                                placeholder="Nouveau projet en cours..."
                                className="flex-1 px-4 py-2 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                            <button type="button" onClick={addProject} className="bg-gray-900 text-white p-2 rounded-xl hover:bg-black"><Plus size={20} /></button>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-8">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Médias</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ImageUpload
                            label="Photo Principale (Bannière)"
                            currentImage={formData.image_url}
                            onUpload={handleImageUpload}
                        />

                        <VideoUpload
                            label="Vidéo (Background)"
                            currentVideo={formData.video_url}
                            onUpload={handleVideoUpload}
                            onScreenshot={handleImageUpload}
                            hasImage={!!formData.image_url}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-4">Galerie Photos</label>

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
                        onClick={() => navigate('/admin/actions')}
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

export default AdminActionEditor;
