// src/components/Team.tsx
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Team = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  // Se não houver ninguém na equipa, a secção nem aparece para não ficar vazia
  if (!salonData.team || salonData.team.length === 0) return null;

  return (
    <section id="equipa" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-leaf uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-4 block">
            {t.teamSubtitle}
          </span>
          <h2 className="text-5xl md:text-6xl mb-6">{t.team}</h2>
          <div className="w-px h-16 bg-brand-leaf mx-auto opacity-20"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-20">
          {salonData.team.map((member: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="text-center group"
            >
              {/* Foto com moldura orgânica de luxo */}
              <div className="relative mb-8 mx-auto w-64 h-80 md:w-72 md:h-96">
                {/* Fundo decorativo (Palha) que mexe no hover */}
                <div className="absolute inset-0 bg-brand-straw/20 rounded-t-[10rem] rounded-b-[2rem] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2"></div>
                
                {/* Contentor da Imagem */}
                <div className="absolute inset-2 overflow-hidden rounded-t-[10rem] rounded-b-[2rem] shadow-2xl">
                  <img 
                    src={member.image || "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=800&auto=format&fit=crop"} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                    loading="lazy"
                    onError={(e) => {
                       // Se o link da imagem falhar, mostra um fundo cinza elegante
                       e.currentTarget.src = "https://via.placeholder.com/400x500?text=Bless+Nails";
                    }}
                  />
                </div>
              </div>

              <h3 className="text-3xl font-serif mb-2 text-brand-dark">{member.name}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-leaf font-bold">
                {member.role[lang] || member.role.pt}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};