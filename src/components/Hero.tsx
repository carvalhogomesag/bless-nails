import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { SALON_DATA, UI_STRINGS, Language } from "../constants";

export const Hero = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          alt="Bless Nails Interior" 
          className="w-full h-full object-cover opacity-40"
        />
        {/* Corrigido para bg-linear-to-b conforme sugestão do sistema */}
        <div className="absolute inset-0 bg-linear-to-b from-brand-cream/20 via-transparent to-brand-cream"></div>
      </div>

      {/* Adicionei pt-20 (padding-top) para afastar o texto do menu fixo */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-gold uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Príncipe Real, Lisboa
          </span>
          <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
            {lang === "pt" ? (
              <>Elegância em cada <br /><span className="italic text-brand-olive">detalhe.</span></>
            ) : lang === "en" ? (
              <>Elegance in every <br /><span className="italic text-brand-olive">detail.</span></>
            ) : (
              <>Elegancia en cada <br /><span className="italic text-brand-olive">detalle.</span></>
            )}
          </h1>
          <p className="text-lg md:text-xl text-brand-dark/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {SALON_DATA.tagline[lang]}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={SALON_DATA.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2">
              <Calendar size={18} />
              {t.bookTreatment}
            </a>
            <a href="#servicos" className="btn-outline">
              {t.viewServices}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Removi o bloco do "SCROLL" que aparecia aqui embaixo */}
    </section>
  );
};