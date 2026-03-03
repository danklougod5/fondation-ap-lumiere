import React from 'react';
import RichTextEditor from '../RichTextEditor';

const ActionBasicInfo = ({ formData, setFormData, isEditing, handleGenerateSlug }) => {
    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-bold text-gray-700 ml-1">Titre</label>
                    <input
                        id="title"
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
                    <label htmlFor="slug" className="text-sm font-bold text-gray-700 ml-1">Slug (URL)</label>
                    <input
                        id="slug"
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
                    <label htmlFor="subtitle" className="text-sm font-bold text-gray-700 ml-1">Sous-titre (Badge)</label>
                    <input
                        id="subtitle"
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                        placeholder="Ex: Santé, Éducation..."
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="icon" className="text-sm font-bold text-gray-700 ml-1">Icône representative</label>
                    <select
                        id="icon"
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
                <label htmlFor="short_desc" className="text-sm font-bold text-gray-700 ml-1">Description courte (Hero)</label>
                <textarea
                    id="short_desc"
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
    );
};

export default ActionBasicInfo;
