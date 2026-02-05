import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Sprout, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

import { supabase } from '../lib/supabase';

const Hero = () => {
    const [bgImage, setBgImage] = React.useState(null);

    React.useEffect(() => {
        const fetchBg = async () => {
            try {
                const { data } = await supabase
                    .from('site_settings')
                    .select('value')
                    .eq('key', 'hero_bg_image')
                    .single();

                if (data?.value) {
                    setBgImage(data.value);
                } else {
                    setBgImage("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80");
                }
            } catch (error) {
                setBgImage("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80");
            }
        };
        fetchBg();
    }, []);

    return (
        <section className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden bg-slate-900">
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0 z-0">
                {bgImage && (
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        className="w-full h-full"
                    >
                        <img
                            src={bgImage}
                            alt="Enfants en Afrique"
                            className="w-full h-full object-cover opacity-50"
                        />
                    </motion.div>
                )}
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

                    {/* Stats/Quick Features */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-24 border-t border-white/10 pt-8 md:pt-16"
                    >
                        <div className="flex items-center gap-4 group bg-white/5 sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                <Sprout size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h4 className="text-white text-base md:text-lg font-bold leading-tight">Croissance</h4>
                                <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-black mt-0.5 md:mt-1">Impact Durable</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group bg-white/5 sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <Globe size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h4 className="text-white text-base md:text-lg font-bold leading-tight">Afrique</h4>
                                <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-black mt-0.5 md:mt-1">Rayonnement Global</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group bg-white/5 sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                                <Heart size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h4 className="text-white text-base md:text-lg font-bold leading-tight">Solidarité</h4>
                                <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-black mt-0.5 md:mt-1">Cœur à l'Action</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
};

export default Hero;
