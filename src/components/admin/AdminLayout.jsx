import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import logger from '../../lib/logger';
import {
    LayoutDashboard, Newspaper, Heart, Settings, LogOut,
    Menu, X, Image as ImageIcon, Target
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
    const { signOut, user } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/admin/login');
        } catch (error) {
            logger.error("Erreur déconnexion:", error);
        }
    };

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Tableau de bord', exact: true },
        { path: '/admin/news', icon: Newspaper, label: 'Mes Actualités' },
        { path: '/admin/actions', icon: Heart, label: 'Mes Actions' },
        { path: '/admin/projects', icon: Target, label: 'Mes Projets' },
        { path: '/admin/settings', icon: Settings, label: 'Paramètres' },
    ];

    const isActive = (path, exact = false) => {
        if (exact) return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-slate-900 text-white z-50 transform lg:translate-x-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-8 border-b border-white/10 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black tracking-tight">AP Lumière</h2>
                        <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Administration</p>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.exact}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-6 py-4 rounded-xl transition-all font-medium
                                ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                                }
                            `}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-6 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-emerald-400 flex items-center justify-center font-bold text-white shadow-lg">
                            {user?.email?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold text-sm truncate">{user?.email}</p>
                            <p className="text-xs text-white/50">Administrateur</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-6 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium text-sm"
                    >
                        <LogOut size={18} />
                        Déconnexion
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30 lg:hidden">
                    <div className="px-4 h-16 flex items-center justify-between">
                        <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-600">
                            <Menu size={24} />
                        </button>
                        <span className="font-bold text-gray-900">Administration</span>
                        <div className="w-8" />
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
