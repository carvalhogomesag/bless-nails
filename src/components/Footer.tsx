import { Instagram, Heart } from "lucide-react";
import { SALON_DATA, UI_STRINGS, Language } from "../constants";

export const Footer = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <h2 className="text-3xl font-serif mb-4">Bless Nails <span className="text-brand-gold italic">Lisbon</span></h2>
            <p className="text-white/50 max-w-md leading-relaxed mb-6">
              {t.footerDescription}
            </p>
            {/* Informação do NIF - Essencial em Portugal */}
            <p className="text-xs text-white/30 uppercase tracking-widest">
              NIF: 123 456 789 — Bless Nails Lisbon Unipessoal Lda
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">{t.quickLinks}</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="#sobre" className="hover:text-brand-gold transition-colors">{t.about}</a></li>
              <li><a href="#servicos" className="hover:text-brand-gold transition-colors">{t.services}</a></li>
              <li><a href="https://www.livroreclamacoes.pt" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors">Livro de Reclamações</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Resolução de Litígios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">{t.followUs}</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all">
                <Heart size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Bless Nails Lisbon. {t.allRightsReserved}</p>
          <div className="flex gap-8">
            <button className="hover:text-white transition-colors">{t.privacy}</button>
            <button className="hover:text-white transition-colors">{t.terms}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};