// src/components/Reviews.tsx
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext"; // Importamos o contexto dinâmico

export const Reviews = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon(); // Acedemos às reviews reais em tempo real

  return (
    <section id="avaliacoes" className="section-padding bg-brand-leaf text-brand-cream relative overflow-hidden">
      {/* Elementos decorativos de fundo - Otimizados para não causar scroll horizontal no mobile */}
      <div className="absolute top-[-5%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-10%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-brand-dark/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER: Mobile First (Stack vertical no mobile, horizontal no desktop) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
          <div className="max-w-xl">
            <span className="text-brand-straw uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-3 md:mb-4 block">
              {t.realExperiences}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              {t.whatClientsSay}
            </h2>
          </div>

          {/* Badge de Rating: Ajustado para mobile */}
          <div className="flex items-center gap-3 bg-white/10 px-6 py-3 md:px-8 md:py-4 rounded-full backdrop-blur-md border border-white/10 shrink-0">
            <div className="flex text-brand-straw">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="md:w-[18px] md:h-[18px]" />)}
            </div>
            <span className="font-medium tracking-wide text-sm md:text-base">
              4.9/5 <span className="opacity-60 font-light text-xs ml-1">(336 {t.reviews.toLowerCase()})</span>
            </span>
          </div>
        </div>

        {/* GRID DE REVIEWS: Mobile First (1 coluna telemóvel, 3 colunas desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {salonData.reviews.map((review, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-white/5 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-500 flex flex-col"
            >
              {/* Estrelas da Review */}
              <div className="flex gap-1 text-brand-straw mb-5 md:mb-6">
                {[...Array(review.rating)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
              </div>

              {/* Texto da Review: Ajustado para não ser demasiado longo no mobile */}
              <p className="text-lg md:text-xl italic font-serif mb-6 md:mb-8 leading-relaxed font-light text-brand-cream/90 flex-grow">
                "{review.text[lang]}"
              </p>

              {/* Autor */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-straw rounded-full flex items-center justify-center text-brand-leaf font-bold text-base md:text-lg">
                  {review.author[0]}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold uppercase tracking-widest text-[10px] md:text-xs">
                    {review.author}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest opacity-40">Cliente Verificada</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};