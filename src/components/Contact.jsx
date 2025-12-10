import React from 'react';
import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Contact Info & Map */}
                    <div className="lg:w-1/2 space-y-8" data-aos="fade-right">
                        <div>
                            <h2 className="text-3xl font-bold font-heading text-primary-dark mb-4">
                                Contactez-nous
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Vous souhaitez devenir bénévole, faire un don ou proposer un partenariat ?
                                Notre équipe est à votre écoute.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-full shadow-sm text-accent">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Adresse</h4>
                                    <p className="text-gray-600">Angré Caféier 3, Deux-Plateaux-Angré<br />Cocody, Abidjan</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-full shadow-sm text-accent">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Email</h4>
                                    <p className="text-gray-600">contact@fondationaplumiere.org</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-full shadow-sm text-accent">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Téléphone</h4>
                                    <p className="text-gray-600">+225 07 00 00 00 00</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <h4 className="font-bold text-gray-800 mb-4">Suivez-nous</h4>
                            <div className="flex gap-4">
                                <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"><Facebook size={20} /></a>
                                <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors"><Instagram size={20} /></a>
                                <a href="#" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors"><Youtube size={20} /></a>
                            </div>
                        </div>
                    </div>

                    {/* Donation Form */}
                    <div id="donate" className="lg:w-1/2 bg-white p-8 rounded-2xl shadow-xl" data-aos="fade-left">
                        <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                            <span className="bg-accent text-white p-2 rounded-lg"><Send size={20} /></span>
                            Faire un Don / Message
                        </h3>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Votre nom" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="votre@email.com" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
                                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                                    <option>Je souhaite faire un don financier</option>
                                    <option>Je souhaite faire un don matériel</option>
                                    <option>Je veux devenir bénévole</option>
                                    <option>Demande de partenariat</option>
                                    <option>Autre</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Votre message..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Envoyer mon soutien
                            </button>
                        </form>

                        <p className="text-xs text-gray-400 mt-4 text-center">
                            Vos données sont sécurisées. En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
