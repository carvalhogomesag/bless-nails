// src/components/Team.tsx
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Team = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    <section id="equipa" className="py-24 md:py-32 bg-brand-ivory grain">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header editorial */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-brand-forest uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">
            {t.ourTeam}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-brand-dark mb-6">
            {lang === "pt" ? "Mãos que criam arte." : "Hands that create art."}
          </h2>
          <div className="w-12 h-px bg-brand-gold" />
        </div>

        {/* Grid de Membros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {salonData.team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              {/* Frame da Foto — Editorial rounded-t */}
              <div className="aspect-[3/4] overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border border-brand-forest/5 mb-8 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-forest/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-2xl font-serif text-brand-dark mb-2">{member.name}</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold mb-4 block">
                  {member.role[lang]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
