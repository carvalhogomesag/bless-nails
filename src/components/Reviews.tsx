// src/components/Reviews.tsx
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { SALON_DATA, UI_STRINGS, Language } from "../constants";

export const Reviews = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section id="avaliacoes" className="section-padding bg-brand-leaf text-brand-cream relative overflow-hidden">
      {/* Efeito orgânico de fundo */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-brand-dark/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-brand-straw uppercase tracking-[0.2em] text-xs font-bold mb-4 block">{t.realExperiences}</span>
            <h2 className="text-5xl md:text-6xl font-serif">{t.whatClientsSay}</h2>
          </div>
          <div className="flex items-center gap-4 bg-white/10 px-8 py-4 rounded-full backdrop-blur-md border border-white/10">
            <div className="flex text-brand-straw">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="font-medium tracking-wide">4.9/5 <span className="opacity-60 font-light text-sm ml-1">(336 {t.reviews.toLowerCase()})</span></span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SALON_DATA.reviews.map((review, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-colors duration-500"
            >
              <div className="flex gap-1 text-brand-straw mb-6">
                {[...Array(review.rating)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
              </div>
              <p className="text-xl italic font-serif mb-8 leading-relaxed font-light text-brand-cream/90">
                "{review.text[lang]}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-straw rounded-full flex items-center justify-center text-brand-leaf font-bold text-lg">
                  {review.author[0]}
                </div>
                <span className="font-semibold uppercase tracking-widest text-xs">{review.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};