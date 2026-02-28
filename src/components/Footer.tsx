// src/components/Footer.tsx
import { useState } from "react";
import { Instagram, Heart } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";

export const Footer = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const [clickCount, setClickCount] = useState(0);

  // O NOSSO EASTER EGG 🤫
  const handleSecretClick = () => {
    if (clickCount >= 4) {
      window.dispatchEvent(new Event("open-admin"));
      setClickCount(0);
    } else {
      setClickCount(prev => prev + 1);
    }
  };

  return (
    <footer className="bg-brand-dark text-brand-cream pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <h2 className="text-4xl font-serif mb-6">Bless Nails <span className="text-brand-straw italic font-light">Lisbon</span></h2>
            <p className="text-brand-cream/60 max-w-md leading-relaxed mb-8 font-light text-lg">
              {t.footerDescription}
            </p>
            <p className="text-[10px] text-brand-cream/30 uppercase tracking-[0.2em]">
              NIF: 123 456 789 — Bless Nails Lisbon Unipessoal Lda
            </p>
          </div>
          
          <div>
            <h4 className="text-brand-straw uppercase tracking-[0.2em] text-[10px] font-bold mb-6">{t.quickLinks}</h4>
            <ul className="space-y-4 text-brand-cream/70 text-sm font-light">
              <li><a href="#sobre" className="hover:text-brand-straw transition-all">{t.about}</a></li>
              <li><a href="#servicos" className="hover:text-brand-straw transition-all">{t.services}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-straw uppercase tracking-[0.2em] text-[10px] font-bold mb-6">{t.followUs}</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-straw hover:text-brand-dark transition-all"><Instagram size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-straw hover:text-brand-dark transition-all"><Heart size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-6 text-brand-cream/40 text-xs font-light tracking-wide">
          {/* Adicionámos o onClick e o cursor-pointer escondido aqui: */}
          <p onClick={handleSecretClick} className="select-none cursor-default">
            © {new Date().getFullYear()} Bless Nails Lisbon. {t.allRightsReserved}
          </p>
          <div className="flex gap-8">
            <button className="hover:text-brand-straw transition-colors">{t.privacy}</button>
            <button className="hover:text-brand-straw transition-colors">{t.terms}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};