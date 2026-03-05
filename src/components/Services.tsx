// src/components/Services.tsx
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";
import { Sparkles } from "lucide-react";

export const Services = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    <section id="servicos" className="py-24 md:py-32 bg-brand-ivory grain">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header da Secção */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-brand-forest uppercase tracking-[0.4em] text-[10px] font-bold mb-4">
              {t.ourServices}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-dark mb-6">
              {lang === "pt" ? "Experiências de Luxo" : lang === "en" ? "Luxury Experiences" : "Experiencias de Lujo"}
            </h2>
            <div className="w-12 h-px bg-brand-gold" />
          </motion.div>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salonData.services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white border border-brand-forest/5 p-8 md:p-10 flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:shadow-brand-forest/5"
            >
              {/* Ícone / Categoria */}
              <div className="mb-8 flex items-center justify-between">
                <div className="w-12 h-12 border border-brand-gold flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500">
                  <Sparkles size={20} />
                </div>
              </div>

              {/* Título e Descrição */}
              <h3 className="text-2xl font-serif text-brand-dark mb-4 group-hover:text-brand-forest transition-colors duration-300">
                {service.name[lang]}
              </h3>
              <p className="text-brand-dark/60 text-sm font-light leading-relaxed mb-8 flex-grow">
                {service.description[lang]}
              </p>

              {/* Preço e CTA */}
              <div className="pt-8 border-t border-brand-forest/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-tighter text-brand-forest/40">{t.startingAt}</span>
                  <span className="text-2xl font-serif text-brand-forest">{service.price}</span>
                </div>
                <a
                  href={salonData.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-dark hover:text-brand-gold transition-colors duration-300 flex items-center gap-2"
                >
                  {t.bookNow}
                  <div className="w-4 h-px bg-brand-dark group-hover:w-8 transition-all duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota de Rodapé */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-brand-forest/40 text-[10px] uppercase tracking-[0.3em] italic">
            {lang === "pt" ? "Todos os nossos produtos são vegan e cruelty-free" : "All our products are vegan and cruelty-free"}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
