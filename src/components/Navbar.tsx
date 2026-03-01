// src/components/Navbar.tsx
import { motion, AnimatePresence } from "motion/react";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
}

export const Navbar = ({ lang, setLang }: NavbarProps) => {
  const { salonData } = useSalon();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = UI_STRINGS[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.about, href: "#sobre" },
    { name: t.services, href: "#servicos" },
    { name: t.gallery, href: "#galeria" },
  ];

  if (salonData.team && salonData.team.length > 0) {
    navLinks.push({ name: t.team, href: "#equipa" });
  }

  navLinks.push(
    { name: t.reviews, href: "#avaliacoes" },
    { name: t.location, href: "#contato" }
  );

  const languages: { code: Language; label: string }[] = [
    { code: "pt", label: "Português" },
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass py-4" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold tracking-tight text-brand-dark">
          Bless Nails <span className="text-brand-leaf italic font-light">Lisbon</span>
        </a>

        {/* --- MENU DESKTOP --- */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-[11px] uppercase tracking-[0.15em] font-medium text-brand-dark/80 hover:text-brand-leaf transition-colors">
              {link.name}
            </a>
          ))}
          
          <div className="relative">
            <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] hover:text-brand-leaf transition-colors">
              <Globe size={14} /> {lang}
            </button>
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-4 w-32 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-brand-straw/30 p-2">
                  {languages.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l.code); setIsLangMenuOpen(false); }} className={`w-full text-left px-4 py-2 text-sm rounded-xl hover:bg-brand-cream transition-colors ${lang === l.code ? "text-brand-leaf font-bold bg-brand-cream/50" : "text-brand-dark/70"}`}>
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href={salonData.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary">
            {t.bookNow}
          </a>
        </div>

        {/* --- CABEÇALHO MOBILE (Visível apenas em telemóveis) --- */}
        <div className="flex items-center gap-3 lg:hidden">
          
          {/* SELETOR DE IDIOMAS MOBILE (Ao lado do hambúrguer) */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsLangMenuOpen(!isLangMenuOpen);
                if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Fecha o menu principal se o de idioma abrir
              }} 
              className="flex items-center gap-1 px-3 py-2 bg-white/50 backdrop-blur-sm border border-brand-straw/20 rounded-xl text-[10px] font-bold text-brand-leaf uppercase tracking-widest"
            >
              <Globe size={12} />
              {lang}
              <ChevronDown size={10} className={`transition-transform duration-300 ${isLangMenuOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 5 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.9, y: 5 }} 
                  className="absolute right-0 mt-2 w-32 bg-white shadow-2xl rounded-2xl overflow-hidden border border-brand-straw/30 p-1 z-[60]"
                >
                  {languages.map((l) => (
                    <button 
                      key={l.code} 
                      onClick={() => { setLang(l.code); setIsLangMenuOpen(false); }} 
                      className={`w-full text-left px-4 py-3 text-xs rounded-xl transition-colors ${lang === l.code ? "bg-brand-leaf text-white font-bold" : "text-brand-dark/60 active:bg-brand-cream"}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BOTÃO HAMBÚRGUER */}
          <button 
            className="w-10 h-10 flex items-center justify-center text-brand-dark active:scale-90 transition-transform" 
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isLangMenuOpen) setIsLangMenuOpen(false); // Fecha o menu de idiomas se o hambúrguer abrir
            }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MENU MOBILE EXPANDIDO --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-brand-straw/20 p-8 flex flex-col gap-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-brand-dark border-b border-brand-straw/10 pb-2"
              >
                {link.name}
              </a>
            ))}
            <a href={salonData.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary text-center py-4">
              {t.bookNow}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};