// src/components/Hero.tsx
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Hero = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    <section className="relative min-h-[100svh] flex items-end justify-center overflow-hidden bg-brand-dark grain">
      
      {/* ── IMAGEM DOMINANTE com overlay gradiente ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/salon/1920/1080"
          alt="Bless Nails Lisbon"
          className="w-full h-full object-cover opacity-60"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Gradiente de baixo para cima — cria profundidade sem esconder a imagem */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-brand-dark/10" />
        {/* Vinheta lateral subtil */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/30 via-transparent to-brand-dark/30" />
      </div>

      {/* ── CONTEÚDO — pt-32 garante espaço acima da navbar fixa ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-24 md:pb-32">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-brand-gold uppercase tracking-[0.35em] text-[9px] font-medium">
              Príncipe Real · Lisboa
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-serif leading-[0.92] text-white mb-6"
          >
            {lang === "pt" ? (
              <>Elegância<br /><span className="italic font-light text-brand-sage">em cada detalhe.</span></>
            ) : lang === "en" ? (
              <>Elegance<br /><span className="italic font-light text-brand-sage">in every detail.</span></>
            ) : (
              <>Elegancia<br /><span className="italic font-light text-brand-sage">en cada detalle.</span></>
            )}
          </motion.h1>

          {/* Linha decorativa */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="w-32 h-px bg-gradient-to-r from-brand-gold to-transparent mb-8"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="text-white/60 text-base md:text-lg font-sans font-light leading-relaxed mb-12 max-w-md"
          >
            {salonData.tagline[lang]}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href={salonData.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary">
              {t.bookTreatment}
            </a>
            <a href="#servicos" className="btn-outline border-white/30 text-white hover:bg-white hover:text-brand-dark">
              {t.viewServices}
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 right-8 md:right-12 z-10 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[8px] tracking-[0.35em] uppercase font-medium rotate-90 origin-center mb-4">
          {t.scroll}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
};