// src/components/About.tsx
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SALON_DATA, UI_STRINGS, Language } from "../constants";

export const About = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section id="sobre" className="section-padding bg-brand-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
          {/* Efeito UAU de forma orgânica lembrando uma folha */}
          <div className="aspect-[4/5] rounded-tl-[8rem] rounded-br-[8rem] rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-2xl shadow-brand-leaf/10 relative">
            <div className="absolute inset-0 bg-brand-leaf/10 mix-blend-overlay z-10"></div>
            <img src="/sobre-principal.png" alt="Manicure" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full overflow-hidden border-[12px] border-brand-cream shadow-xl hidden lg:block">
            <img src="/sobre-detalhe.png" alt="Detail" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-brand-leaf uppercase tracking-[0.2em] text-xs font-bold mb-4 block">{t.ourEssence}</span>
          <h2 className="text-5xl md:text-6xl mb-8 leading-tight">{t.luxuryMeetsRelaxation}</h2>
          <p className="text-brand-dark/70 leading-relaxed mb-10 text-lg md:text-xl font-light">
            {SALON_DATA.description[lang]}
          </p>
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-6">
            {SALON_DATA.features[lang].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/50 py-3 px-4 rounded-2xl backdrop-blur-sm border border-brand-straw/20">
                <div className="w-8 h-8 rounded-full bg-brand-straw/30 flex items-center justify-center text-brand-leaf shrink-0">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-brand-dark/80">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};