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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = UI_STRINGS[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.about, href: "#sobre" },
    { name: t.services, href: "#servicos" },
    { name: t.reviews, href: "#avaliacoes" },
    { name: t.location, href: "#contato" },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "pt", label: "Português" },
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-4 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold tracking-tight text-brand-dark">
          Bless Nails <span className="text-brand-gold italic">Lisbon</span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm uppercase tracking-widest font-medium hover:text-brand-gold transition-colors">
              {link.name}
            </a>
          ))}
          
          <div className="relative">
            <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-brand-gold transition-colors">
              <Globe size={16} />
              {lang}
            </button>
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-32 bg-white shadow-xl rounded-xl overflow-hidden border border-brand-cream">
                  {languages.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l.code); setIsLangMenuOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-brand-cream transition-colors ${lang === l.code ? "text-brand-gold font-bold" : "text-brand-dark"}`}>
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href={SALON_DATA.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary py-2 text-sm">
            {t.bookNow}
          </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
            <Globe size={14} />
            {lang}
          </button>
          <button className="text-brand-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col space-y-4 md:hidden">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif border-b border-brand-cream pb-2">
                {link.name}
              </a>
            ))}
            <a href={SALON_DATA.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary text-center">
              {t.bookNow}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};