import React, { useEffect } from 'react';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import AOS from 'aos';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.refresh();
    }, []);

    return (
        <div className="pt-20">
            <SEO
                title="Contactez-nous"
                description="Contactez la Fondation AP Lumière d'Afrique pour en savoir plus sur nos actions, vous engager en tant que bénévole, ou soutenir nos projets."
                url="/contact"
            />
            <Contact />
        </div>
    );
};

export default ContactPage;
