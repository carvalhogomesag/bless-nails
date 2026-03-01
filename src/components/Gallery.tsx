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

  const rawPhotos = salonData.galleryPhotos?.filter(url => url && url.trim() !== "") || [];
  
  // Para criar o efeito de "continuidade" infinita visual, duplicamos os itens 
  // caso haja poucas fotos, garantindo que o scroll nunca pareça vazio.
  const activePhotos = rawPhotos.length > 0 && rawPhotos.length < 10 
    ? [...rawPhotos, ...rawPhotos] 
    : rawPhotos;

  if (activePhotos.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Ajuste de distância de scroll: 400px é ideal para o novo tamanho das fotos
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="galeria" className="py-24 bg-brand-leaf text-brand-cream relative overflow-hidden">
      {/* Background Decorativo - Brilho de luxo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-brand-dark/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-straw uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 block"
          >
            {t.gallerySubtitle}
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-serif italic font-light text-white leading-[1.1]">
            {t.gallery}
          </h2>
        </div>

        {/* Botões de Navegação Estilo Boutique */}
        <div className="flex gap-3">
          <button 
            onClick={() => scroll("left")}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-leaf transition-all duration-500 group active:scale-90"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-leaf transition-all duration-500 group active:scale-90"
            aria-label="Próximo"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* --- CARROSSEL ESTILO CATALOGO (NETFLIX) --- */}
      <div className="relative z-10">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-5 md:gap-8 px-6 md:px-[8%] pb-12 no-scrollbar snap-x snap-mandatory lg:snap-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activePhotos.map((photo, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              /* 
                 AJUSTE DE TAMANHO (AQUI ESTÁ O SEGREDO):
                 - Mobile: 80% da tela (w-[80vw])
                 - Computador: Reduzido para 320px (md:w-[320px]) para caberem vários no ecrã
              */
              className="relative flex-none w-[80vw] md:w-[320px] aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden snap-center cursor-pointer bg-brand-dark/20 border border-white/5 group/item shadow-2xl transition-all duration-500 hover:z-20 hover:border-brand-straw/30"
              onClick={() => setSelectedImg(photo)}
            >
              <img 
                src={photo} 
                alt="" 
                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              
              {/* Overlay Luxo */}
              <div className="absolute inset-0 bg-linear-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transform scale-50 group-hover/item:scale-100 transition-all duration-500 shadow-xl">
                  <ZoomIn size={28} strokeWidth={1} />
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Espaçador para permitir que a última foto "respire" no final do scroll */}
          <div className="flex-none w-12 md:w-[8vw]"></div>
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
            <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors">
              <X size={40} strokeWidth={1} />
            </button>
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