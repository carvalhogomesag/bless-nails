import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck } from "lucide-react";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se a cliente já aceitou os cookies antes
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000); // Aparece após 2 segundos
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-96 z-50 bg-white shadow-2xl rounded-2xl p-6 border border-brand-cream"
        >
          <div className="flex items-start gap-4">
            <div className="bg-brand-cream p-2 rounded-lg text-brand-gold">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg mb-2 text-brand-dark">Privacidade & Cookies</h4>
              <p className="text-sm text-brand-dark/70 mb-4 leading-relaxed">
                Utilizamos cookies para melhorar a sua experiência e garantir a segurança dos seus agendamentos. Ao continuar, você aceita nossa política.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={acceptCookies}
                  className="bg-brand-olive text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-brand-olive/90 transition-all w-full"
                >
                  Aceitar Tudo
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-brand-dark/50 text-sm hover:text-brand-dark transition-all"
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