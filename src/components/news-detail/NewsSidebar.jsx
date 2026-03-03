import React from 'react';
import { Heart, BookOpen } from 'lucide-react';

const NewsSidebar = () => {
    return (
        <aside className="lg:col-span-4 space-y-12">
            {/* CTA Card (Enhanced) */}
            <div className="bg-slate-950 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 text-white relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] sticky top-24">
                <div className="relative z-10">

                    <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight uppercase tracking-tighter break-words text-white">Devenez acteur du changement</h3>
                    <p className="text-white/60 mb-10 font-medium text-base md:text-lg leading-relaxed">Chaque don, petit ou grand, nous rapproche d'un avenir meilleur pour tous.</p>
                    <a
                        href="https://moya-pay.com/p/pl_203zikdg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-accent to-emerald-400 text-white text-center font-black py-4 md:py-5 rounded-2xl hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all uppercase text-[10px] md:text-xs tracking-widest"
                    >
                        Soutenir nos actions
                    </a>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
            </div>

            {/* Newsletter Simple */}
            <div className="bg-slate-50 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100">

                <h4 className="font-black text-slate-900 text-xl uppercase tracking-tighter mb-4 break-words">Restez informé</h4>
                <p className="text-slate-500 mb-8 font-medium text-sm md:text-base">Inscrivez-vous pour ne rien manquer de notre actualité.</p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="newsletter-email-sidebar" className="sr-only">Votre email</label>
                    <input
                        id="newsletter-email-sidebar"
                        type="email"
                        placeholder="Votre email"
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                    />
                    <button type="submit" className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all uppercase text-[10px] tracking-widest">S'abonner</button>
                </form>
            </div>
        </aside>
    );
};

export default NewsSidebar;
