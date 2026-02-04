import React from 'react';
import { Heart, Camera, Newspaper, Sparkles } from 'lucide-react';

const ActionTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'about', label: 'À propos', icon: Heart },
        { id: 'gallery', label: 'Galerie Photos', icon: Camera },
        { id: 'news', label: 'Actualités', icon: Newspaper },
        { id: 'discover', label: 'Autres Domaines', icon: Sparkles }
    ];

    return (
        <section className="sticky top-[64px] md:top-[72px] z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm overflow-hidden">
            <div className="container mx-auto px-0 sm:px-4">
                <nav className="flex gap-1 py-3 px-4 sm:px-0 overflow-x-auto hide-scrollbar scroll-smooth">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                document.getElementById(`${tab.id}-section`)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/20'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
        </section>
    );
};

export default ActionTabs;
