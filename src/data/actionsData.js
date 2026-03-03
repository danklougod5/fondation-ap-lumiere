import DonApf from '../assets/DonApf.jpg';
import SanteApf from '../assets/SanteApf.jpg';
import FormationApf from '../assets/FormationApf.jpg';

export const actionsData = [
    {
        id: "formation",
        slug: "formation-insertion",
        title: "De la rue à la réussite",
        subtitle: "Formation & Insertion Professionnelle",
        icon: "GraduationCap",
        image: FormationApf,
        shortDesc: "Formation professionnelle, permis de conduire, et insertion garantie pour sortir durablement les jeunes de la précarité.",
        fullDescription: `
            La Fondation AP Lumière d'Afrique s'engage fermement dans la formation et l'insertion professionnelle des jeunes issus de milieux défavorisés. Notre programme phare "De la rue à la réussite" vise à offrir une seconde chance à ceux qui ont été laissés pour compte par le système.

            Notre approche est holistique : nous ne nous contentons pas de former, nous accompagnons chaque bénéficiaire jusqu'à son insertion effective dans le monde du travail.
        `,
        objectives: [
            "Contribuer à l'objectif national 'Zéro enfant dans la rue d'ici 2030'",
            "Offrir des formations professionnelles qualifiantes et reconnues",
            "Financer l'obtention du permis de conduire comme passeport vers l'emploi",
            "Accompagner l'insertion professionnelle avec un suivi personnalisé",
            "Développer l'autonomie et la confiance en soi des jeunes"
        ],
        achievements: [
            {
                number: "100+",
                label: "Jeunes formés au permis de conduire",
                description: "En avril 2024, 100 jeunes issus de la rue ont obtenu leur permis de conduire grâce au financement de la fondation."
            },
            {
                number: "85%",
                label: "Taux d'insertion professionnelle",
                description: "La majorité de nos bénéficiaires trouvent un emploi stable dans les 6 mois suivant leur formation."
            },
            {
                number: "5",
                label: "Filières de formation",
                description: "Mécanique auto, couture, coiffure, électricité, et commerce sont nos principales filières."
            }
        ],
        testimonials: [
            {
                name: "Kouadio Jean",
                role: "Ancien bénéficiaire, aujourd'hui chauffeur",
                quote: "Grâce à la fondation, j'ai quitté la rue et obtenu mon permis. Aujourd'hui, je travaille comme chauffeur et je peux subvenir aux besoins de ma famille."
            }
        ],
        upcomingProjects: [
            "Création d'un centre de formation professionnelle à Abidjan",
            "Partenariat avec des entreprises pour des stages garantis",
            "Extension du programme à d'autres régions de Côte d'Ivoire"
        ],
        callToAction: "Ensemble, offrons une seconde chance à la jeunesse ivoirienne.",
        gallery: [FormationApf]
    },
    {
        id: "sante",
        slug: "sante-maternelle",
        title: "Santé",
        subtitle: "Accès aux Soins pour Tous",
        icon: "HeartPulse",
        image: SanteApf,
        shortDesc: "Accès aux soins pour tous : construction de dispensaires (projet pilote à Man) et campagnes de santé.",
        fullDescription: `
            La santé est un droit fondamental que nous défendons avec passion. La Fondation AP Lumière d'Afrique concentre ses efforts sur l'amélioration de l'accès aux soins dans les zones rurales et défavorisées de Côte d'Ivoire.

            Notre projet phare est la construction d'une maternité à Gouékangouné, village natal d'Apoutchou National dans la région de Man. Ce projet répond à un besoin urgent : permettre aux femmes enceintes d'accoucher dans des conditions dignes et sécurisées, sans parcourir des dizaines de kilomètres.
        `,
        objectives: [
            "Construire un dispensaire/maternité à Gouékangouné (Man)",
            "Réduire la mortalité maternelle et infantile dans la région",
            "Organiser des campagnes de sensibilisation santé",
            "Faciliter l'accès aux médicaments essentiels",
            "Former du personnel de santé local"
        ],
        achievements: [
            {
                number: "1",
                label: "Maternité en projet",
                description: "Construction prévue à Gouékangouné pour permettre aux femmes d'accoucher en toute sécurité."
            },
            {
                number: "500+",
                label: "Personnes sensibilisées",
                description: "Campagnes de don du sang et de sensibilisation à la santé organisées régulièrement."
            },
            {
                number: "10+",
                label: "Villages ciblés",
                description: "Interventions médicales prévues dans les villages environnants de Man."
            }
        ],
        testimonials: [
            {
                name: "Apoutchou National",
                role: "Fondateur",
                quote: "Construire cette maternité dans mon village est une mission sacrée. Aucune femme ne devrait risquer sa vie par manque d'infrastructures de santé."
            }
        ],
        upcomingProjects: [
            "Pose de la première pierre de la maternité de Gouékangouné",
            "Campagne de vaccination dans les zones rurales",
            "Programme de suivi prénatal pour les femmes enceintes"
        ],
        callToAction: "Aidez-nous à sauver des vies en soutenant nos projets de santé.",
        gallery: [SanteApf]
    },
    {
        id: "urgence",
        slug: "aide-urgence",
        title: "Aide d'Urgence",
        subtitle: "Réponse Immédiate aux Situations Critiques",
        icon: "ShieldAlert",
        image: DonApf,
        shortDesc: "Réponse immédiate aux situations critiques via la communauté des Missionnaires. Transparence totale sur chaque action.",
        fullDescription: `
            Face aux urgences humanitaires et aux situations de détresse, la Fondation AP Lumière d'Afrique mobilise rapidement sa communauté de "Missionnaires" pour apporter une aide immédiate et concrète.

            Grâce à la force de sa communauté en ligne, notamment sur TikTok, Apoutchou National peut identifier des cas urgents et organiser des collectes de fonds en temps réel. Chaque don est traçable et son utilisation est communiquée de manière transparente.
        `,
        objectives: [
            "Intervenir rapidement dans les situations d'urgence",
            "Soutenir les familles en situation de précarité extrême",
            "Venir en aide aux veuves, orphelins et personnes vulnérables",
            "Assurer une transparence totale sur l'utilisation des dons",
            "Mobiliser la communauté des Missionnaires pour l'entraide"
        ],
        achievements: [
            {
                number: "1000+",
                label: "Familles aidées",
                description: "Distribution de vivres, paiement de frais médicaux et scolaires pour des familles en détresse."
            },
            {
                number: "100%",
                label: "Transparence",
                description: "Chaque action est documentée et partagée en direct avec la communauté."
            },
            {
                number: "24h",
                label: "Délai d'intervention",
                description: "Capacité de mobilisation rapide grâce à notre réseau de Missionnaires."
            }
        ],
        testimonials: [
            {
                name: "Fatou K.",
                role: "Bénéficiaire",
                quote: "Quand mon mari est décédé, je ne savais pas comment nourrir mes enfants. La fondation a payé notre loyer pendant 6 mois et les frais de scolarité."
            }
        ],
        upcomingProjects: [
            "Création d'un fonds d'urgence permanent",
            "Réseau de Missionnaires dans chaque commune d'Abidjan",
            "Plateforme en ligne pour signaler les cas urgents"
        ],
        callToAction: "Rejoignez les Missionnaires et participez à l'entraide solidaire.",
        gallery: [DonApf]
    },
    {
        id: "infrastructures",
        slug: "infrastructures",
        title: "Infrastructures",
        subtitle: "Améliorer les Conditions de Vie",
        icon: "Hammer",
        image: null,
        shortDesc: "Construction de forages et rénovation d'habitats pour améliorer les conditions de vie fondamentales.",
        fullDescription: `
            L'accès à l'eau potable et à un logement décent sont des droits fondamentaux. La Fondation AP Lumière d'Afrique s'engage dans des projets d'infrastructures qui transforment durablement les conditions de vie des populations les plus vulnérables.

            Notre vision va au-delà de l'aide ponctuelle : nous construisons des infrastructures pérennes qui bénéficient à des communautés entières pendant des générations. Le projet phare est la construction du plus grand orphelinat d'Afrique à Man, sur un terrain de 10 hectares.
        `,
        objectives: [
            "Construire le plus grand orphelinat d'Afrique à Man",
            "Réaliser des forages pour l'accès à l'eau potable",
            "Rénover les habitats précaires pour les familles vulnérables",
            "Construire des écoles dans les zones rurales",
            "Améliorer les infrastructures communautaires"
        ],
        achievements: [
            {
                number: "10ha",
                label: "Terrain acquis à Man",
                description: "Terrain destiné à la construction du plus grand orphelinat d'Afrique."
            },
            {
                number: "2025",
                label: "Pose de la première pierre",
                description: "Lancement prévu des travaux de l'orphelinat cette année."
            },
            {
                number: "5+",
                label: "Projets en cours",
                description: "Forages, rénovations et constructions en cours d'étude."
            }
        ],
        testimonials: [
            {
                name: "Apoutchou National",
                role: "Fondateur",
                quote: "Je veux construire quelque chose qui me survivra. Cet orphelinat accueillera des milliers d'enfants et leur offrira un avenir meilleur."
            }
        ],
        upcomingProjects: [
            "Construction de l'orphelinat de Man (première phase)",
            "Forage dans 3 villages de la région de Man",
            "Programme de rénovation d'habitats pour 50 familles"
        ],
        callToAction: "Participez à la construction d'un avenir meilleur pour les enfants d'Afrique.",
        gallery: []
    }
];

export const getActionBySlug = (slug) => {
    return actionsData.find(action => action.slug === slug);
};

export const getActionById = (id) => {
    return actionsData.find(action => action.id === id);
};
