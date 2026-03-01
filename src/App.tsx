// src/App.tsx
import { useState, useEffect } from "react";
import { Calendar, MessageCircle } from "lucide-react"; // Importamos o ícone de mensagem para o WhatsApp
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { AdminPanel } from "./components/AdminPanel";
import { UI_STRINGS, Language } from "./constants";
import { useSalon } from "./context/SalonContext"; // Importante para os dados dinâmicos

export default function App() {
  const [lang, setLang] = useState<Language>("pt");
  const [showAdmin, setShowAdmin] = useState(false);
  const { salonData } = useSalon(); // Acedemos aos dados (links, etc) em tempo real
  const t = UI_STRINGS[lang];

  useEffect(() => {
    const openAdmin = () => setShowAdmin(true);
    window.addEventListener("open-admin", openAdmin);
    return () => window.removeEventListener("open-admin", openAdmin);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navegação de Topo */}
      <Navbar lang={lang} setLang={setLang} />
      
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Services lang={lang} />
        <Gallery lang={lang} />
        <Reviews lang={lang} />
        <Contact lang={lang} />
      </main>

      {/* Rodapé e Utilitários */}
      <Footer lang={lang} />
      <CookieBanner />

      {/* Painel Administrativo Secreto */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}

      {/* 
          BARRA DE AÇÃO MOBILE FIRST (Apenas visível em telemóveis)
          Estratégia: "Zona do Polegar" para conversão imediata.
      */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden bg-gradient-to-t from-brand-cream via-brand-cream/95 to-transparent">
        <div className="flex gap-3 max-w-md mx-auto">
          {/* Botão de Contacto Rápido (WhatsApp) */}
          <a 
            href={`https://wa.me/351912345678?text=Olá Bless Nails! Gostaria de tirar uma dúvida sobre os serviços.`} 
            target="_blank" 
            rel="noreferrer"
            className="flex-1 bg-white text-brand-leaf border border-brand-leaf/20 h-14 rounded-2xl flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          >
            <MessageCircle size={20} strokeWidth={1.5} />
          </a>
          
          {/* Botão Principal de Agendamento (Maior destaque) */}
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