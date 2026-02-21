import { motion } from "motion/react";
import { Star } from "lucide-react";
import { SALON_DATA, UI_STRINGS, Language } from "../constants";

export const Reviews = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section id="avaliacoes" className="section-padding bg-brand-olive text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-10">
        <Star size={200} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-brand-gold font-serif italic text-xl mb-2 block">{t.realExperiences}</span>
            <h2 className="text-4xl md:text-5xl">{t.whatClientsSay}</h2>
          </div>
          <div className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
            <div className="flex text-brand-gold">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="font-medium">4.9/5 (336 {t.reviews.toLowerCase()})</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SALON_DATA.reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm"
            >
              <div className="flex gap-1 text-brand-gold mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-lg italic font-serif mb-6 leading-relaxed">
                "{review.text[lang]}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-olive font-bold">
                  {review.author[0]}
                </div>
                <span className="font-medium uppercase tracking-widest text-xs">{review.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};