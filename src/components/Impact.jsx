import React from 'react';

const Impact = () => {
    const stats = [
        { value: "5000+", label: "Bénéficiaires" },
        { value: "100+", label: "Permis Financés" },
        { value: "4", label: "Régions Couvertes" },
        { value: "12", label: "Actions Majeures" },
    ];

    return (
        <section className="py-20 bg-primary text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="text-4xl md:text-6xl font-bold font-heading mb-2 text-accent">
                                {stat.value}
                            </div>
                            <div className="text-lg opacity-90 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center" data-aos="fade-up" data-aos-delay="400">
                    <blockquote className="text-2xl md:text-3xl font-light italic opacity-90 max-w-4xl mx-auto">
                        "Chaque sourire retrouvé est une victoire sur la fatalité. Merci à nos donateurs qui rendent l'impossible possible."
                    </blockquote>
                </div>
            </div>
        </section>
    );
};

export default Impact;
