// src/components/Services.tsx
import { motion } from "motion/react";
import { Sparkles, Clock, CalendarCheck } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Services = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    /* Mudamos o fundo da secção para criar contraste com o card branco */
    <section id="servicos" className="section-padding bg-brand-cream/50 relative overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-leaf/5 rounded-full blur-[120px] pointer-events-none"></div>
      
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
          <div className="w-24 h-1 bg-brand-leaf mx-auto mb-6 rounded-full"></div>
          <p className="text-brand-dark/60 max-w-xl mx-auto text-lg font-light leading-relaxed px-4">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {salonData.services.map((service, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.7 }} 
              /* 
                 EFEITO PROFUNDIDADE:
                 - bg-white puro
                 - border-2 para destacar
                 - shadow-xl base para tirar do fundo
                 - hover:shadow-2xl com cor Leaf para o efeito UAU
              */
              className="bg-white p-8 rounded-[3rem] transition-all duration-500 group border-2 border-brand-straw/40 hover:border-brand-leaf/40 flex flex-col h-full relative shadow-[0_15px_40px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-12px_rgba(91,122,97,0.25)] hover:-translate-y-4"
            >
              {/* Overlay interno de brilho */}
              <div className="absolute inset-0 rounded-[3rem] bg-linear-to-tr from-brand-straw/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              {/* Ícone com destaque elevado */}
              <div className="w-16 h-16 bg-brand-cream rounded-2xl shadow-inner flex items-center justify-center mb-8 group-hover:bg-brand-leaf group-hover:text-white group-hover:rotate-6 transition-all duration-500 text-brand-leaf relative border border-brand-straw/20">
                <Sparkles size={28} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl mb-4 leading-tight text-brand-dark font-serif font-bold group-hover:text-brand-leaf transition-colors duration-300">
                {service.name[lang]}
              </h3>
              
              <p className="text-sm text-brand-dark/60 mb-10 flex-grow font-light leading-relaxed">
                {service.description[lang]}
              </p>
              
              {/* Rodapé do Card com fundo sutil para separar as informações */}
              <div className="bg-brand-cream/30 -mx-8 px-8 py-6 mb-8 border-t border-b border-brand-straw/20">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-brand-dark/40 font-bold">{t.duration}</span>
                    <span className="text-sm font-semibold flex items-center gap-1.5 text-brand-dark/80">
                      <Clock size={14} className="text-brand-leaf" /> {service.duration}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-brand-dark/40 font-bold block mb-1">{t.price}</span>
                    <div className="flex items-start justify-end">
                      <span className="text-sm text-brand-straw font-bold mt-1">€</span>
                      <span className="text-4xl font-serif text-brand-leaf italic leading-none ml-0.5">{service.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTÃO COM PROFUNDIDADE (SOMBRA PRÓPRIA) */}
              <a 
                href={salonData.bookingUrl} 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-4 bg-brand-dark text-white rounded-2xl text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 flex items-center justify-center gap-2 shadow-lg shadow-brand-dark/20 hover:bg-brand-leaf hover:shadow-brand-leaf/40 hover:scale-[1.05] active:scale-95"
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