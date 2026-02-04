import news1 from '../assets/fondationAp.jpg';
import news2 from '../assets/Man.jpg';
import news3 from '../assets/FormationApf.jpg';

const STATIC_NEWS = [
    {
        id: "1",
        title: "Inauguration Officielle de la Fondation AP Lumière d'Afrique",
        date: "3 Décembre 2025",
        category: "Événement",
        image: news1,
        summary: "C'est fait ! La Fondation du célèbre influenceur et artiste Apoutchou National a officiellement ouvert ses portes à Abidjan ce mercredi 3 décembre 2025.",
        content: "Après des mois de préparation et d'attente, la cérémonie d'inauguration a rassemblé un parterre de personnalités ivoiriennes et africaines, dont le Roi 12-12. Apoutchou National a exprimé sa profonde émotion : « Il y a un an, j'étais en cellule. Aujourd'hui, je célèbre l'espoir pour les enfants d'Afrique. » La fondation s'engage activement pour l'objectif « Zéro enfant dans la rue d'ici 2030 »."
    },
    {
        id: "2",
        title: "Maternité de Gouékangouné : Un Soutien Vital",
        date: "Décembre 2025",
        category: "Projet",
        image: news2,
        summary: "Apoutchou National prévoit de construire une maternité dans son village natal de Gouékangouné pour aider les femmes enceintes.",
        content: "Ce projet est une response directe aux besoins urgents de santé maternelle dans la région. En plus de cette infrastructure, la fondation s'inscrit dans les engagements plus larges d'Apoutchou National, notamment son rôle d'ambassadeur auprès du Ministère de la Solidarité et de la Lutte contre la Pauvreté. « Aider ma communauté est mon plus grand honneur », a-t-il affirmé lors de la présentation du projet."
    },
    {
        id: "3",
        title: "100 Jeunes obtiennent leur Permis de Conduire",
        date: "Avril 2024",
        category: "Action Sociale",
        image: news3,
        summary: "L'insertion professionnelle au cœur de l'action : 100 jeunes des la rue bénéficient d'une formation complète.",
        content: "Fidèle à sa mission d'insertion, la Fondation a financé et accompagné 100 jeunes issus de milieux défavorisés pour l'obtention de leur permis de conduire, véritable passeport pour l'emploi et l'autonomie. Cette action marque une étape clé dans le parcours de réinsertion sociale de ces jeunes."
    }
];

const STORAGE_KEY = 'fondation_ap_news';

export const getNews = () => {
    const localNews = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return [...STATIC_NEWS, ...localNews];
};

export const getNewsById = (id) => {
    const allNews = getNews();
    return allNews.find(n => n.id === id);
};

export const saveNews = (newsItem) => {
    const localNews = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const newItem = { ...newsItem, id: Date.now().toString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newItem, ...localNews]));
    return newItem;
};

export const deleteNews = (id) => {
    const localNews = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filteredNews = localNews.filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNews));
};
