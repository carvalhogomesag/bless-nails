// src/components/About.tsx
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext"; // Importamos o contexto dinâmico

export const About = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon(); // Acedemos aos dados (descrição e features) em tempo real

  return (
    <section id="sobre" className="section-padding bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* LADO DA IMAGEM: Mobile First (Vem primeiro no scroll do telemóvel) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-50px" }} 
          transition={{ duration: 0.8 }}
          className="relative px-4 md:px-0"
        >
          {/* Forma Orgânica "Folha" - Ajustada para escala mobile */}
          <div className="aspect-[4/5] rounded-tl-[5rem] rounded-br-[5rem] md:rounded-tl-[8rem] md:rounded-br-[8rem] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-2xl shadow-brand-leaf/10 relative">
            <div className="absolute inset-0 bg-brand-leaf/5 mix-blend-overlay z-10"></div>
            <img 
              src="/sobre-principal.png" 
              alt="Manicure Premium" 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          </div>
          
          {/* Elemento flutuante (Apenas Desktop para evitar poluição visual no mobile) */}
          <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full overflow-hidden border-[12px] border-brand-cream shadow-xl hidden lg:block">
            <img src="/sobre-detalhe.png" alt="Detail" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </motion.div>

        {/* LADO DO TEXTO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-brand-leaf uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-4 block">
            {t.ourEssence}
          </span>
          
          <h2 className="text-4xl md:text-6xl mb-6 md:mb-8 leading-tight text-brand-dark">
            {t.luxuryMeetsRelaxation}
          </h2>
          
          <p className="text-base md:text-xl text-brand-dark/70 leading-relaxed mb-10 font-light">
            {salonData.description[lang]}
          </p>
          
          {/* GRELHA DE ATRIBUTOS: Mobile First (2 colunas em quase todos os ecrãs) */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-6">
            {salonData.features[lang].map((feature, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 bg-white/40 p-3 md:py-3 md:px-4 rounded-xl md:rounded-2xl backdrop-blur-sm border border-brand-straw/20"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-leaf/10 flex items-center justify-center text-brand-leaf shrink-0">
                  <Check size={12} strokeWidth={3} className="md:w-3.5 md:h-3.5" />
                </div>
                <span className="text-[11px] md:text-sm font-medium text-brand-dark/80 leading-none">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};