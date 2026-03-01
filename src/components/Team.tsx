// src/components/Team.tsx
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Team = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  if (!salonData.team || salonData.team.length === 0) return null;

  return (
    <section id="equipa" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-leaf uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-4 block">
            {t.teamSubtitle}
          </span>
          <h2 className="text-5xl md:text-6xl mb-6">{t.team}</h2>
          <div className="w-px h-16 bg-brand-leaf mx-auto opacity-30"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {salonData.team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="text-center group"
            >
              {/* Foto com formato orgânico luxuoso */}
              <div className="relative mb-8 mx-auto w-64 h-80 md:w-72 md:h-96">
                <div className="absolute inset-0 bg-brand-straw/20 rounded-t-[10rem] rounded-b-[2rem] transition-transform duration-700 group-hover:scale-105"></div>
                <div className="absolute inset-2 overflow-hidden rounded-t-[10rem] rounded-b-[2rem] shadow-xl">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    loading="lazy"
                  />
                </div>
              </div>

              <h3 className="text-3xl mb-2 text-brand-dark">{member.name}</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-leaf font-bold">
                {member.role[lang]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};