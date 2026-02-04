import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Eye, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { staggerContainer, scaleIn } from './animations';

const ActionGallery = ({ galleryImages, selectedImage, setSelectedImage }) => {
    // pattern pour l'effet Bento
    const getCardSpan = (index) => {
        const patterns = [
            'md:col-span-2 md:row-span-2', // Grande image
            'md:col-span-1 md:row-span-1',
            'md:col-span-1 md:row-span-1',
            'md:col-span-1 md:row-span-2', // Image verticale
            'md:col-span-2 md:row-span-1', // Image large
            'md:col-span-1 md:row-span-1',
        ];
        return patterns[index % patterns.length];
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        setSelectedImage(galleryImages[newIndex]);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        const newIndex = (currentIndex + 1) % galleryImages.length;
        setSelectedImage(galleryImages[newIndex]);
    };

    return (
        <section id="gallery-section" className="py-12 md:py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-xs mb-4 md:mb-6 border border-primary/20">
                        <Camera size={14} className="text-accent" />
                        <span className="uppercase tracking-widest text-[10px]">Galerie Photos</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-4 md:mb-6 uppercase tracking-tight">
                        Moments <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Captés</span>
                    </h2>
                    <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
                    <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-medium italic">
                        Une immersion visuelle au cœur de nos interventions et de notre impact quotidien.
                    </p>
                </motion.div>

                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]"
                >
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id || index}
                            variants={scaleIn}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedImage(image)}
                            className={`relative overflow-hidden rounded-[2rem] cursor-pointer group shadow-xl shadow-slate-200/50 border-4 border-white ${getCardSpan(index)}`}
                        >
                            <img
                                src={image.image_url}
                                alt={image.title || 'Gallery image'}
                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileHover={{ y: 0, opacity: 1 }}
                                    className="flex flex-col gap-2"
                                >
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 mb-2">
                                        <Maximize2 size={20} className="text-white" />
                                    </div>
                                    <p className="text-white font-black text-xl leading-tight uppercase tracking-wide">
                                        {image.title || "Voir l'image"}
                                    </p>
                                    <span className="text-accent text-xs font-bold uppercase tracking-widest">
                                        Fondation AP Lumière
                                    </span>
                                </motion.div>
                            </div>

                            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 group-hover:opacity-0 transition-opacity">
                                <Maximize2 size={12} className="text-white" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox Modal (Ultra-Premium) */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-950 z-[100] flex items-center justify-center p-2 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            whileHover={{ rotate: 90, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-full flex items-center justify-center backdrop-blur-md shadow-2xl z-[130] border border-white/20 transition-all"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={28} />
                        </motion.button>

                        {/* Blurred background image */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <motion.img
                                key={`bg-${selectedImage.id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                transition={{ duration: 1 }}
                                src={selectedImage.image_url}
                                className="w-full h-full object-cover scale-110 blur-[80px]"
                                alt=""
                            />
                        </div>

                        {/* Navigation Buttons - Enhanced Visibility */}
                        {galleryImages.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-black/50 hover:bg-accent text-white backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all duration-300 z-[120] group shadow-lg pointer-events-auto"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-black/50 hover:bg-accent text-white backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all duration-300 z-[120] group shadow-lg pointer-events-auto"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </>
                        )}

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full h-[90vh] flex flex-col items-center justify-center pointer-events-none z-[110]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative group w-full h-full flex items-center justify-center pointer-events-auto">
                                <motion.img
                                    key={selectedImage.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    src={selectedImage.image_url}
                                    alt={selectedImage.title}
                                    className="max-w-[95%] max-h-[90%] md:max-w-[90%] md:max-h-[85%] object-contain rounded-2xl md:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10"
                                />

                                {selectedImage.title && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 flex justify-center"
                                    >
                                        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] inline-block max-w-2xl shadow-2xl">
                                            <h3 className="text-white font-black text-lg md:text-2xl uppercase tracking-tight text-center">
                                                {selectedImage.title}
                                            </h3>
                                            <div className="h-1 w-8 md:w-12 bg-accent mt-3 mx-auto rounded-full"></div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ActionGallery;
