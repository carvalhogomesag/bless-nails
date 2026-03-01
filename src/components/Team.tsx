// src/components/Team.tsx
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Team = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  // Se não houver ninguém na equipa, a secção não aparece
  if (!salonData.team || salonData.team.length === 0) return null;

  return (
    /* Fundo Creme para contrastar com o Verde da Galeria acima */
    <section id="equipa" className="section-padding bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-leaf uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-4 block"
          >
            {t.teamSubtitle}
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl mb-6 font-serif italic font-light text-brand-dark">
            {t.team}
          </h2>
          
          {/* A linha horizontal moderna e grossa que define a nossa assinatura visual */}
          <div className="w-24 h-1 bg-brand-leaf mx-auto mb-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          {salonData.team.map((member: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="text-center group"
            >
              {/* Foto com moldura orgânica de luxo (Cápsula) */}
              <div className="relative mb-10 mx-auto w-64 h-80 md:w-80 md:h-[420px]">
                {/* Fundo decorativo que se move no hover */}
                <div className="absolute inset-0 bg-brand-straw/30 rounded-t-[12rem] rounded-b-[3rem] transition-all duration-700 group-hover:scale-105 group-hover:-rotate-2"></div>
                
                {/* Contentor da Imagem (Suporta jpg, png, webp) */}
                <div className="absolute inset-3 overflow-hidden rounded-t-[12rem] rounded-b-[3rem] shadow-2xl bg-white border border-brand-straw/20">
                  <img 
                    src={member.image || "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=800&auto=format&fit=crop"} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                    loading="lazy"
                    onError={(e) => {
                       e.currentTarget.src = "https://via.placeholder.com/400x600?text=Bless+Nails+Staff";
                    }}
                  />
                </div>
              </div>

              {/* Tipografia refinada para o nome e cargo */}
              <h3 className="text-3xl md:text-4xl font-serif text-brand-dark mb-2 tracking-tight">
                {member.name}
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand-leaf font-bold">
                {member.role[lang] || member.role.pt}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};