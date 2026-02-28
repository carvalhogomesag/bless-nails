// src/components/Navbar.tsx
import { motion, AnimatePresence } from "motion/react";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { SALON_DATA, UI_STRINGS, Language } from "../constants";

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
}

export const Navbar = ({ lang, setLang }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const[isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = UI_STRINGS[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks =[
    { name: t.about, href: "#sobre" },
    { name: t.services, href: "#servicos" },
    { name: t.reviews, href: "#avaliacoes" },
    { name: t.location, href: "#contato" },
  ];

  const languages: { code: Language; label: string }[] =[
    { code: "pt", label: "Português" }, { code: "en", label: "English" }, { code: "es", label: "Español" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass py-4" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold tracking-tight text-brand-dark">
          Bless Nails <span className="text-brand-leaf italic font-light">Lisbon</span>
        </a>

        <div className="hidden md:flex items-center space-x-10">
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

          <a href={SALON_DATA.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary">
            {t.bookNow}
          </a>
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <button className="text-brand-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};