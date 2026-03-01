// src/components/Gallery.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Gallery = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const activePhotos = salonData.galleryPhotos?.filter(url => url && url.trim() !== "") || [];

  if (activePhotos.length === 0) return null;

  return (
    /* Mudança para Fundo Verde Leaf e Texto Claro */
    <section id="galeria" className="section-padding bg-brand-leaf text-brand-cream relative overflow-hidden">
      {/* Brilho sutil de fundo para dar profundidade ao verde */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-straw uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 block"
          >
            {t.gallerySubtitle}
          </motion.span>
          <h2 className="text-5xl md:text-7xl mb-6 font-serif italic font-light text-white">{t.gallery}</h2>
          <div className="w-24 h-1 bg-brand-straw/40 mx-auto mb-6 rounded-full"></div>
        </div>

        {/* Masonry Grid com bordas que contrastam com o fundo escuro */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {activePhotos.map((photo, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className="relative group overflow-hidden cursor-pointer shadow-2xl rounded-[2.5rem] bg-brand-dark/20 border border-white/10"
              onClick={() => setSelectedImg(photo)}
            >
              <img 
                src={photo} 
                alt="" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.classList.add('hidden');
                }}
              />
              
              {/* Overlay com Glassmorphism no Hover */}
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[3px]">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transform scale-50 group-hover:scale-100 transition-transform duration-500">
                  <ZoomIn size={28} strokeWidth={1} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal (Manteve-se dark, mas afinamos os detalhes) */}
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
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              src={selectedImg} 
              className="max-w-full max-h-full rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] object-contain border border-white/10" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};