import React from 'react';
import RichTextEditor from '../RichTextEditor';

const NewsBasicInfo = ({ formData, setFormData, isEditing, handleGenerateSlug }) => {
    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="news-title" className="text-sm font-bold text-gray-700 ml-1">Titre</label>
                    <input
                        id="news-title"
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
                    <label htmlFor="news-slug" className="text-sm font-bold text-gray-700 ml-1">Slug (URL)</label>
                    <input
                        id="news-slug"
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
                <label htmlFor="news-excerpt" className="text-sm font-bold text-gray-700 ml-1">Résumé</label>
                <textarea
                    id="news-excerpt"
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
                    <label htmlFor="news-date" className="text-sm font-bold text-gray-700 ml-1">Date de l'événement / publication</label>
                    <input
                        id="news-date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="news-category" className="text-sm font-bold text-gray-700 ml-1">Catégorie</label>
                    <select
                        id="news-category"
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
    );
};

export default NewsBasicInfo;
