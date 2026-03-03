import React from 'react';

const ActionQuickInfo = ({ formData, setFormData }) => {
    return (
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
    );
};

export default ActionQuickInfo;
