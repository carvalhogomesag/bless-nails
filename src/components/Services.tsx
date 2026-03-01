// src/components/Services.tsx
import { motion } from "motion/react";
import { Sparkles, Clock, CalendarCheck } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext"; // Contexto dinâmico para ler o link do Fresha

export const Services = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon(); // Dados em tempo real (incluindo bookingUrl)

  return (
    <section id="servicos" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl mb-6">{t.ourServices}</h2>
          <div className="w-px h-16 bg-brand-leaf mx-auto mb-6"></div>
          <p className="text-brand-dark/60 max-w-xl mx-auto text-lg font-light">{t.servicesSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {salonData.services.map((service, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.6 }} 
              className="bg-brand-cream/30 p-8 rounded-[2rem] hover:bg-white hover:shadow-[0_20px_40px_rgb(91,122,97,0.08)] transition-all duration-500 group border border-brand-straw/20 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Ícone Decorativo */}
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:bg-brand-leaf group-hover:text-white group-hover:rotate-6 transition-all duration-500 text-brand-leaf">
                <Sparkles size={24} strokeWidth={1.5} />
              </div>

              {/* Título e Descrição */}
              <h3 className="text-2xl mb-3 leading-tight text-brand-dark">{service.name[lang]}</h3>
              <p className="text-sm text-brand-dark/60 mb-8 flex-grow font-light leading-relaxed">
                {service.description[lang]}
              </p>
              
              {/* Info de Duração e Preço */}
              <div className="flex justify-between items-end mb-8 pt-6 border-t border-brand-straw/30">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-dark/40 block mb-1">{t.duration}</span>
                  <span className="text-sm font-medium flex items-center gap-1.5 text-brand-dark/80">
                    <Clock size={14} /> {service.duration}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-brand-dark/40 block mb-1">{t.price}</span>
                  <span className="text-3xl font-serif text-brand-leaf italic">€{service.price}</span>
                </div>
              </div>

              {/* BOTÃO DE AGENDAMENTO DIRETO */}
              <a 
                href={salonData.bookingUrl} 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-4 bg-brand-leaf/5 hover:bg-brand-leaf text-brand-leaf hover:text-white rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 flex items-center justify-center gap-2 border border-brand-leaf/10 hover:border-brand-leaf hover:shadow-lg hover:shadow-brand-leaf/20"
              >
                <CalendarCheck size={14} strokeWidth={2.5} />
                {t.bookNow}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};