// src/components/Reviews.tsx
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";
import { Star, Quote } from "lucide-react";

export const Reviews = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    <section id="reviews" className="py-24 md:py-32 bg-brand-dark overflow-hidden grain">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header editorial centralizado */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">
              {t.testimonials}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
              {lang === "pt" ? "Vozes da nossa comunidade." : "Voices from our community."}
            </h2>
            <div className="w-12 h-px bg-brand-gold mx-auto" />
          </motion.div>
        </div>

        {/* Grid de Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salonData.reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 p-10 relative group hover:bg-white/10 transition-all duration-500"
            >
              {/* Gold line at top */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-30" />
              
              {/* Quote Icon */}
              <div className="text-brand-gold/20 mb-8">
                <Quote size={40} fill="currentColor" />
              </div>

              {/* Estrelas */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-brand-gold" fill="currentColor" />
                ))}
              </div>

              {/* Texto */}
              <p className="text-white/80 text-base font-sans font-light italic leading-relaxed mb-8">
                "{review.text[lang]}"
              </p>

              {/* Autor */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-serif italic text-sm">
                  {review.author[0]}
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm tracking-wide">{review.author}</h4>
                  <span className="text-brand-gold/40 text-[10px] uppercase tracking-widest">Verified Client</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
