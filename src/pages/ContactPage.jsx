import React, { useEffect } from 'react';
import Contact from '../components/Contact';
import AOS from 'aos';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.refresh();
    }, []);

    return (
        <div className="pt-20">
            <Contact />
        </div>
    );
};

export default ContactPage;
