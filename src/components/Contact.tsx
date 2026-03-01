// src/components/Contact.tsx
import { motion } from "motion/react";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Contact = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    <section id="contato" className="section-padding bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* INFORMAÇÕES DE CONTACTO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-leaf uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-4 block">
            {t.visitUs}
          </span>
          <h2 className="text-4xl md:text-6xl mb-10 md:mb-12 leading-tight">
            {t.location}
          </h2>
          
          <div className="space-y-8 md:space-y-10">
            {/* Bloco: Morada */}
            <div className="flex gap-5 md:gap-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-brand-straw/20">
                <MapPin className="text-brand-leaf" size={20} md:size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg md:text-xl mb-1 md:mb-2 font-serif">{t.location}</h4>
                <p className="text-sm md:text-lg text-brand-dark/60 mb-3 font-light leading-relaxed">
                  {salonData.address}
                </p>
                <a 
                  href={salonData.googleMapsUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-brand-leaf font-bold flex items-center gap-1 hover:gap-2 transition-all duration-300 uppercase tracking-widest text-[9px] md:text-[10px]"
                >
                  {t.seeOnGoogleMaps} <ChevronRight size={14} />
                </a>
              </div>
            </div>

            {/* Bloco: Horários */}
            <div className="flex gap-5 md:gap-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-brand-straw/20">
                <Clock className="text-brand-leaf" size={20} md:size={24} strokeWidth={1.5} />
              </div>
              <div className="w-full">
                <h4 className="text-lg md:text-xl mb-4 font-serif">{t.openingHours}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 md:gap-y-3">
                  {salonData.hours.map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-brand-straw/20 pb-2">
                      <span className="text-xs md:text-sm text-brand-dark/60 font-light">{h.day[lang]}</span>
                      <span className="text-xs md:text-sm font-medium text-brand-dark/80">
                        {h.time === "Fechado" ? t.closed : h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MAPA INTERATIVO: Mobile First */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          /* 
             No mobile, reduzimos a altura para 350px para não dominar o ecrã todo.
             A moldura orgânica escala proporcionalmente.
          */
          className="relative overflow-hidden shadow-2xl shadow-brand-leaf/10 h-87.5 md:h-125 rounded-tl-[4rem] rounded-br-[4rem] md:rounded-tl-[6rem] md:rounded-br-[6rem] rounded-tr-2xl rounded-bl-2xl border-4 md:border-8 border-white"
        >
          {/* Overlay de ajuda para scroll no mobile (evita que o utilizador fique "preso" no mapa ao fazer scroll) */}
          <div className="absolute inset-0 pointer-events-none bg-brand-dark/5 z-10 md:hidden"></div>
          
          <iframe 
            src={salonData.mapEmbedUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter contrast-100 saturate-[0.7] sepia-[0.2]" 
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};