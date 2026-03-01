// src/components/Hero.tsx
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext"; // Importamos o contexto dinâmico

export const Hero = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon(); // Acedemos aos dados em tempo real

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-brand-cream">
      {/* Background Otimizado */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          alt="Bless Nails Interior" 
          className="w-full h-full object-cover opacity-25 mix-blend-multiply" 
          loading="eager" // Mobile First: Imagem de topo carrega imediatamente
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/60 via-brand-cream/20 to-brand-cream"></div>
      </div>

      {/* Conteúdo Central */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 md:pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-brand-leaf uppercase tracking-[0.3em] text-[9px] md:text-xs font-bold mb-6 block">
            Príncipe Real, Lisboa
          </span>
          
          {/* Tipografia Responsiva: Menor no telemóvel para não forçar scroll excessivo */}
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif mb-8 leading-[1.1] md:leading-[0.9] text-brand-dark">
            {lang === "pt" ? (
              <>Elegância em <br className="hidden md:block" /><span className="italic text-brand-leaf font-light">cada detalhe.</span></>
            ) : lang === "en" ? (
              <>Elegance in <br className="hidden md:block" /><span className="italic text-brand-leaf font-light">every detail.</span></>
            ) : (
              <>Elegancia en <br className="hidden md:block" /><span className="italic text-brand-leaf font-light">cada detalle.</span></>
            )}
          </h1>

          <p className="text-base md:text-2xl text-brand-dark/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed px-2 md:px-0">
            {salonData.tagline[lang]}
          </p>

          {/* Botões: Largura total no telemóvel para facilitar o toque (Thumb Zone) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href={salonData.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary w-full sm:w-auto">
              {t.bookTreatment}
            </a>
            <a href="#servicos" className="btn-outline w-full sm:w-auto">
              {t.viewServices}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};