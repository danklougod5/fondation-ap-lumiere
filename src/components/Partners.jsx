import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Partners = () => {
    // Using typographic logos since we don't have official SVGs, 
    // creating a consistent and premium look.
    const partners = [
        { name: "Ministère de la Solidarité" },
        { name: "Fondation Magic System" },
        { name: "Roi 12-12" },
        { name: "Mairie de Cocody" },
    ];

    // Double the list for seamless infinite scroll
    const marqueeList = [...partners, ...partners];

    return (
        <section className="py-24 bg-slate-900 overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-slate-900 to-transparent z-10"></div>

            <div className="container-custom relative z-20 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-4 block">
                        Partenaires Officiels
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white font-heading">
                        ILS NOUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">SOUTIENNENT</span>
                    </h2>
                </motion.div>
            </div>

            {/* Infinite Marquee */}
            <div className="relative w-full overflow-hidden py-10">
                <motion.div
                    className="flex gap-16 md:gap-24 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {marqueeList.map((partner, index) => (
                        <div key={`${partner.name}-${index}`} className="flex items-center group cursor-default">
                            {/* Text Logo */}
                            <span className="text-2xl md:text-3xl font-black text-white/30 whitespace-nowrap group-hover:text-white transition-colors duration-300 font-heading tracking-tight">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* CTA Section */}
            <div className="container-custom relative z-20 mt-16 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-accent rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <Link
                        to="/contact"
                        className="relative px-8 py-4 bg-slate-800 rounded-full leading-none flex items-center gap-4 border border-white/10 hover:bg-slate-800/80 transition-colors"
                    >
                        <span className="text-slate-200 font-medium">
                            Rejoignez la communauté des <span className="text-white font-black text-lg">"Missionnaires"</span> d'Apoutchou National
                        </span>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
                            <Heart size={16} fill="currentColor" />
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Partners;
