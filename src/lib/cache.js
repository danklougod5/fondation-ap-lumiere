/**
 * Système de cache simple pour les requêtes Supabase.
 * Réduit les appels API quand il y a beaucoup de visiteurs simultanés.
 * 
 * Pourquoi ? Chaque visiteur fait des requêtes à Supabase.
 * Si 1000 personnes visitent en même temps, ça fait 1000+ requêtes.
 * Avec le cache, on réduit ça à quelques requêtes par période.
 */

const cache = new Map();

// Durée du cache par défaut : 5 minutes (en millisecondes)
const DEFAULT_TTL = 5 * 60 * 1000;

/**
 * Récupère des données avec mise en cache automatique.
 * 
 * @param {string} key - Clé unique pour identifier la requête (ex: "news_list", "actions_all")
 * @param {Function} fetchFn - Fonction async qui retourne les données (la requête Supabase)
 * @param {number} ttl - Durée de vie du cache en ms (défaut: 5 minutes)
 * @returns {Promise<any>} Les données (depuis le cache ou fraîches)
 */
export async function cachedFetch(key, fetchFn, ttl = DEFAULT_TTL) {
    const now = Date.now();
    const cached = cache.get(key);

    // Si les données sont en cache et pas expirées, les retourner directement
    if (cached && (now - cached.timestamp) < ttl) {
        return cached.data;
    }

    // Si une requête est déjà en cours pour cette clé, attendre son résultat
    // (évite les requêtes en double quand React re-render)
    if (cached && cached.promise) {
        try {
            return await cached.promise;
        } catch {
            // Si la requête en cours échoue, on en relance une
        }
    }

    // Lancer la requête et la stocker comme "en cours"
    const promise = fetchFn();
    cache.set(key, { ...cached, promise });

    try {
        const data = await promise;
        cache.set(key, { data, timestamp: now, promise: null });
        return data;
    } catch (error) {
        // En cas d'erreur, supprimer la promesse en cours mais garder l'ancien cache
        if (cached && cached.data) {
            cache.set(key, { ...cached, promise: null });
            console.warn(`[Cache] Erreur réseau pour "${key}", utilisation des données en cache.`);
            return cached.data;
        }
        cache.delete(key);
        throw error;
    }
}

/**
 * Invalide (supprime) une entrée du cache.
 * Utile après une modification admin (ajout/suppression d'un article, etc.)
 * 
 * @param {string} key - Clé à invalider
 */
export function invalidateCache(key) {
    cache.delete(key);
}

/**
 * Invalide tout le cache.
 */
export function clearCache() {
    cache.clear();
}
