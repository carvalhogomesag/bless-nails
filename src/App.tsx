// src/App.tsx
import { useState, useEffect } from "react";
import { Calendar, MessageCircle } from "lucide-react"; 
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Team } from "./components/Team"; // <-- ADICIONADO
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { AdminPanel } from "./components/AdminPanel";
import { UI_STRINGS, Language } from "./constants";
import { useSalon } from "./context/SalonContext"; 

export default function App() {
  const [lang, setLang] = useState<Language>("pt");
  const [showAdmin, setShowAdmin] = useState(false);
  const { salonData } = useSalon(); 
  const t = UI_STRINGS[lang];

  useEffect(() => {
    // Escuta o evento do Easter Egg vindo do Footer
    const openAdmin = () => setShowAdmin(true);
    window.addEventListener("open-admin", openAdmin);
    return () => window.removeEventListener("open-admin", openAdmin);
  }, []);

  return (
    <div className="min-h-screen">
      {/* 1. Menu de Navegação */}
      <Navbar lang={lang} setLang={setLang} />
      
      <main>
        {/* 2. Banner de Entrada */}
        <Hero lang={lang} />
        
        {/* 3. Sobre a essência */}
        <About lang={lang} />
        
        {/* 4. Lista de Serviços */}
        <Services lang={lang} />
        
        {/* 5. Galeria de Fotos Inspiração */}
        <Gallery lang={lang} />

        {/* 6. Nossa Equipa (Faces do Luxo) */}
        <Team lang={lang} />
        
        {/* 7. O que as clientes dizem */}
        <Reviews lang={lang} />
        
        {/* 8. Localização e Horários */}
        <Contact lang={lang} />
      </main>

      {/* 9. Rodapé com gatilho do Easter Egg */}
      <Footer lang={lang} />
      
      {/* 10. Consentimento de Cookies */}
      <CookieBanner />

      {/* 11. Painel de Gestão (Só aparece se ativado) */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}

      {/* 12. BARRA DE ACÇÃO MOBILE FIRST (Apenas visível em telemóveis) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden bg-gradient-to-t from-brand-cream via-brand-cream/95 to-transparent">
        <div className="flex gap-3 max-w-md mx-auto">
          {/* Botão WhatsApp: Se houver link no painel ele usa, senão usa um padrão */}
          <a 
            href={salonData.socialLinks?.instagram || "#"} 
            target="_blank" 
            rel="noreferrer"
            className="flex-1 bg-white text-brand-leaf border border-brand-leaf/20 h-14 rounded-2xl flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          >
            <MessageCircle size={20} strokeWidth={1.5} />
          </a>
          
          {/* Botão Principal de Agendamento */}
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