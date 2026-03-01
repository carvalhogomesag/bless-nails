// src/components/CookieBanner.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, ShieldCheck } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";

interface CookieBannerProps {
  lang: Language;
}

export const CookieBanner = ({ lang }: CookieBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = UI_STRINGS[lang];

  useEffect(() => {
    // Verifica se já existe um consentimento gravado
    const consent = localStorage.getItem("bless_nails_consent");
    if (!consent) {
      // Aparece após 2 segundos para uma entrada suave
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("bless_nails_consent", "all");
    setIsVisible(false);
  };

  const handleEssentialsOnly = () => {
    localStorage.setItem("bless_nails_consent", "essentials");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          /* bottom-24 no mobile para ficar acima da barra de agendamento */
          className="fixed bottom-24 md:bottom-10 left-6 right-6 md:left-auto md:right-10 md:w-[400px] z-[100]"
        >
          {/* Contentor Glassmorphism de Luxo */}
          <div className="bg-white/80 backdrop-blur-xl border border-brand-straw/30 p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden">
            
            {/* Detalhe lateral de marca */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-leaf/20"></div>

            <div className="flex items-start gap-5">
              <div className="bg-brand-leaf/10 p-3 rounded-2xl text-brand-leaf shrink-0">
                <Cookie size={24} strokeWidth={1.5} />
              </div>

              <div className="flex-1">
                <h4 className="font-serif text-xl mb-1 text-brand-dark">{t.cookiesTitle}</h4>
                <p className="text-[11px] text-brand-dark/60 mb-6 font-light leading-relaxed">
                  {t.cookiesText}
                </p>

                {/* Estrutura de Botões RGPD */}
                <div className="flex flex-col gap-3 items-center w-full">
                  <button 
                    onClick={handleAcceptAll}
                    className="bg-brand-leaf text-white px-6 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-brand-dark hover:-translate-y-0.5 transition-all duration-300 w-full shadow-lg shadow-brand-leaf/20"
                  >
                    {t.cookiesAccept}
                  </button>
                  
                  <div className="flex gap-4 w-full justify-center pt-1">
                    <button 
                      onClick={handleEssentialsOnly}
                      className="text-brand-dark/40 text-[9px] tracking-widest uppercase font-bold hover:text-brand-leaf transition-all duration-300"
                    >
                      {t.cookiesReject}
                    </button>
                    
                    <a 
                      href="#" 
                      className="text-brand-dark/40 text-[9px] tracking-widest uppercase font-bold hover:text-brand-leaf border-b border-transparent hover:border-brand-leaf transition-all duration-300"
                    >
                      {t.cookiesMore}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};