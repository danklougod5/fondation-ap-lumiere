import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import logger from '../../lib/logger';
import { Newspaper, Heart, Users, ArrowUpRight, Target, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        newsCount: 0,
        actionsCount: 0,
        projectsCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true });
            const { count: actionsCount } = await supabase.from('actions').select('*', { count: 'exact', head: true });
            const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });

            setStats({
                newsCount: newsCount || 0,
                actionsCount: actionsCount || 0,
                projectsCount: projectsCount || 0
            });
        } catch (error) {
            logger.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, icon: Icon, color, link, linkText }) => (
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} text-white shadow-lg`}>
                    <Icon size={28} />
                </div>
                {link && (
                    <Link to={link} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors bg-gray-50 px-3 py-1.5 rounded-full">
                        {linkText}
                        <ArrowUpRight size={14} />
                    </Link>
                )}
            </div>
            <div>
                <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider mb-2">{title}</h3>
                <p className="text-4xl font-black text-gray-900">{value}</p>
            </div>
        </div>
    );

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-3xl font-heading font-bold text-gray-900">Tableau de Bord</h1>
                <p className="text-gray-500">Bienvenue sur votre espace d'administration</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <StatCard
                    title="Actualités Publiées"
                    value={stats.newsCount}
                    icon={Newspaper}
                    color="bg-gradient-to-br from-blue-500 to-blue-600"
                    link="/admin/news"
                    linkText="Gérer"
                />
                <StatCard
                    title="Actions en Cours"
                    value={stats.actionsCount}
                    icon={Heart}
                    color="bg-gradient-to-br from-accent to-emerald-500"
                    link="/admin/actions"
                    linkText="Gérer"
                />
                {/* Placeholder for now */}
                <StatCard
                    title="Projets en cours"
                    value={stats.projectsCount}
                    icon={Target}
                    color="bg-gradient-to-br from-emerald-500 to-green-600"
                    link="/admin/projects"
                    linkText="Gérer"
                />
                <StatCard
                    title="Paramètres Site"
                    value="Images"
                    icon={Settings}
                    color="bg-gradient-to-br from-slate-600 to-slate-700"
                    link="/admin/settings"
                    linkText="Modifier"
                />
            </div>

            {/* Quick Actions or Help could go here */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-2xl font-bold mb-4">Besoin d'aide ?</h2>
                    <p className="text-white/70 mb-8 leading-relaxed">
                        Pour ajouter une nouvelle actualité, cliquez sur "Gérer" dans la carte Actualités, puis sur le bouton "Ajouter".
                        N'oubliez pas d'optimiser vos images avant de les télécharger pour garantir la rapidité du site.
                    </p>
                    <Link to="/admin/news/new" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                        Publier une actualité
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            </div>
        </div>
    );
};

export default AdminDashboard;
