import { motion } from "motion/react";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import { SALON_DATA, UI_STRINGS, Language } from "../constants";

export const Contact = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section id="contato" className="section-padding">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl mb-8">{t.visitUs}</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <MapPin className="text-brand-gold" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{t.location}</h4>
                <p className="text-brand-dark/70 mb-2">{SALON_DATA.address}</p>
                <a 
                  href={SALON_DATA.googleMapsUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-brand-gold font-medium flex items-center gap-1 hover:underline"
                >
                  {t.seeOnGoogleMaps} <ChevronRight size={14} />
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <Clock className="text-brand-gold" />
              </div>
              <div className="w-full">
                <h4 className="font-bold mb-4">{t.openingHours}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                  {SALON_DATA.hours.map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-brand-cream pb-1">
                      <span className="text-sm opacity-60">{h.day[lang]}</span>
                      <span className="text-sm font-medium">{h.time === "Fechado" ? t.closed : h.time}</span>
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
          /* Aqui corrigimos de h-[400px] para h-100 para remover o aviso amarelo */
          className="rounded-3xl overflow-hidden shadow-2xl h-100 lg:h-auto border-8 border-white"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.123456789!2d-9.148!3d38.716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19337f7f7f7f7f%3A0x7f7f7f7f7f7f7f7f!2sRua%20de%20O%20S%C3%A9culo%20154%2C%201200-437%20Lisboa!5e0!3m2!1spt!2spt!4v1234567890" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};