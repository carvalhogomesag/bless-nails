import { useState } from "react";
import { Calendar } from "lucide-react";

// Importando os componentes que organizamos na pasta components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner"; // Novo componente legal

// Importando as configurações e tipos
import { SALON_DATA, UI_STRINGS, Language } from "./constants";

export default function App() {
  const [lang, setLang] = useState<Language>("pt");
  const t = UI_STRINGS[lang];

  return (
    <div className="min-h-screen">
      {/* 1. Menu de Navegação fixo no topo */}
      <Navbar lang={lang} setLang={setLang} />
      
      {/* Conteúdo Principal do Site */}
      <main>
        {/* 2. Banner de Entrada (Hero) */}
        <Hero lang={lang} />
        
        {/* 3. Seção Sobre a essência do salão */}
        <About lang={lang} />
        
        {/* 4. Lista de Serviços e Preços */}
        <Services lang={lang} />
        
        {/* 5. Prova Social: O que as clientes dizem */}
        <Reviews lang={lang} />
        
        {/* 6. Informações de Localização, Horários e Mapa */}
        <Contact lang={lang} />
      </main>

      {/* 7. Rodapé com links legais (NIF, Livro de Reclamações, etc) */}
      <Footer lang={lang} />
      
      {/* 8. Aviso de Privacidade e Cookies (Efeito UAU) */}
      <CookieBanner />

      {/* Botão flutuante para agendamento - Visível apenas no Celular */}
      <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden">
        <a 
          href={SALON_DATA.bookingUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="btn-primary w-full flex items-center justify-center gap-2 shadow-2xl"
        >
          <Calendar size={18} />
          {t.bookNow}
        </a>
      </div>
    </div>
  );
}