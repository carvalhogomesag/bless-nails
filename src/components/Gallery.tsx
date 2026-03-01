// src/components/Gallery.tsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Gallery = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activePhotos = salonData.galleryPhotos?.filter(url => url && url.trim() !== "") || [];

  if (activePhotos.length === 0) return null;

  // Função para scroll manual via botões (Desktop)
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="galeria" className="py-24 bg-brand-leaf text-brand-cream relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-straw uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 block"
          >
            {t.gallerySubtitle}
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-serif italic font-light text-white leading-tight">
            {t.gallery}
          </h2>
        </div>

        {/* Botões de Navegação (Visíveis apenas em Desktop) */}
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-straw hover:text-brand-leaf transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-straw hover:text-brand-leaf transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* --- CONTAINER ESTILO NETFLIX --- */}
      <div className="relative group">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-6 md:px-[10%] pb-12 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activePhotos.map((photo, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="relative flex-none w-[85vw] md:w-[450px] aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] overflow-hidden snap-center cursor-pointer bg-brand-dark/20 border border-white/10 group/item"
              onClick={() => setSelectedImg(photo)}
            >
              <img 
                src={photo} 
                alt="" 
                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              
              {/* Efeito Hover Luxuoso */}
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[3px]">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transform scale-50 group-hover/item:scale-100 transition-transform duration-500">
                  <ZoomIn size={28} strokeWidth={1} />
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Espaçador final para garantir que a última foto não fique cortada estranhamente */}
          <div className="flex-none w-6 md:w-[10vw]"></div>
        </div>
      </div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-brand-dark/98 backdrop-blur-2xl"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"><X size={40} strokeWidth={1} /></button>
            <motion.img 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={selectedImg} 
              className="max-w-full max-h-full rounded-3xl shadow-2xl object-contain border border-white/10" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};