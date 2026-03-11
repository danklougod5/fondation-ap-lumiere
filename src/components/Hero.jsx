import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import { supabase } from '../lib/supabase';
import logger from '../lib/logger';
import { cachedFetch } from '../lib/cache';
import SeamlessImage from './SeamlessImage';
import SEO from './SEO';
import heroFallback from '../assets/imageFonAp.jpg';


const Hero = () => {
    const [dynamicBg, setDynamicBg] = React.useState(null);

    React.useEffect(() => {
        const fetchBg = async () => {
            try {
                const data = await cachedFetch('hero_bg_image', async () => {
                    const { data, error } = await supabase
                        .from('site_settings')
                        .select('value')
                        .eq('key', 'hero_bg_image')
                        .single();
                    if (error) throw error;
                    return data;
                }, 10 * 60 * 1000); // Cache 10 minutes

                if (data?.value) {
                    setDynamicBg(data.value);
                }
            } catch (error) {
                logger.error("Hero background fetch error:", error);
            }
        };
        fetchBg();
    }, []);

    return (
        <>
            <SEO
                title="Accueil"
                description="La Fondation AP Lumière d'Afrique s'engage à transformer la vie des plus vulnérables à travers l'éducation, la santé et la solidarité active. Objectif : Zéro enfant dans la rue d'ici 2030."
                url="/"
            />
            <section className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden bg-slate-900">
                {/* Background Image with Seamless Transition */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        className="w-full h-full opacity-50"
                    >
                        <SeamlessImage
                            src={dynamicBg}
                            fallback={heroFallback}
                            alt="Enfants en Afrique"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900" />
                </div>

                {/* Content Container */}
                <div className="container-custom relative z-10 pt-32 pb-12 lg:pt-20 lg:pb-0 h-full flex flex-col justify-center">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-accent mb-6 md:mb-8">
                                <Sparkles size={14} className="md:w-4 md:h-4" />
                                Éclairer l'avenir de l'Afrique
                            </div>

                            <h1 className="text-white mb-6 md:mb-8 text-4xl md:text-6xl lg:text-7xl leading-tight md:leading-tight">
                                Apporter de la <span className="gradient-text italic">Lumière</span> là où l'espoir s'efface
                            </h1>

                            <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-8 md:mb-12 leading-relaxed font-medium">
                                La Fondation AP Lumière d'Afrique s'engage à transformer la vie des plus vulnérables à travers l'éducation, la santé et la solidarité active.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                                <a
                                    href="https://moya-pay.com/p/pl_203zikdg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-accent w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 text-sm md:text-base flex items-center justify-center gap-2"
                                >
                                    <Heart size={18} fill="currentColor" />
                                    Faire un don
                                </a>
                                <Link to="/actions" className="btn-outline bg-transparent border-white/20 text-white hover:bg-white/10 w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 text-sm md:text-base">
                                    Découvrir nos actions
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </motion.div>


                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/4 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            </section>
        </>
    );
};

export default Hero;
