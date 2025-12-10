import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-dark mb-4">
                        Nos Projets en Cours
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        La transparence est au cœur de notre action. Suivez l'évolution de nos initiatives majeures.
                    </p>
                </div>

                {/* Featured Project */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16" data-aos="zoom-in">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 relative min-h-[300px]">
                            <img
                                src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1200&auto=format&fit=crop"
                                alt="Construction Dispensaire"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold">
                                Projet Phare
                            </div>
                        </div>
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                Construction du Dispensaire de Man
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Ce dispensaire sera le premier centre de santé moderne desservant 8 villages environnants.
                                Il offrira des soins de première nécessité, une maternité et un suivi pédiatrique.
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-primary">Progression</span>
                                    <span className="text-gray-500">65%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-primary h-3 rounded-full w-[65%] transition-all duration-1000 ease-out"></div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle size={20} className="text-accent" />
                                    <span>Terrain acquis et viabilisé</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle size={20} className="text-accent" />
                                    <span>Gros œuvre terminé</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <CheckCircle size={20} />
                                    <span>Équipement médical (En attente de fonds)</span>
                                </div>
                            </div>

                            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold self-start transition-colors flex items-center gap-2">
                                Soutenir ce projet <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Strategic Roadmap (2025-2030) */}
                <div className="mt-20">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-3xl font-bold font-heading tracking-tight text-gray-900">
                            📊 PRIORISATION STRATÉGIQUE
                        </h2>
                        <p className="text-primary text-xl font-medium mt-2">(Roadmap 2025-2030)</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Phase 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-green-500 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="100">
                            <div className="mb-6">
                                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">Phase 1</span>
                                <h3 className="text-2xl font-bold mt-4 text-gray-800">2025 : CONSOLIDATION</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700 font-medium">Jeunesse (permis, formation)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700 font-medium">Aide d'urgence TikTok</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700 font-medium">Entrepreneuriat féminin</span>
                                </li>
                            </ul>
                        </div>

                        {/* Phase 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-accent hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="200">
                            <div className="mb-6">
                                <span className="bg-blue-100 text-accent px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">Phase 2</span>
                                <h3 className="text-2xl font-bold mt-4 text-gray-800">2026-2027 : INFRASTRUCTURE</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full border-2 border-accent flex items-center justify-center shrink-0 mt-1">
                                        <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
                                    </div>
                                    <span className="text-gray-700 font-medium">Dispensaire Man (finalisé)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0 mt-1"></div>
                                    <span className="text-gray-600">Première école construite</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0 mt-1"></div>
                                    <span className="text-gray-600">Fonds artistes structuré</span>
                                </li>
                            </ul>
                        </div>

                        {/* Phase 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-primary hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="300">
                            <div className="mb-6">
                                <span className="bg-orange-100 text-primary px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">Phase 3</span>
                                <h3 className="text-2xl font-bold mt-4 text-gray-800">2028-2030 : EXPANSION</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0 mt-1"></div>
                                    <span className="text-gray-600">5 dispensaires opérationnels</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0 mt-1"></div>
                                    <span className="text-gray-600">3 écoles fonctionnelles</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0 mt-1"></div>
                                    <span className="text-gray-600">Extension hors Côte d'Ivoire (Bénin, Burkina)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
