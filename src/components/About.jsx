import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Quote, History, MapPin } from 'lucide-react';

import { supabase } from '../lib/supabase';

const About = () => {
    const [dynamicImages, setDynamicImages] = React.useState({
        main: null,
        founder: null
    });

    React.useEffect(() => {
        const fetchImages = async () => {
            const { data } = await supabase
                .from('site_settings')
                .select('key, value')
                .in('key', ['about_main_image', 'about_founder_image']);

            if (data) {
                const updates = {};
                data.forEach(item => {
                    if (item.key === 'about_main_image') updates.main = item.value;
                    if (item.key === 'about_founder_image') updates.founder = item.value;
                });
                setDynamicImages(updates);
            }
        };
        fetchImages();
    }, []);

    return (
        <section id="about" className="section-padding bg-slate-50 relative overflow-hidden">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>

            <div className="container-custom">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Main Image Frame */}
                            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 h-[500px] lg:h-[600px] bg-slate-200">
                                {dynamicImages.main ? (
                                    <img
                                        src={dynamicImages.main}
                                        alt="Fondation AP Lumière d'Afrique Action"
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                        loading="eager"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
                            </div>

                            {/* Floating Stats - Now Seamless */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-10 -right-10 w-48 h-48 bg-white p-3 rounded-[2rem] shadow-2xl z-20 hidden md:block border border-slate-100"
                            >
                                <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-slate-100">
                                    {dynamicImages.founder ? (
                                        <img
                                            src={dynamicImages.founder}
                                            alt="Fondateur Apoutchou"
                                            className="w-full h-full object-cover"
                                            loading="eager"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse" />
                                    )}
                                </div>
                            </motion.div>

                            {/* Background Elements */}
                            <div className="absolute top-10 -left-10 w-full h-full border-2 border-primary/10 rounded-[3rem] -z-10 rotate-3"></div>
                        </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-primary/20">
                                <History size={14} />
                                Notre Histoire
                            </div>
                            <h2 className="mb-8">
                                Porter la <span className="text-primary italic">Lumière</span> là où le besoin est réel
                            </h2>

                            <div className="space-y-6 text-slate-500 text-lg font-medium leading-relaxed">
                                <p>
                                    La Fondation AP Lumière d'Afrique est née de la vision de{' '}
                                    <Link to="/fondateur" className="text-primary hover:text-accent font-bold transition-colors">
                                        Apoutchou National (Stéphane Agbré)
                                    </Link>,
                                    officiellement inaugurée le 3 décembre 2025 à Abidjan.
                                </p>
                                <p>
                                    Touché par les défis auxquels fait face la jeunesse africaine, le fondateur a souhaité créer une structure
                                    capable d'apporter une aide concrète et durable. Notre mission est d'éclairer l'avenir des plus vulnérables.
                                </p>

                                <div className="relative py-10">
                                    <Quote className="absolute top-0 left-0 text-accent/20 w-16 h-16 -ml-4 -mt-4" />
                                    <blockquote className="relative z-10 text-2xl font-black font-heading text-slate-900 leading-snug italic">
                                        "Là où brille la lumière, renaît l'espérance. Chaque geste compte, chaque vie compte."
                                    </blockquote>
                                </div>

                                {/* Key Highlights */}
                                <div className="grid grid-cols-2 gap-8 pt-4">
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm border border-slate-100 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                            <History size={24} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-slate-900 leading-none">2025</p>
                                            <p className="text-xs uppercase tracking-widest font-bold mt-1">Fondation</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm border border-slate-100 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-slate-900 leading-none">Abidjan</p>
                                            <p className="text-xs uppercase tracking-widest font-bold mt-1">Siège Social</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
