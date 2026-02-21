import { motion } from "motion/react";
import { Sparkles, Clock, ChevronRight } from "lucide-react";
import { SALON_DATA, UI_STRINGS, Language } from "../constants";

export const Services = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section id="servicos" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">{t.ourServices}</h2>
          <div className="w-24 h-px bg-brand-gold mx-auto mb-6"></div>
          <p className="text-brand-dark/60 max-w-xl mx-auto">{t.servicesSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SALON_DATA.services.map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group border border-brand-cream">
              <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-olive group-hover:text-white transition-colors">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl mb-2 min-h-14">{service.name[lang]}</h3>
              <p className="text-sm text-brand-dark/60 mb-6 line-clamp-2">{service.description[lang]}</p>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs uppercase tracking-widest opacity-50 block mb-1">{t.duration}</span>
                  <span className="font-medium flex items-center gap-1"><Clock size={14} /> {service.duration}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-widest opacity-50 block mb-1">{t.price}</span>
                  <span className="text-2xl font-serif text-brand-gold">€{service.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};