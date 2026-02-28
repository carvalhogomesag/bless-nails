// src/components/Hero.tsx
import { motion } from "motion/react";
import { SALON_DATA, UI_STRINGS, Language } from "../constants";

export const Hero = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-brand-cream">
      <div className="absolute inset-0 z-0">
        {/* A imagem original agora com um filtro mais claro e elegante */}
        <img src="/hero-bg.png" alt="Bless Nails Interior" className="w-full h-full object-cover opacity-30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/40 via-brand-cream/10 to-brand-cream"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          <span className="text-brand-leaf uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 block">
            Príncipe Real, Lisboa
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif mb-8 leading-[0.9] text-brand-dark">
            {lang === "pt" ? (
              <>Elegância em <br /><span className="italic text-brand-leaf font-light">cada detalhe.</span></>
            ) : lang === "en" ? (
              <>Elegance in <br /><span className="italic text-brand-leaf font-light">every detail.</span></>
            ) : (
              <>Elegancia en <br /><span className="italic text-brand-leaf font-light">cada detalle.</span></>
            )}
          </h1>
          <p className="text-lg md:text-2xl text-brand-dark/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            {SALON_DATA.tagline[lang]}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href={SALON_DATA.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary">
              {t.bookTreatment}
            </a>
            <a href="#servicos" className="btn-outline">
              {t.viewServices}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};