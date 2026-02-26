import React, { useEffect } from 'react';
import About from '../components/About';
import Mission from '../components/Mission';
import SEO from '../components/SEO';
import AOS from 'aos';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.refresh();
    }, []);

    return (
        <div className="pt-20 bg-slate-50">
            <SEO
                title="À Propos"
                description="Découvrez l'histoire, la vision et les valeurs de la Fondation AP Lumière d'Afrique. De l'ombre à la lumière, notre engagement pour les plus démunis."
                url="/apropos"
            />
            <About />
            <Mission />
        </div>
    );
};

export default AboutPage;
