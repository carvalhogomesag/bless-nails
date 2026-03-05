// src/components/About.tsx
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const About = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    <section id="sobre" className="relative py-24 md:py-32 bg-brand-forest overflow-hidden grain">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* ── IMAGEM — Frame editorial limpo ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-4/5 overflow-hidden border border-brand-gold/20">
              <img
                src="https://picsum.photos/seed/about/800/1000"
                alt="Bless Nails Experience"
                className="w-full h-full object-cover grayscale-20 hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Detalhe decorativo flutuante */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-brand-gold/30 rounded-full flex items-center justify-center bg-brand-forest/80 backdrop-blur-sm">
              <span className="text-brand-gold font-serif italic text-sm">Est. 2023</span>
            </div>
          </motion.div>

          {/* ── TEXTO — Tipografia refinada ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-medium">
                {t.aboutUs}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-tight">
              {lang === "pt" ? (
                <>Onde a arte encontra <span className="italic font-light text-brand-sage">o seu bem-estar.</span></>
              ) : lang === "en" ? (
                <>Where art meets <span className="italic font-light text-brand-sage">your well-being.</span></>
              ) : (
                <>Donde el arte encuentra <span className="italic font-light text-brand-sage">su bienestar.</span></>
              )}
            </h2>

            <div className="w-24 h-px bg-brand-gold/30 mb-8" />

            <p className="text-white/70 text-lg font-sans font-light leading-relaxed mb-12">
              {salonData.description?.[lang] ?? salonData.description?.pt ?? ""}
            </p>

            {/* Features com marcadores gold */}
            <div className="space-y-6">
              {[
                { pt: "Atendimento Personalizado", en: "Personalized Service", es: "Atención Personalizada" },
                { pt: "Produtos Premium & Vegan", en: "Premium & Vegan Products", es: "Productos Premium y Veganos" },
                { pt: "Ambiente Exclusivo", en: "Exclusive Atmosphere", es: "Ambiente Exclusivo" }
              ].map((feature, idx) => (
                <div key={idx} className="group flex items-center gap-4">
                  <div className="w-6 h-px bg-brand-gold group-hover:w-12 transition-all duration-500" />
                  <span className="text-white/90 text-sm uppercase tracking-widest font-medium">
                    {feature[lang]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
