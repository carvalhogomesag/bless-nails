// src/components/CookieBanner.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck } from "lucide-react";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  },[]);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-[400px] z-50 bg-white/80 backdrop-blur-xl shadow-2xl shadow-brand-leaf/10 rounded-3xl p-6 border border-brand-straw/30"
        >
          <div className="flex items-start gap-5">
            <div className="bg-brand-leaf/10 p-3 rounded-2xl text-brand-leaf shrink-0">
              <ShieldCheck size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif text-xl mb-1 text-brand-dark">Privacidade & Cookies</h4>
              <p className="text-sm text-brand-dark/60 mb-6 font-light leading-relaxed">
                Utilizamos cookies para personalizar a sua experiência e garantir a segurança dos agendamentos. Ao continuar, aceita a nossa política.
              </p>
              <div className="flex gap-4 items-center">
                <button 
                  onClick={acceptCookies}
                  className="bg-brand-leaf text-white px-6 py-2.5 rounded-full text-[10px] tracking-widest uppercase font-bold hover:bg-brand-dark hover:-translate-y-0.5 transition-all duration-300 w-full shadow-lg shadow-brand-leaf/20"
                >
                  Aceitar Tudo
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-brand-dark/40 text-[10px] tracking-widest uppercase font-bold hover:text-brand-dark transition-all duration-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};