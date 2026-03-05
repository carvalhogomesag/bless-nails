// src/components/Gallery.tsx
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Gallery = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.8; // Aproximação do snap
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.8;
      const newIndex = Math.round(scrollRef.current.scrollLeft / cardWidth);
      if (newIndex !== activeIndex) setActiveIndex(newIndex);
    }
  };

  return (
    <section id="galeria" className="py-24 md:py-32 bg-brand-forest overflow-hidden grain">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header editorial split */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">
              {t.gallery}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              {lang === "pt" ? "A nossa curadoria visual." : "Our visual curation."}
            </h2>
          </div>
          
          {/* Controlos de navegação */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-forest transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollToIndex(Math.min(salonData.galleryPhotos.length - 1, activeIndex + 1))}
              className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-forest transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carrossel Snap */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12"
        >
          {salonData.galleryPhotos.filter(img => img).map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="min-w-[80%] md:min-w-[45%] lg:min-w-[30%] aspect-[3/4] snap-start relative group overflow-hidden border border-white/10"
            >
              <img
                src={img}
                alt={`Gallery ${idx}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Indicadores de posição */}
        <div className="flex justify-center gap-3 mt-8">
          {salonData.galleryPhotos.filter(img => img).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1 transition-all duration-500 ${
                activeIndex === idx ? "w-12 bg-brand-gold" : "w-4 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
