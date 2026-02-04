import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Layout from './components/Layout';
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
import News from './components/News';
import AboutPage from './pages/AboutPage';
import ActionsPage from './pages/ActionsPage';
import ActionDetailPage from './pages/ActionDetailPage';
import ContactPage from './pages/ContactPage';

import NewsDetailPage from './pages/NewsDetailPage';
import NewsPage from './pages/NewsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import FounderPage from './pages/FounderPage';

// Admin Imports
import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNewsList from './pages/admin/AdminNewsList';
import AdminNewsEditor from './pages/admin/AdminNewsEditor';
import AdminActionList from './pages/admin/AdminActionList';
import AdminActionEditor from './pages/admin/AdminActionEditor';
import AdminProjectList from './pages/admin/AdminProjectList';
import AdminProjectEditor from './pages/admin/AdminProjectEditor';
import AdminSiteSettings from './pages/admin/AdminSiteSettings';


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
            <Hero />
            <About />
            <Actions />
            <News />
            <Projects />
            <Impact />
            <Partners />
            <Contact />
        </>
    );

    return (
        <AuthProvider>
            <Toaster position="top-right" />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="apropos" element={<AboutPage />} />
                    <Route path="actions" element={<ActionsPage />} />
                    <Route path="actions/:slug" element={<ActionDetailPage />} />
                    <Route path="actualites" element={<NewsPage />} />
                    <Route path="actualites/:slug" element={<NewsDetailPage />} />
                    <Route path="projets/:slug" element={<ProjectDetailPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="fondateur" element={<FounderPage />} />
                    <Route path="privacy" element={<Privacy />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/dashboard" element={<Navigate to="/admin" replace />} />

                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<AdminDashboard />} />

                    <Route path="news" element={<AdminNewsList />} />
                    <Route path="news/new" element={<AdminNewsEditor />} />
                    <Route path="news/:id" element={<AdminNewsEditor />} />

                    <Route path="actions" element={<AdminActionList />} />
                    <Route path="actions/new" element={<AdminActionEditor />} />
                    <Route path="actions/:id" element={<AdminActionEditor />} />

                    <Route path="projects" element={<AdminProjectList />} />
                    <Route path="projects/new" element={<AdminProjectEditor />} />
                    <Route path="projects/:id" element={<AdminProjectEditor />} />

                    <Route path="settings" element={<AdminSiteSettings />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
