// src/components/Gallery.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Gallery = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const rawPhotos = salonData.galleryPhotos?.filter(url => url && url.trim() !== "") || [];
  
  // EFEITO CIRCULAR: Triplicamos a lista para permitir scroll infinito visual para ambos os lados
  const displayPhotos = rawPhotos.length > 0 
    ? [...rawPhotos, ...rawPhotos, ...rawPhotos] 
    : [];

  // Posiciona o scroll no "meio" da lista triplicada ao carregar
  useEffect(() => {
    if (scrollRef.current && rawPhotos.length > 0) {
      const container = scrollRef.current;
      const cardWidth = container.querySelector('div')?.offsetWidth || 0;
      const gap = 24; // correspondente a gap-6 (1.5rem = 24px)
      
      // Calculamos o ponto exato para começar na primeira foto do segundo bloco (o bloco do meio)
      const scrollTo = (cardWidth + gap) * rawPhotos.length;
      container.scrollLeft = scrollTo;
    }
  }, [rawPhotos.length]);

  if (displayPhotos.length === 0) return null;

  return (
    <section id="galeria" className="py-24 bg-brand-leaf text-brand-cream relative overflow-hidden">
      {/* Luz ambiente de luxo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
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
        <div className="w-24 h-1 bg-brand-straw/30 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* --- CATÁLOGO CIRCULAR (FLUXO INFINITO VISUAL) --- */}
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-20 no-scrollbar snap-x snap-mandatory"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            // O padding lateral cria o efeito "peeking" (fotos das pontas visíveis)
            paddingLeft: '15%', 
            paddingRight: '15%' 
          }}
        >
          {displayPhotos.map((photo, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0.5, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              /* 
                 Tamanhos optimizados para Mobile e Desktop:
                 - Mobile: w-[70vw] (permite ver 15% de cada lado)
                 - Desktop: w-[400px]
              */
              className="relative flex-none w-[70vw] md:w-[400px] aspect-[3/4] rounded-[3rem] overflow-hidden snap-center cursor-pointer bg-brand-dark/20 border border-white/10 group shadow-2xl transition-all duration-500"
              onClick={() => setSelectedImg(photo)}
            >
              <img 
                src={photo} 
                alt="" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              
              {/* Overlay minimalista */}
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <ZoomIn size={28} strokeWidth={1} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-brand-dark/98 backdrop-blur-2xl"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white"><X size={40} /></button>
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