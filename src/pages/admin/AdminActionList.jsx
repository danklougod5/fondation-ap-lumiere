import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminActionList = () => {
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchActions();
    }, []);

    const fetchActions = async () => {
        try {
            const { data, error } = await supabase
                .from('actions')
                .select('id, title, created_at, icon, image_url, subtitle')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setActions(data);
        } catch (error) {
            console.error('Error fetching actions:', error);
            toast.error("Erreur lors du chargement des actions");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette action ?")) return;

        try {
            const { error } = await supabase.from('actions').delete().eq('id', id);
            if (error) throw error;
            setActions(actions.filter(item => item.id !== id));
            toast.success("Action supprimée avec succès");
        } catch (error) {
            console.error('Error deleting action:', error);
            toast.error("Erreur lors de la suppression");
        }
    };

    const filteredActions = actions.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">Mes Actions</h1>
                    <p className="text-gray-500">Gérez les domaines d'intervention et projets</p>
                </div>
                <Link
                    to="/admin/actions/new"
                    className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    Ajouter une action
                </Link>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher une action..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Rechercher une action"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Titre</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sous-titre</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredActions.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            {item.image_url && (
                                                <img src={item.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                            )}
                                            <span className="font-bold text-gray-900 line-clamp-1">{item.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-600 text-sm">
                                            {item.subtitle || '-'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/admin/actions/${item.id}`}
                                                className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredActions.length === 0 && (
                    <div className="p-12 text-center text-gray-400">
                        Aucune action trouvée.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminActionList;
