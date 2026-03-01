// src/components/Services.tsx
import { motion } from "motion/react";
import { Sparkles, Clock, CalendarCheck } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Services = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    <section id="servicos" className="section-padding bg-white relative overflow-hidden">
      {/* Elemento Decorativo de Fundo para dar "Vida" à secção */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-leaf/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-leaf uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 block"
          >
            {t.luxuryMeetsRelaxation}
          </motion.span>
          <h2 className="text-5xl md:text-7xl mb-6 text-brand-dark">{t.ourServices}</h2>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-brand-leaf to-transparent mx-auto mb-6"></div>
          <p className="text-brand-dark/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {salonData.services.map((service, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} 
              className="bg-white p-8 rounded-[2.5rem] hover:bg-brand-cream/40 transition-all duration-500 group border border-brand-straw/30 hover:border-brand-leaf/30 flex flex-col h-full relative shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(91,122,97,0.12)] hover:-translate-y-3"
            >
              {/* Canto Decorativo (Sutil) */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-straw/5 rounded-bl-full -z-10 group-hover:bg-brand-leaf/10 transition-colors duration-500"></div>

              {/* Ícone com Aura de Cor */}
              <div className="w-16 h-16 bg-brand-cream rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:bg-brand-leaf group-hover:text-white group-hover:rotate-12 transition-all duration-500 text-brand-leaf relative">
                <div className="absolute inset-0 bg-brand-leaf/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Sparkles size={28} strokeWidth={1.5} className="relative z-10" />
              </div>

              {/* Título e Descrição com melhor contraste */}
              <h3 className="text-2xl mb-4 leading-tight text-brand-dark font-serif group-hover:text-brand-leaf transition-colors duration-300">
                {service.name[lang]}
              </h3>
              <p className="text-sm text-brand-dark/60 mb-8 flex-grow font-light leading-relaxed italic">
                {service.description[lang]}
              </p>
              
              {/* Zona de Preço e Duração "Viva" */}
              <div className="flex justify-between items-end mb-8 pt-6 border-t border-brand-straw/40">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-brand-dark/40 font-bold">{t.duration}</span>
                  <span className="text-sm font-semibold flex items-center gap-1.5 text-brand-dark/80 bg-brand-straw/10 px-2 py-0.5 rounded-lg">
                    <Clock size={14} className="text-brand-leaf" /> {service.duration}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-brand-dark/40 font-bold block mb-1">{t.price}</span>
                  <span className="text-4xl font-serif text-brand-leaf italic leading-none">
                    <span className="text-lg text-brand-straw mr-0.5 not-italic">€</span>
                    {service.price}
                  </span>
                </div>
              </div>

              {/* BOTÃO DE AGENDAMENTO COM GRADIENTE AO PASSAR O RATO */}
              <a 
                href={salonData.bookingUrl} 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-4 bg-brand-dark text-white rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 flex items-center justify-center gap-2 shadow-lg shadow-brand-dark/10 hover:bg-brand-leaf hover:shadow-brand-leaf/30 hover:scale-[1.02] active:scale-95"
              >
                <CalendarCheck size={16} strokeWidth={2} />
                {t.bookNow}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};