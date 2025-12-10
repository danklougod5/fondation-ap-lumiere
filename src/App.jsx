import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Mission from './components/Mission';
import Actions from './components/Actions';
import Projects from './components/Projects';
import Impact from './components/Impact';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Privacy from './components/Privacy';

function App() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
        });
    }, []);

    const HomePage = () => (
        <>
            <Navbar />
            <Hero />
            <About />
            <Mission />
            <Actions />
            <Projects />
            <Impact />
            <Partners />
            <Contact />
            <Footer />
        </>
    );

    return (
        <div className="font-body text-gray-800 antialiased overflow-x-hidden">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/privacy" element={<Privacy />} />
            </Routes>
        </div>
    );
}

export default App;
