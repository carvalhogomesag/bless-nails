import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X,
  Sparkles,
  Heart,
  Calendar,
  Globe
} from "lucide-react";
import { useState, useEffect } from "react";
import { SALON_DATA, UI_STRINGS, Language } from "./constants";

const Navbar = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm uppercase tracking-widest font-medium hover:text-brand-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-brand-gold transition-colors"
            >
              <Globe size={16} />
              {lang}
            </button>
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-32 bg-white shadow-xl rounded-xl overflow-hidden border border-brand-cream"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-brand-cream transition-colors ${lang === l.code ? "text-brand-gold font-bold" : "text-brand-dark"}`}
                    >
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

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
           <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest"
            >
              <Globe size={14} />
              {lang}
            </button>
          <button className="text-brand-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif border-b border-brand-cream pb-2"
              >
                {link.name}
              </a>
            ))}
            <a href={SALON_DATA.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary text-center">
              {t.bookNow}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Language Menu */}
      <AnimatePresence>
        {isLangMenuOpen && (
          <div className="md:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLangMenuOpen(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="fixed bottom-0 left-0 right-0 bg-white z-50 p-6 rounded-t-3xl shadow-2xl"
            >
              <h4 className="text-center font-serif text-xl mb-6">Select Language</h4>
              <div className="grid grid-cols-1 gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full text-center py-4 rounded-xl transition-colors ${lang === l.code ? "bg-brand-olive text-white" : "bg-brand-cream text-brand-dark"}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          alt="Bless Nails Interior" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/20 via-transparent to-brand-cream"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-gold uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Príncipe Real, Lisboa
          </span>
          <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
            {lang === "pt" ? (
              <>Elegância em cada <br /><span className="italic text-brand-olive">detalhe.</span></>
            ) : lang === "en" ? (
              <>Elegance in every <br /><span className="italic text-brand-olive">detail.</span></>
            ) : (
              <>Elegancia en cada <br /><span className="italic text-brand-olive">detalle.</span></>
            )}
          </h1>
          <p className="text-lg md:text-xl text-brand-dark/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {SALON_DATA.tagline[lang]}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={SALON_DATA.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2">
              <Calendar size={18} />
              {t.bookTreatment}
            </a>
            <a href="#servicos" className="btn-outline">
              {t.viewServices}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest opacity-50">{t.scroll}</span>
        <div className="w-px h-12 bg-brand-gold/30"></div>
      </motion.div>
    </section>
  );
};

const About = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section id="sobre" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-t-full overflow-hidden border-8 border-brand-cream">
            <img 
              src="/sobre-principal.png" 
              alt="Manicure at Bless Nails" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full overflow-hidden border-8 border-white hidden lg:block">
            <img 
              src="/sobre-detalhe.png" 
              alt="Detail" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand-gold font-serif italic text-xl mb-2 block">{t.ourEssence}</span>
          <h2 className="text-4xl md:text-5xl mb-8">{t.luxuryMeetsRelaxation}</h2>
          <p className="text-brand-dark/70 leading-relaxed mb-8 text-lg">
            {SALON_DATA.description[lang]}
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            {SALON_DATA.features[lang].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-brand-gold" />
                <span className="text-sm font-medium opacity-80">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section id="servicos" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">{t.ourServices}</h2>
          <div className="w-24 h-px bg-brand-gold mx-auto mb-6"></div>
          <p className="text-brand-dark/60 max-w-xl mx-auto">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SALON_DATA.services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group border border-brand-cream"
            >
              <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-olive group-hover:text-white transition-colors">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl mb-2 min-h-[3.5rem]">{service.name[lang]}</h3>
              <p className="text-sm text-brand-dark/60 mb-6 line-clamp-2">
                {service.description[lang]}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs uppercase tracking-widest opacity-50 block mb-1">{t.duration}</span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock size={14} /> {service.duration}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-widest opacity-50 block mb-1">{t.price}</span>
                  <span className="text-2xl font-serif text-brand-gold">€{service.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href={SALON_DATA.bookingUrl} target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center gap-2">
            {t.viewFullMenu} <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Reviews = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section id="avaliacoes" className="section-padding bg-brand-olive text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-10">
        <Star size={200} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-brand-gold font-serif italic text-xl mb-2 block">{t.realExperiences}</span>
            <h2 className="text-4xl md:text-5xl">{t.whatClientsSay}</h2>
          </div>
          <div className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
            <div className="flex text-brand-gold">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="font-medium">4.9/5 (336 {t.reviews.toLowerCase()})</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SALON_DATA.reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm"
            >
              <div className="flex gap-1 text-brand-gold mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-lg italic font-serif mb-6 leading-relaxed">
                "{review.text[lang]}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-olive font-bold">
                  {review.author[0]}
                </div>
                <span className="font-medium uppercase tracking-widest text-xs">{review.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <section id="contato" className="section-padding">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl mb-8">{t.visitUs}</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <MapPin className="text-brand-gold" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{t.location}</h4>
                <p className="text-brand-dark/70 mb-2">{SALON_DATA.address}</p>
                <a 
                  href={SALON_DATA.googleMapsUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-brand-gold font-medium flex items-center gap-1 hover:underline"
                >
                  {t.seeOnGoogleMaps} <ChevronRight size={14} />
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <Clock className="text-brand-gold" />
              </div>
              <div className="w-full">
                <h4 className="font-bold mb-4">{t.openingHours}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                  {SALON_DATA.hours.map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-brand-cream pb-1">
                      <span className="text-sm opacity-60">{h.day[lang]}</span>
                      <span className="text-sm font-medium">{h.time === "Fechado" ? t.closed : h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-auto border-8 border-white"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.123456789!2d-9.148!3d38.716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19337f7f7f7f7f%3A0x7f7f7f7f7f7f7f7f!2sRua%20de%20O%20S%C3%A9culo%20154%2C%201200-437%20Lisboa!5e0!3m2!1spt!2spt!4v1234567890" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <h2 className="text-3xl font-serif mb-6">Bless Nails <span className="text-brand-gold italic">Lisbon</span></h2>
            <p className="text-white/50 max-w-md leading-relaxed">
              {t.footerDescription}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">{t.quickLinks}</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#sobre" className="hover:text-brand-gold transition-colors">{t.about}</a></li>
              <li><a href="#servicos" className="hover:text-brand-gold transition-colors">{t.services}</a></li>
              <li><a href="#avaliacoes" className="hover:text-brand-gold transition-colors">{t.reviews}</a></li>
              <li><a href={SALON_DATA.bookingUrl} target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors">{t.bookNow}</a></li>
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
            <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>("pt");
  const t = UI_STRINGS[lang];

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <About lang={lang} />
      <Services lang={lang} />
      <Reviews lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
      
      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden">
        <a href={SALON_DATA.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary w-full flex items-center justify-center gap-2 shadow-2xl">
          <Calendar size={18} />
          {t.bookNow}
        </a>
      </div>
    </div>
  );
} 