/**
 * Hook pour pré-charger une image avant de l'afficher.
 * Évite le flash/rechargement visible lors du changement d'image.
 * 
 * Usage:
 *   const preloadAndSet = usePreloadImage();
 *   preloadAndSet(newUrl, (loadedUrl) => setMyImage(loadedUrl));
 */

/**
 * Pré-charge une image en arrière-plan.
 * Retourne une Promise qui se résout avec l'URL une fois l'image chargée.
 * @param {string} url - L'URL de l'image à pré-charger
 * @returns {Promise<string>} L'URL de l'image chargée
 */
export function preloadImage(url) {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject(new Error('No URL provided'));
            return;
        }
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Failed to preload: ${url}`));
        img.src = url;
    });
}

/**
 * Pré-charge plusieurs images en parallèle.
 * Retourne un objet avec les URLs chargées, en gardant les fallbacks pour les erreurs.
 * @param {Object} imageMap - { key: { url: string, fallback: string } }
 * @returns {Promise<Object>} { key: loadedUrl }
 */
export async function preloadImages(imageMap) {
    const results = Object.create(null);
    const allowedKeys = new Set(Object.keys(imageMap).filter(k => Object.hasOwn(imageMap, k)));
    const promises = [...allowedKeys].map(async (key) => {
        const { url, fallback } = imageMap[key];
        try {
            results[key] = await preloadImage(url);
        } catch {
            results[key] = fallback || null;
        }
    });
    await Promise.all(promises);
    return results;
}
