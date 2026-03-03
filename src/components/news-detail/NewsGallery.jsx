import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye } from 'lucide-react';

const NewsGallery = ({ news, setSelectedImage, scaleIn, getCardSpan }) => {
    if (!news.additional_images || news.additional_images.length === 0) return null;

    return (
        <section className="mt-20 pt-16 border-t border-slate-100">
            <div className="flex flex-col mb-12">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-4 w-fit">
                    <Camera size={14} />
                    Reportage Photo
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-black text-slate-900 uppercase tracking-tighter">
                    Immersion <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Visuelle</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[auto] md:auto-rows-[250px]">
                {news.additional_images.map((img, idx) => (
                    <motion.div
                        key={`${img}-${idx}`}
                        variants={scaleIn}
                        whileInView="animate"
                        initial="initial"
                        viewport={{ once: true }}
                        className={`relative rounded-3xl md:rounded-[2rem] overflow-hidden cursor-pointer group shadow-xl shadow-slate-200/50 border-4 border-white aspect-[4/3] md:aspect-auto ${getCardSpan(idx)}`}
                        onClick={() => setSelectedImage(img)}
                    >
                        <img
                            src={img}
                            alt={`Photo ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
                                <Eye size={20} className="text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default NewsGallery;
