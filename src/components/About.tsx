import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SALON_DATA, UI_STRINGS, Language } from "../constants";

export const About = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section id="sobre" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
          <div className="aspect-4/5 rounded-t-full overflow-hidden border-8 border-brand-cream">
            <img src="/sobre-principal.png" alt="Manicure" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full overflow-hidden border-8 border-white hidden lg:block">
            <img src="/sobre-detalhe.png" alt="Detail" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-brand-gold font-serif italic text-xl mb-2 block">{t.ourEssence}</span>
          <h2 className="text-4xl md:text-5xl mb-8">{t.luxuryMeetsRelaxation}</h2>
          <p className="text-brand-dark/70 leading-relaxed mb-8 text-lg">
            {SALON_DATA.description[lang]}
          </p>
          <div className="grid grid-cols-2 gap-6">
            {SALON_DATA.features[lang].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-brand-gold" />
                <span className="text-sm font-medium opacity-80">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};