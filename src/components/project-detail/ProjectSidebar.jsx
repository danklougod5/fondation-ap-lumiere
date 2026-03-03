import React from 'react';
import { motion } from 'framer-motion';
import { Share2, CheckCircle2 } from 'lucide-react';

const ProjectSidebar = () => {
    return (
        <div className="lg:col-span-4 space-y-8">
            {/* Support CTA */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-8 -mt-8"></div>
                <h3 className="text-2xl font-heading font-black mb-6 text-white">Soutenir ce projet spécifique ?</h3>
                <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                    Votre contribution directe est le moteur de cette initiative. Chaque don accélère la progression.
                </p>
                <a
                    href="https://moya-pay.com/p/pl_203zikdg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white text-center font-black py-5 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 uppercase tracking-widest text-sm"
                >
                    Faire un Don
                </a>
                <button className="w-full mt-4 flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors py-3 font-bold text-sm">
                    <Share2 size={16} /> Partager l'initiative
                </button>
            </motion.div>

            {/* Impact Points */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
                <h4 className="text-xl font-heading font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    Impact Attendu
                </h4>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                        <span className="text-slate-600 font-medium text-sm leading-relaxed">Amélioration durable des conditions de vie locales.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                        <span className="text-slate-600 font-medium text-sm leading-relaxed">Renforcement des capacités de la communauté.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                        <span className="text-slate-600 font-medium text-sm leading-relaxed">Création d'un modèle reproductible dans d'autres régions.</span>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
};

export default ProjectSidebar;
