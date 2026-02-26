import React, { useEffect } from 'react';
import Actions from '../components/Actions';
import Projects from '../components/Projects';
import SEO from '../components/SEO';
import AOS from 'aos';

const ActionsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.refresh();
    }, []);

    return (
        <div className="pt-20">
            <SEO
                title="Nos Missions & Projets"
                description="Découvrez les domaines d'intervention de la Fondation AP Lumière d'Afrique et nos projets concrets sur le terrain pour soutenir les plus vulnérables."
                url="/actions"
            />
            <Actions />
            <Projects />
        </div>
    );
};

export default ActionsPage;
