import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const NewsNavigation = ({ otherNews }) => {
    if (otherNews.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.2em] mb-4">
                            <div className="w-8 h-1 bg-primary rounded-full" />
                            Continuer la lecture
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-slate-950 uppercase tracking-tighter">À lire <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">également</span></h2>
                    </div>
                    <Link to="/actualites" className="inline-flex items-center gap-3 bg-white px-8 py-3 rounded-2xl text-slate-900 font-black hover:bg-slate-900 hover:text-white transition-all shadow-sm border border-slate-100 uppercase text-[10px] tracking-widest">
                        Voir Tout <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {otherNews.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-[3rem] shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 overflow-hidden border border-slate-100 flex flex-col h-full"
                        >
                            <div className="relative h-72 overflow-hidden shrink-0">
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-primary text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-10 flex flex-col flex-grow">
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 group-hover:text-primary transition-colors leading-tight tracking-tighter line-clamp-2 overflow-hidden min-h-[3.5rem] md:min-h-[4rem]">
                                    <Link to={`/actualites/${item.slug}`}>{item.title}</Link>
                                </h3>
                                <p className="text-slate-500 font-medium line-clamp-2 overflow-hidden mb-8 flex-grow leading-relaxed">{item.summary}</p>
                                <Link to={`/actualites/${item.slug}`} className="inline-flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-widest group/btn">
                                    Lire Plus
                                    <div className="w-8 h-8 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary transition-all">
                                        <ArrowRight size={14} className="group-hover/btn:text-white transition-colors" />
                                    </div>
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsNavigation;
