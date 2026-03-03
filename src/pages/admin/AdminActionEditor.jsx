import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Loader2, ArrowLeft, X, Plus, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '../../components/admin/ImageUpload';
import VideoUpload from '../../components/admin/VideoUpload';
import RichTextEditor from '../../components/admin/RichTextEditor';

import ActionBasicInfo from '../../components/admin/action-editor/ActionBasicInfo';
import ActionImpactStats from '../../components/admin/action-editor/ActionImpactStats';
import ActionQuickInfo from '../../components/admin/action-editor/ActionQuickInfo';
import ActionDynamicLists from '../../components/admin/action-editor/ActionDynamicLists';
import ActionMediaSection from '../../components/admin/action-editor/ActionMediaSection';

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
                <ActionBasicInfo
                    formData={formData}
                    setFormData={setFormData}
                    isEditing={isEditing}
                    handleGenerateSlug={handleGenerateSlug}
                />

                <ActionImpactStats
                    formData={formData}
                    setFormData={setFormData}
                />

                <ActionQuickInfo
                    formData={formData}
                    setFormData={setFormData}
                />

                <ActionDynamicLists
                    objectives={formData.objectives}
                    newObjective={newObjective}
                    setNewObjective={setNewObjective}
                    addObjective={addObjective}
                    removeObjective={removeObjective}
                    upcomingProjects={formData.upcoming_projects}
                    newProject={newProject}
                    setNewProject={setNewProject}
                    addProject={addProject}
                    removeProject={removeProject}
                />

                <ActionMediaSection
                    formData={formData}
                    handleImageUpload={handleImageUpload}
                    handleVideoUpload={handleVideoUpload}
                    handleAdditionalImagesUpload={handleAdditionalImagesUpload}
                    removeAdditionalImage={removeAdditionalImage}
                />

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
