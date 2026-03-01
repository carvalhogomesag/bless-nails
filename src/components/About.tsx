// src/components/About.tsx
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const About = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    /* Mudança para Fundo Verde Leaf e Texto Geral em Creme */
    <section id="sobre" className="section-padding bg-brand-leaf text-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* LADO DA IMAGEM */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 1 }}
          className="relative px-4 md:px-0"
        >
          {/* A moldura da imagem agora usa um leve brilho creme para destacar no fundo escuro */}
          <div className="aspect-4/5 rounded-tl-[6rem] rounded-br-[6rem] md:rounded-tl-[10rem] md:rounded-br-[10rem] rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-2xl shadow-black/20 relative border border-brand-cream/10">
            <div className="absolute inset-0 bg-brand-leaf/10 mix-blend-overlay z-10"></div>
            <img 
              src="/sobre-principal.png" 
              alt="Manicure Premium" 
              className="w-full h-full object-cover scale-105" 
              loading="lazy"
            />
          </div>
          
          {/* O detalhe circular agora tem a borda na cor do fundo (Leaf) para parecer flutuar sobre a foto */}
          <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full overflow-hidden border-12px border-brand-leaf shadow-2xl hidden lg:block">
            <img src="/sobre-detalhe.png" alt="Detail" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </motion.div>

        {/* LADO DO TEXTO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Subtítulo em cor Palha (Straw) para brilhar no fundo verde */}
          <span className="text-brand-straw uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 block">
            {t.ourEssence}
          </span>
          
          <h2 className="text-5xl md:text-7xl mb-8 leading-[1.1] text-white font-serif italic font-light">
            {t.luxuryMeetsRelaxation}
          </h2>
          
          <p className="text-lg md:text-xl text-brand-cream/80 leading-relaxed mb-12 font-light">
            {salonData.description[lang]}
          </p>
          
          {/* GRELHA DE ATRIBUTOS (Versão Editorial Clara) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 border-t border-brand-cream/20 pt-8">
            {salonData.features[lang].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="flex items-center gap-4 py-4 border-b border-brand-cream/10 group"
              >
                {/* Marcador agora em cor de Palha */}
                <div className="w-1.5 h-1.5 rounded-full bg-brand-straw opacity-60 group-hover:scale-150 group-hover:opacity-100 transition-all duration-500"></div>
                
                <span className="text-xl md:text-2xl font-serif italic text-brand-cream/90 group-hover:text-brand-straw transition-colors duration-500">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};