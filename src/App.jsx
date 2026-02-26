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
// Auth & Protected Route restent synchrones (ils ne pèsent pas grand chose et sont critiques pour l'arbre de montage)
import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

// === CODE SPLITTING ===
// Chargement paresseux (lazy loading) des pages publiques (Non chargées sur l'accueil)
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ActionsPage = React.lazy(() => import('./pages/ActionsPage'));
const ActionDetailPage = React.lazy(() => import('./pages/ActionDetailPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const NewsDetailPage = React.lazy(() => import('./pages/NewsDetailPage'));
const NewsPage = React.lazy(() => import('./pages/NewsPage'));
const ProjectDetailPage = React.lazy(() => import('./pages/ProjectDetailPage'));
const FounderPage = React.lazy(() => import('./pages/FounderPage'));

// Chargement paresseux des pages et du layout d'Administration (Sépare le code Admin des utilisateurs normaux)
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout'));
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const AdminNewsList = React.lazy(() => import('./pages/admin/AdminNewsList'));
const AdminNewsEditor = React.lazy(() => import('./pages/admin/AdminNewsEditor'));
const AdminActionList = React.lazy(() => import('./pages/admin/AdminActionList'));
const AdminActionEditor = React.lazy(() => import('./pages/admin/AdminActionEditor'));
const AdminProjectList = React.lazy(() => import('./pages/admin/AdminProjectList'));
const AdminProjectEditor = React.lazy(() => import('./pages/admin/AdminProjectEditor'));
const AdminSiteSettings = React.lazy(() => import('./pages/admin/AdminSiteSettings'));


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

    // Composant de chargement affiché pendant que Webpack/Vite télécharge la page demandée
    const PageLoader = () => (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <AuthProvider>
            <Toaster position="top-right" />
            <React.Suspense fallback={<PageLoader />}>
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
            </React.Suspense>
        </AuthProvider>
    );
}

export default App;
