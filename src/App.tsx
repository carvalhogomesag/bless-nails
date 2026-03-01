// src/App.tsx
import { useState, useEffect } from "react";
import { Calendar, MessageCircle, Phone } from "lucide-react"; 
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Team } from "./components/Team";
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { AdminPanel } from "./components/AdminPanel";
import { FloatingContact } from "./components/FloatingContact"; // Importação do novo componente
import { UI_STRINGS, Language } from "./constants";
import { useSalon } from "./context/SalonContext"; 

export default function App() {
  const [lang, setLang] = useState<Language>("pt");
  const [showAdmin, setShowAdmin] = useState(false);
  const { salonData } = useSalon(); 
  const t = UI_STRINGS[lang];

  // Preparação segura do número de telefone
  const rawPhone = salonData.phoneNumber || "+351937832777";
  const cleanPhone = rawPhone.replace(/\s/g, "");
  const waNumber = cleanPhone.replace("+", "");

  useEffect(() => {
    const openAdmin = () => setShowAdmin(true);
    window.addEventListener("open-admin", openAdmin);
    return () => window.removeEventListener("open-admin", openAdmin);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Services lang={lang} />
        <Gallery lang={lang} />
        <Team lang={lang} />
        <Reviews lang={lang} />
        <Contact lang={lang} />
      </main>

      <Footer lang={lang} />
      <CookieBanner />
      
      {/* Botões flutuantes para Desktop */}
      <FloatingContact />

      {/* Painel Administrativo */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}

      {/* BARRA MOBILE FIRST */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden bg-linear-to-t from-brand-cream via-brand-cream/95 to-transparent">
        <div className="flex gap-2 max-w-md mx-auto">
          <a 
            href={`tel:${cleanPhone}`}
            className="flex-1 bg-white text-brand-leaf border border-brand-leaf/20 h-14 rounded-2xl flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          >
            <Phone size={20} strokeWidth={1.5} />
          </a>
          
          <a 
            href={`https://wa.me/${waNumber}`} 
            target="_blank" 
            rel="noreferrer"
            className="flex-1 bg-white text-brand-leaf border border-brand-leaf/20 h-14 rounded-2xl flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          >
            <MessageCircle size={20} strokeWidth={1.5} />
          </a>
          
          <a 
            href={salonData.bookingUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="flex-[3] bg-brand-leaf text-white h-14 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-brand-leaf/20 active:scale-95 transition-transform font-bold text-[10px] uppercase tracking-[0.2em]"
          >
            <Calendar size={18} />
            {t.bookNow}
          </a>
        </div>
      </div>
    </div>
  );
}