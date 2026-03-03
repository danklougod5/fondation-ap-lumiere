import React from 'react';

const ActionImpactStats = ({ formData, setFormData }) => {
    return (
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
    );
};

export default ActionImpactStats;
