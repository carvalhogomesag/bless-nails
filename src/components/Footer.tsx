// src/components/Footer.tsx
import { motion } from "motion/react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

export const Footer = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    <footer className="bg-brand-dark pt-24 pb-12 overflow-hidden grain relative">
      {/* Gold line above footer content */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Logo & Bio */}
          <div className="space-y-8">
            <h3 className="text-3xl font-serif text-white tracking-tighter">
              Bless <span className="italic font-light text-brand-gold">Nails</span>
            </h3>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              {salonData.tagline[lang]}
            </p>
            <div className="flex gap-4">
              <a href={salonData.socialLinks.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-gold hover:border-brand-gold transition-all">
                <Instagram size={18} />
              </a>
              <a href={salonData.socialLinks.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-gold hover:border-brand-gold transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-8">Navigation</h4>
            <ul className="space-y-4">
              {["sobre", "servicos", "galeria", "equipa", "contacto"].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="text-white/60 text-sm font-light hover:text-white transition-colors capitalize">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-8">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-white/60 group">
                <MapPin size={18} className="text-brand-gold shrink-0" />
                <span className="text-sm font-light leading-relaxed group-hover:text-white transition-colors">
                  {salonData.address}
                </span>
              </li>
              <li className="flex items-center gap-4 text-white/60 group">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span className="text-sm font-light group-hover:text-white transition-colors">
                  {salonData.phoneNumber}
                </span>
              </li>
            </ul>
          </div>

          {/* Horário */}
          <div>
            <h4 className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-8">Hours</h4>
            <ul className="space-y-4">
              {salonData.hours.map((h, i) => (
                <li key={i} className="flex justify-between text-sm font-light">
                  <span className="text-white/40">{h.day[lang]}</span>
                  <span className="text-white/70">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[10px] uppercase tracking-widest">
            © 2024 Bless Nails Lisbon. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
