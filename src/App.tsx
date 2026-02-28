// src/App.tsx
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery"; // <-- NOVA IMPORTAÇÃO
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { AdminPanel } from "./components/AdminPanel";
import { SALON_DATA, UI_STRINGS, Language } from "./constants";

export default function App() {
  const [lang, setLang] = useState<Language>("pt");
  const [showAdmin, setShowAdmin] = useState(false);
  const t = UI_STRINGS[lang];

  useEffect(() => {
    const openAdmin = () => setShowAdmin(true);
    window.addEventListener("open-admin", openAdmin);
    return () => window.removeEventListener("open-admin", openAdmin);
  },[]);

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Services lang={lang} />
        
        {/* A NOSSA NOVA GALERIA ELEGANTE */}
        <Gallery lang={lang} />
        
        <Reviews lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <CookieBanner />

      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}

      <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden">
        <a href={SALON_DATA.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary w-full flex items-center justify-center gap-2 shadow-2xl">
          <Calendar size={18} />
          {t.bookNow}
        </a>
      </div>
    </div>
  );
}