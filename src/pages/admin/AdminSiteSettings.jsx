import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, Sparkles, Image as ImageIcon, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '../../components/admin/ImageUpload';

const AdminSiteSettings = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        hero_bg_image: '',
        about_main_image: '',
        about_founder_image: '',
        founder_profile_image: ''
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('site_settings')
                .select('*');

            if (error) {
                // If table doesn't exist, we'll handle it gracefully
                if (error.code === 'PGRST116' || error.message.includes('relation "site_settings" does not exist')) {
                    console.warn('Table site_settings does not exist yet.');
                } else {
                    throw error;
                }
            }

            if (data) {
                const settingsMap = {};
                data.forEach(item => {
                    if (item.key !== '__proto__' && item.key !== 'constructor' && item.key !== 'prototype') {
                        settingsMap[item.key] = item.value;
                    }
                });
                setSettings(prev => ({ ...prev, ...settingsMap }));
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            toast.error("Impossible de charger les paramètres");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const updates = Object.entries(settings).map(([key, value]) => ({
                key,
                value,
                updated_at: new Date().toISOString()
            }));

            // Using upsert to update if exists, insert if not
            const { error } = await supabase
                .from('site_settings')
                .upsert(updates, { onConflict: 'key' });

            if (error) throw error;
            toast.success("Paramètres mis à jour avec succès");
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error("Erreur lors de l'enregistrement");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-heading font-bold text-gray-900">Paramètres du Site</h1>
                <p className="text-gray-500">Personnalisez les images des sections principales de votre site</p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8 flex gap-4 text-blue-800">
                <Info className="shrink-0" size={24} />
                <p className="text-sm">
                    <strong>Note:</strong> Si vous venez de créer cette section, assurez-vous d'avoir exécuté le script SQL pour créer la table <code>site_settings</code> dans votre console Supabase.
                </p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Hero Section */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                        <Sparkles className="text-primary" size={24} />
                        <h2 className="text-xl font-bold text-gray-900">Section Hero (Accueil)</h2>
                    </div>

                    <ImageUpload
                        label="Image de fond (Hero)"
                        currentImage={settings.hero_bg_image}
                        onUpload={(url) => setSettings({ ...settings, hero_bg_image: url })}
                    />
                </div>

                {/* About Section */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-8">
                    <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                        <ImageIcon className="text-primary" size={24} />
                        <h2 className="text-xl font-bold text-gray-900">Section À Propos</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ImageUpload
                            label="Image Principale (Bâtiment/Action)"
                            currentImage={settings.about_main_image}
                            onUpload={(url) => setSettings({ ...settings, about_main_image: url })}
                        />
                        <ImageUpload
                            label="Petite Image (Portrait Fondateur)"
                            currentImage={settings.about_founder_image}
                            onUpload={(url) => setSettings({ ...settings, about_founder_image: url })}
                        />
                    </div>
                </div>

                {/* Founder Page */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                        <ImageIcon className="text-primary" size={24} />
                        <h2 className="text-xl font-bold text-gray-900">Page du Fondateur</h2>
                    </div>

                    <ImageUpload
                        label="Photo de profil du fondateur (Biographie)"
                        currentImage={settings.founder_profile_image}
                        onUpload={(url) => setSettings({ ...settings, founder_profile_image: url })}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-70"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Enregistrer les modifications
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminSiteSettings;
