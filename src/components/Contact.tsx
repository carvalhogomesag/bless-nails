// src/components/Contact.tsx
import { motion } from "motion/react";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext"; // <-- Importamos o contexto mágico

export const Contact = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon(); // <-- Trazemos os dados em tempo real

  return (
    <section id="contato" className="section-padding bg-brand-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand-leaf uppercase tracking-[0.2em] text-xs font-bold mb-4 block">{t.visitUs}</span>
          <h2 className="text-5xl md:text-6xl mb-12">{t.location}</h2>
          
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-brand-straw/20">
                <MapPin className="text-brand-leaf" size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xl mb-2">{t.location}</h4>
                <p className="text-brand-dark/60 mb-3 font-light text-lg">{salonData.address}</p>
                <a 
                  href={salonData.googleMapsUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-brand-leaf font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300 uppercase tracking-widest text-[10px]"
                >
                  {t.seeOnGoogleMaps} <ChevronRight size={14} />
                </a>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-brand-straw/20">
                <Clock className="text-brand-leaf" size={24} strokeWidth={1.5} />
              </div>
              <div className="w-full">
                <h4 className="text-xl mb-4">{t.openingHours}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                  {salonData.hours.map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-brand-straw/30 pb-2">
                      <span className="text-sm text-brand-dark/60 font-light">{h.day[lang]}</span>
                      <span className="text-sm font-medium text-brand-dark/80">{h.time === "Fechado" ? t.closed : h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          /* Formato orgânico (folha) no mapa e sombras suaves */
          className="overflow-hidden shadow-2xl shadow-brand-leaf/10 h-[400px] lg:h-[500px] rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-3xl rounded-bl-3xl border-8 border-white"
        >
          <iframe 
            src={salonData.mapEmbedUrl} /* <-- O URL dinâmico do mapa vem daqui agora! */
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter contrast-100 saturate-50" /* Dá um tom mais pastel e luxuoso ao Google Maps */
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};