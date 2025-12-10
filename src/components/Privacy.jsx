import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, FileText, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link to="/" className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors mb-8 group">
                    <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Retour à l'accueil
                </Link>

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary-dark mb-2">
                        Politique de Confidentialité
                    </h1>
                    <p className="text-gray-500 mb-8 border-b pb-8">
                        Dernière mise à jour : 10 Décembre 2025
                    </p>

                    <div className="space-y-8">
                        {/* Article 1 */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="text-accent" size={28} />
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                    1. Protection des Données Personnelles (Côte d'Ivoire)
                                </h2>
                            </div>
                            <div className="prose text-gray-600 leading-relaxed pl-10">
                                <p>
                                    Conformément à la <strong>Loi n° 2013-450 du 19 juin 2013</strong> relative à la protection des données à caractère personnel en Côte d'Ivoire, la Fondation AP Lumière d'Afrique s'engage à garantir la confidentialité de vos informations.
                                </p>
                                <ul className="list-disc ml-5 mt-2 space-y-1">
                                    <li>Les données collectées (nom, email, numéro pour les dons) sont strictement utilisées pour la gestion des dons et la communication de la fondation.</li>
                                    <li>Aucune donnée n'est vendue ou cédée à des tiers à des fins commerciales.</li>
                                    <li>Vous disposez d'un droit d'accès, de modification et de suppression de vos données sur simple demande.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Article 2 */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="text-accent" size={28} />
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                    2. Propriété Intellectuelle et Droits d'Auteur
                                </h2>
                            </div>
                            <div className="prose text-gray-600 leading-relaxed pl-10">
                                <p>
                                    L'ensemble de ce site (textes, images, logos, structure) est la propriété exclusive de la <strong>Fondation AP Lumière d'Afrique</strong>.
                                </p>
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded-r-lg">
                                    <p className="text-red-800 font-bold text-sm">
                                        ⚠️ AVERTISSEMENT CONTRE LE VOL ET LA COPIE
                                    </p>
                                    <p className="text-red-700 text-sm mt-1">
                                        Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est <strong>strictement interdite</strong>, sauf autorisation écrite préalable.
                                    </p>
                                </div>
                                <p>
                                    Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des lois en vigueur en Côte d'Ivoire et des conventions internationales sur la propriété intellectuelle.
                                </p>
                            </div>
                        </section>

                        {/* Article 3 */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="text-accent" size={28} />
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                    3. Sécurité des Transactions
                                </h2>
                            </div>
                            <div className="prose text-gray-600 leading-relaxed pl-10">
                                <p>
                                    Nous accordons une importance capitale à la sécurité de vos dons.
                                </p>
                                <ul className="list-disc ml-5 mt-2 space-y-1">
                                    <li>Les transactions via Mobile Money (Wave, Orange Money, MTN) sont sécurisées par les opérateurs respectifs.</li>
                                    <li>Les membres de la fondation ne vous demanderont jamais vos codes secrets ou mots de passe par téléphone.</li>
                                    <li>En cas de doute sur une sollicitation, veuillez nous contacter directement via les canaux officiels.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="bg-primary/5 rounded-xl p-6 mt-8">
                            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <Mail size={24} /> Nous Contacter
                            </h2>
                            <p className="text-gray-600 mb-2">
                                Pour toute question concernant cette politique ou pour exercer vos droits :
                            </p>
                            <p className="font-bold text-gray-800">
                                Email : contact@fondation-ap.org<br />
                                Téléphone : +225 07 00 00 00 00<br />
                                Siège : Abidjan, Côte d'Ivoire
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
