import React, { useState, useRef, useEffect } from 'react';

/**
 * Composant d'image optimisée avec lazy loading natif.
 * Réduit la bande passante et accélère le chargement de la page.
 * 
 * Features:
 * - Lazy loading natif (loading="lazy")
 * - Placeholder gris pendant le chargement
 * - Transition douce à l'affichage
 * - Gestion des erreurs avec fallback
 */
const OptimizedImage = ({
    src,
    alt,
    className = '',
    wrapperClassName = '',
    fallbackSrc = null,
    ...props
}) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleLoad = () => setLoaded(true);
    const handleError = () => {
        setError(true);
        if (fallbackSrc) setLoaded(true);
    };

    return (
        <div className={`relative overflow-hidden ${wrapperClassName}`}>
            {/* Placeholder skeleton */}
            {!loaded && (
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
            )}
            <img
                src={error && fallbackSrc ? fallbackSrc : src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={handleLoad}
                onError={handleError}
                className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
                {...props}
            />
        </div>
    );
};

/**
 * Composant vidéo optimisée avec Intersection Observer.
 * La vidéo ne se charge que quand elle est visible à l'écran.
 * Économise énormément de bande passante.
 */
const OptimizedVideo = ({
    src,
    className = '',
    wrapperClassName = '',
    ...props
}) => {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' } // Précharger 200px avant d'être visible
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={videoRef} className={`relative overflow-hidden ${wrapperClassName}`}>
            {isVisible ? (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className={className}
                    {...props}
                >
                    <source src={src} type="video/mp4" />
                    <source src={src} type="video/webm" />
                </video>
            ) : (
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
            )}
        </div>
    );
};

export { OptimizedImage, OptimizedVideo };
