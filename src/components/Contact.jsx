import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Sparkles, Heart, ArrowRight } from 'lucide-react';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => setStatus(''), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="section-padding bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -ml-40 -mb-40"></div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-primary/20">
                            <Sparkles size={14} />
                            Contact
                        </div>
                        <h2 className="mb-8">
                            Rejoignez le <span className="text-primary italic">Mouvement</span>
                        </h2>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12">
                            Une question ? Une envie de devenir missionnaire de la lumière ou un partenaire ? Notre équipe est à votre écoute.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-slate-100 shadow-sm">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 mb-1">Téléphone</h4>
                                    <p className="text-slate-500 font-bold tracking-wide">07 08 31 70 38</p>
                                </div>
                            </div>
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-slate-100 shadow-sm">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 mb-1">Email</h4>
                                    <p className="text-slate-500 font-bold tracking-wide">contact@fondation-ap.org</p>
                                </div>
                            </div>
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-slate-100 shadow-sm">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 mb-1">Siège</h4>
                                    <p className="text-slate-500 font-bold tracking-wide">Angré Caféier 3, Abidjan, Côte d'Ivoire</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <h4 className="text-xl font-black mb-4 flex items-center gap-2 text-white">
                                    <Heart size={20} className="text-accent" />
                                    Urgence Humanitaire
                                </h4>
                                <p className="text-white/60 mb-8 font-medium italic">Besoin d'une assistance immédiate pour un cas critique ?</p>
                                <a href="tel:0708317038" className="inline-flex items-center gap-3 text-accent font-black uppercase text-xs tracking-[0.2em] group">
                                    Appel Prioritaire
                                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                </a>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-50 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/40"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="full-name" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Nom Complet</label>
                                    <input
                                        id="full-name"
                                        required
                                        type="text"
                                        placeholder="Ex: Stéphane Agbré"
                                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold placeholder:text-slate-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Email</label>
                                    <input
                                        id="email"
                                        required
                                        type="email"
                                        placeholder="votre@email.com"
                                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Sujet</label>
                                <select id="subject" className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-slate-700">
                                    <option>Faire un don</option>
                                    <option>Devenir missionnaire</option>
                                    <option>Partenariat</option>
                                    <option>Autre question</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Votre Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    placeholder="Comment pouvons-nous vous aider ?"
                                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold placeholder:text-slate-300 resize-none"
                                />
                            </div>

                            <button
                                disabled={status === 'sending' || status === 'success'}
                                type="submit"
                                className={`w-full btn-primary py-5 rounded-[2rem] flex items-center justify-center gap-3 ${status === 'success' ? 'bg-accent border-accent !shadow-accent/20' : ''
                                    }`}
                            >
                                {status === 'sending' ? (
                                    'Envoi en cours...'
                                ) : status === 'success' ? (
                                    <>Message envoyé !</>
                                ) : (
                                    <>
                                        Envoyer le message
                                        <Send size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
