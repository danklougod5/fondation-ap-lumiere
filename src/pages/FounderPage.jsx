import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Quote, Music, User, Globe, Heart, Award, Facebook, Instagram } from 'lucide-react';
import SEO from '../components/SEO';

import { supabase } from '../lib/supabase';
import SeamlessImage from '../components/SeamlessImage';

const FounderPage = () => {
    const [dynamicProfile, setDynamicProfile] = React.useState(null);

    React.useEffect(() => {
        const fetchProfile = async () => {
            const { data } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'founder_profile_image')
                .single();
            if (data?.value) {
                setDynamicProfile(data.value);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white">
            <SEO
                title="Le Fondateur"
                description="Découvrez le parcours de Stéphane Agbré (Apoutchou National), fondateur de la Fondation AP Lumière d'Afrique."
                url="/fondateur"
            />
            {/* Hero Section */}
            <section className="relative h-[60vh] overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                <div className="container-custom relative h-full flex flex-col justify-end pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-white/10">
                            <User size={14} />
                            Le Fondateur
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
                            Apoutchou <span className="text-primary italic">National</span>
                        </h1>
                        <p className="text-xl text-slate-300 font-medium max-w-2xl">
                            Stéphane Agbré, une voix pour les sans-voix, un cœur dédié à l'Afrique.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Profile Section */}
            <section className="py-24 relative">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Image Sidebar */}
                        <div className="w-full lg:w-1/3">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="sticky top-32"
                            >
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                                    <div className="aspect-[3/4]">
                                        <SeamlessImage
                                            src={dynamicProfile}
                                            alt="Stéphane Agbré"
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4 bg-primary text-white p-3 rounded-2xl shadow-lg">
                                        <Sparkles size={24} />
                                    </div>
                                </div>
                                <div className="mt-8 space-y-4">
                                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                        <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Informations Clés</h4>
                                        <ul className="space-y-4">
                                            <li className="flex items-center gap-3 text-slate-600">
                                                <Globe size={18} className="text-primary" />
                                                <span>Origine: Man, Côte d'Ivoire</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-600">
                                                <Award size={18} className="text-primary" />
                                                <span>Ambassadeur COCAN 2024</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-600">
                                                <Music size={18} className="text-primary" />
                                                <span>Artiste Chanteur</span>
                                            </li>
                                            <li className="flex flex-col gap-3 text-slate-600 pt-4 border-t border-slate-100">
                                                <span className="font-bold text-xs uppercase tracking-wider">Suivre Apoutchou</span>
                                                <div className="flex items-center gap-3">
                                                    <a href="https://www.facebook.com/apoutchounational/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                                                        <Facebook size={14} />
                                                    </a>
                                                    <a href="https://www.instagram.com/apoutchou_national_24/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-colors">
                                                        <Instagram size={14} />
                                                    </a>
                                                    <a href="https://www.tiktok.com/@apoutchou_national1" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                                                        <Music size={14} />
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Content */}
                        <div className="w-full lg:w-2/3 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed"
                            >
                                <h2 className="text-3xl font-black text-slate-900 mb-6">Un Parcours de Résilience</h2>
                                <p>
                                    Né Stéphane Agbré le 24 décembre 1990 à Man, l'homme que l'Afrique connaît aujourd'hui sous le nom de <strong>Apoutchou National</strong> est bien plus qu'une personnalité des réseaux sociaux. Fils de la célèbre actrice ivoirienne Bleu Brigitte, il a su transformer sa notoriété en un puissant levier de changement social.
                                </p>
                                <p>
                                    Son parcours est marqué par une détermination sans faille. Parti de rien, il a d'abord conquis le monde numérique en tant que cyber-activiste influent, avant de se lancer avec succès dans la musique avec son album "Lumière". Ce titre n'est pas fortuit : il reflète sa volonté d'éclairer le chemin pour ceux qui sont dans l'obscurité du besoin.
                                </p>

                                <div className="my-12 relative p-8 bg-primary/5 rounded-[2rem] border border-primary/10">
                                    <Quote className="absolute top-6 left-6 text-primary/20 w-12 h-12" />
                                    <blockquote className="relative z-10 text-2xl font-bold text-slate-900 italic leading-snug">
                                        "Ma plus grande réussite n'est pas le nombre de vues sur mes vidéos, mais le nombre de sourires que nous pouvons redonner aux enfants et aux veuves de notre continent."
                                    </blockquote>
                                </div>

                                <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">L'Engagement Humanitaire</h2>
                                <p>
                                    Conscient des réalités difficiles que traversent de nombreuses familles africaines, Stéphane Agbré a fait le choix de l'action concrète. La création de la <strong>Fondation AP Lumière d'Afrique</strong> en décembre 2025 est l'aboutissement de cet engagement.
                                </p>
                                <p>
                                    Pour lui, la fondation n'est pas seulement une institution, c'est une mission de vie. Son objectif est clair : offrir une seconde chance à la jeunesse, soutenir l'éducation et apporter un soulagement aux personnes vulnérables. En tant qu'ambassadeur de la COCAN 2024, il continue de porter haut les couleurs de la Côte d'Ivoire tout en œuvrant dans l'ombre pour le bien-être de ses concitoyens.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                                    <div className="p-8 rounded-[2rem] bg-slate-900 text-white flex flex-col gap-4">
                                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                            <Heart className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Cœur Solidaire</h3>
                                        <p className="text-slate-400 text-sm">
                                            Dédié à l'amélioration des conditions de vie des orphelins et des veuves à travers l'Afrique.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2rem] bg-primary text-white flex flex-col gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                            <Globe size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Vision Africaine</h3>
                                        <p className="text-white/80 text-sm">
                                            Un projet qui dépasse les frontières pour unir la jeunesse africaine autour de valeurs fortes.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    );
};

export default FounderPage;
