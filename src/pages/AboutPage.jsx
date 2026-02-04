import React, { useEffect } from 'react';
import About from '../components/About';
import Mission from '../components/Mission';
import AOS from 'aos';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.refresh();
    }, []);

    return (
        <div className="pt-20 bg-slate-50">
            <About />
            <Mission />
        </div>
    );
};

export default AboutPage;
