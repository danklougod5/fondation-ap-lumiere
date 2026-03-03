import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Landmark, Zap } from 'lucide-react';

const Impact = () => {
    const stats = [
        {
            value: "5000+",
            label: "Bénéficiaires",
            icon: Users,
            color: "text-accent"
        },
        {
            value: "100+",
            label: "Permis Financés",
            icon: Target,
            color: "text-white"
        },
        {
            value: "4",
            label: "Régions Couvertes",
            icon: Landmark,
            color: "text-accent"
        },
        {
            value: "12",
            label: "Actions Majeures",
            icon: Zap,
            color: "text-white"
        },
    ];

    return (
        <section className="relative overflow-hidden">
            {/* Darker background for impact contrast */}
            <div className="absolute inset-0 bg-primary-dark"></div>

            {/* Visual Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="container-custom relative z-10 py-24 lg:py-32">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-500 border border-white/10">
                                <stat.icon size={28} className="text-white" />
                            </div>
                            <div className={`text-4xl md:text-5xl lg:text-6xl font-black font-heading mb-3 tracking-tighter ${stat.color}`}>
                                {stat.value}
                            </div>
                            <div className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white/60">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center max-w-5xl mx-auto border-t border-white/10 pt-16"
                >
                    <blockquote className="text-2xl md:text-4xl font-black font-heading italic text-white leading-tight opacity-90">
                        "Chaque sourire retrouvé est une <span className="text-accent">victoire</span> sur la fatalité. Merci à nos donateurs qui rendent l'impossible possible."
                    </blockquote>
                    <p className="text-accent mt-8 font-bold uppercase tracking-widest text-xs">— La Direction AP Lumière d'Afrique</p>
                </motion.div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full h-48 bg-accent/20 blur-[100px] rounded-full"></div>
        </section>
    );
};

export default Impact;
