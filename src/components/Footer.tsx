// src/components/Footer.tsx
import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

export const Footer = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    if (clickCount >= 4) {
      window.dispatchEvent(new Event("open-admin"));
      setClickCount(0);
    } else {
      setClickCount(prev => prev + 1);
    }
  };

  const socials = salonData.socialLinks || { instagram: "", facebook: "", tiktok: "" };

  // --- LÓGICA DE LINKS DINÂMICOS (Igual à Navbar) ---
  const footerLinks = [
    { name: t.about, href: "#sobre" },
    { name: t.services, href: "#servicos" },
    { name: t.gallery, href: "#galeria" },
  ];

  if (salonData.team && salonData.team.length > 0) {
    footerLinks.push({ name: t.team, href: "#equipa" });
  }

  footerLinks.push(
    { name: t.reviews, href: "#avaliacoes" },
    { name: t.location, href: "#contato" }
  );

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
          
          {/* COLUNA DE LINKS DINÂMICOS */}
          <div>
            <h4 className="text-brand-straw uppercase tracking-[0.2em] text-[10px] font-bold mb-6">{t.quickLinks}</h4>
            <ul className="space-y-4 text-brand-cream/70 text-sm font-light">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-brand-straw hover:translate-x-1 inline-block transition-all duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
              {/* Links Legais Obrigatórios em Portugal */}
              <li className="pt-2 border-t border-brand-cream/10">
                <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-brand-straw transition-all">
                  Livro de Reclamações
                </a>
              </li>
              <li>
                <a href="#" className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-brand-straw transition-all">
                  Resolução de Litígios
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-straw uppercase tracking-[0.2em] text-[10px] font-bold mb-6">{t.followUs}</h4>
            <div className="flex gap-4">
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-straw hover:border-brand-straw hover:text-brand-dark transition-all duration-500">
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
              )}
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-straw hover:border-brand-straw hover:text-brand-dark transition-all duration-500">
                  <Facebook size={20} strokeWidth={1.5} />
                </a>
              )}
              {socials.tiktok && (
                <a href={socials.tiktok} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-straw hover:border-brand-straw hover:text-brand-dark transition-all duration-500">
                  <TikTokIcon size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-6 text-brand-cream/40 text-xs font-light tracking-wide">
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