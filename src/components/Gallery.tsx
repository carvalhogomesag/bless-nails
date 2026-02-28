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

  // Filtramos os links vazios, caso o admin não use os 10 espaços
  const activePhotos = salonData.galleryPhotos?.filter(url => url.trim() !== "") ||[];

  if (activePhotos.length === 0) return null;

  return (
    <section id="galeria" className="section-padding bg-brand-cream/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-leaf uppercase tracking-[0.2em] text-xs font-bold mb-4 block">{t.gallerySubtitle}</span>
          <h2 className="text-5xl md:text-6xl mb-6">{t.gallery}</h2>
        </div>

        {/* CSS Multi-Column (Estilo Pinterest/Masonry) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {activePhotos.map((photo, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="relative group overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-brand-leaf/20 transition-all duration-500 break-inside-avoid rounded-[2rem] hover:rounded-[3rem] hover:rounded-tl-none hover:rounded-br-none"
              onClick={() => setSelectedImg(photo)}
            >
              <img src={photo} alt={`Galeria ${i + 1}`} className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
              
              {/* Overlay Elegante no Hover */}
              <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <ZoomIn size={24} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal (Tela Cheia) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-brand-dark/95 backdrop-blur-xl"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors" onClick={() => setSelectedImg(null)}>
              <X size={36} strokeWidth={1} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImg} 
              alt="Ampliada" 
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain border border-white/10" 
              onClick={(e) => e.stopPropagation()} // Previne fechar ao clicar na própria imagem
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};