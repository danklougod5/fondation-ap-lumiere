import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users } from 'lucide-react';

const ActionCTA = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-primary-dark via-slate-900 to-primary-dark relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center text-white"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-accent to-emerald-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-accent/30 rotate-6">
                        <Heart size={40} className="text-white" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
                        Ensemble, faisons la <span className="text-accent">différence</span>
                    </h2>

                    <p className="text-xl text-white/90 mb-10 leading-relaxed font-medium">
                        Votre soutien peut transformer des vies. Rejoignez-nous dans cette mission pour apporter lumière et espoir à ceux qui en ont besoin.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/contact"
                            className="bg-gradient-to-r from-accent to-emerald-400 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-accent/30 transition-all hover:-translate-y-1 flex items-center gap-3"
                        >
                            <Heart size={20} />
                            Faire un don
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center gap-3"
                        >
                            <Users size={20} />
                            Devenir bénévole
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ActionCTA;
