import { useEffect } from 'react';

/**
 * Composant SEO dynamique.
 * Met à jour le titre et les balises meta de la page pour chaque route.
 * Essentiel pour que Google indexe chaque page correctement.
 * 
 * @param {Object} props
 * @param {string} props.title - Titre de la page
 * @param {string} props.description - Description de la page
 * @param {string} [props.image] - URL de l'image OG (optionnel)
 * @param {string} [props.url] - URL canonique (optionnel)
 * @param {string} [props.type] - Type OG (default: "website")
 */
const SEO = ({ title, description, image, url, type = 'website' }) => {
    const siteName = "Fondation AP Lumière d'Afrique";
    const baseUrl = 'https://fondation-ap-lumiere.vercel.app';
    const defaultImage = `${baseUrl}/og-image.png`;

    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
    const fullImage = image || defaultImage;

    useEffect(() => {
        // Update page title
        document.title = fullTitle;

        // Helper to set or create a meta tag
        const setMeta = (attribute, attrValue, content) => {
            let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, attrValue);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Standard SEO
        setMeta('name', 'description', description);

        // Open Graph
        setMeta('property', 'og:title', fullTitle);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:image', fullImage);
        setMeta('property', 'og:url', fullUrl);
        setMeta('property', 'og:type', type);
        setMeta('property', 'og:site_name', siteName);

        // Twitter Card
        setMeta('property', 'twitter:title', fullTitle);
        setMeta('property', 'twitter:description', description);
        setMeta('property', 'twitter:image', fullImage);
        setMeta('property', 'twitter:url', fullUrl);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', fullUrl);

    }, [fullTitle, description, fullImage, fullUrl, type]);

    return null; // Ce composant ne rend rien visuellement
};

export default SEO;
