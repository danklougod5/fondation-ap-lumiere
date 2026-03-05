import React, { useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import logger from '../../lib/logger';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // For simplicity, we treat the identifier as email
            // In a real username scenario, we might append a domain or lookup the email
            const email = identifier.includes('@') ? identifier : `${identifier}@fondation-lumiere.org`;

            await signIn(email, password);
            navigate('/admin');
        } catch (err) {
            logger.error(err);
            setError('Identifiants incorrects. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl overflow-hidden relative"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-emerald-400" />

                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                        <Lock className="text-primary w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Espace Admin</h1>
                    <p className="text-gray-500">Connectez-vous pour gérer le contenu</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3 text-sm font-medium border border-red-100"
                    >
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="admin-identifier" className="text-sm font-bold text-gray-700 ml-1">Identifiant</label>
                        <input
                            id="admin-identifier"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                            placeholder="Nom d'utilisateur ou email"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="admin-password" className="text-sm font-bold text-gray-700 ml-1">Mot de passe</label>
                        <div className="relative">
                            <input
                                id="admin-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium pr-12"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                            <>
                                <LogIn size={20} />
                                Se connecter
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        © 2024 Fondation AP Lumière. Tous droits réservés.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
