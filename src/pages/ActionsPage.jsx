import React, { useEffect } from 'react';
import Actions from '../components/Actions';
import Projects from '../components/Projects';
import AOS from 'aos';

const ActionsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.refresh();
    }, []);

    return (
        <div className="pt-20">
            <Actions />
            <Projects />
        </div>
    );
};

export default ActionsPage;
