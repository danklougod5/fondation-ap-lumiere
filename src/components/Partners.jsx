import React from 'react';

const Partners = () => {
    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-xl font-semibold text-gray-500 mb-8 uppercase tracking-widest">
                    Ils nous soutiennent
                </h3>

                <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Partner Placeholders (Text based for now as no logos were provided) */}
                    <div className="text-2xl font-bold text-gray-400">Ministère de la Solidarité</div>
                    <div className="text-2xl font-bold text-gray-400">Fondation Magic System</div>
                    <div className="text-2xl font-bold text-gray-400">Roi 12-12</div>
                    <div className="text-2xl font-bold text-gray-400">Mairie de Cocody</div>
                </div>

                <div className="mt-12 bg-gray-50 inline-block px-8 py-4 rounded-full border border-gray-200">
                    <p className="font-medium text-gray-700">
                        Rejoignez la communauté des <span className="text-primary font-bold">"Missionnaires"</span> d'Apoutchou National
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Partners;
