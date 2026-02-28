// src/components/Gallery.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ImageOff } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Gallery = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const activePhotos = salonData.galleryPhotos?.filter(url => url && url.trim() !== "") || [];

  if (activePhotos.length === 0) return null;

  return (
    <section id="galeria" className="section-padding bg-brand-cream/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-leaf uppercase tracking-[0.2em] text-xs font-bold mb-4 block">{t.gallerySubtitle}</span>
          <h2 className="text-5xl md:text-6xl mb-6">{t.gallery}</h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {activePhotos.map((photo, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="relative group overflow-hidden cursor-pointer shadow-md rounded-[2rem] bg-white min-h-[200px] flex items-center justify-center"
              onClick={() => setSelectedImg(photo)}
            >
              <img 
                src={photo} 
                alt="" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                // Se a imagem falhar, mostramos um fundo elegante com ícone em vez do erro do navegador
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.classList.add('bg-brand-straw/10');
                }}
              />
              
              <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <ZoomIn size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-brand-dark/95 backdrop-blur-xl"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white"><X size={36} /></button>
            <motion.img 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={selectedImg} className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};