import React, { useState, useEffect } from 'react';
import logger from '../lib/logger';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A component that seamlessly transitions from a fallback (local) image 
 * to a dynamic (remote) image once it's loaded.
 * Prevents flickering, blank frames, and "popping" effects.
 */
const SeamlessImage = ({
    src,
    fallback,
    alt = "",
    className = "",
    wrapperClassName = "",
    objectFit = "cover"
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(null);

    useEffect(() => {
        if (!src || src === fallback) {
            setIsLoaded(false);
            return;
        }

        // Only start preloading if the src is different from what we already have
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setCurrentSrc(src);
            setIsLoaded(true);
        };
        img.onerror = () => {
            logger.error(`Failed to load image: ${src} `);
            setIsLoaded(false);
        };
    }, [src, fallback]);

    return (
        <div className={`relative overflow - hidden ${wrapperClassName} `} style={{ width: '100%', height: '100%' }}>
            {/* 1. The Fallback Image (Always Present or Fading Out) */}
            {fallback && (
                <img
                    src={fallback}
                    alt={alt}
                    className={`${className} absolute inset - 0 w - full h - full transition - opacity duration - 1000 ${isLoaded ? 'opacity-0' : 'opacity-100'} `}
                    style={{ objectFit }}
                />
            )}

            {/* 2. The Dynamic Image (Fading In Over the Fallback) */}
            {isLoaded && currentSrc && (
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    src={currentSrc}
                    alt={alt}
                    className={`${className} absolute inset - 0 w - full h - full`}
                    style={{ objectFit }}
                />
            )}
        </div>
    );
};

export default SeamlessImage;
