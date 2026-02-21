import { useState } from "react";
import { Calendar } from "lucide-react";

// Importando os componentes que criamos
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

// Importando as configurações e tipos
import { SALON_DATA, UI_STRINGS, Language } from "./constants";

export default function App() {
  const [lang, setLang] = useState<Language>("pt");
  const t = UI_STRINGS[lang];

  return (
    <div className="min-h-screen">
      {/* 1. Menu de Navegação */}
      <Navbar lang={lang} setLang={setLang} />
      
      {/* Conteúdo Principal */}
      <main>
        {/* 2. Seção de Impacto (Entrada) */}
        <Hero lang={lang} />
        
        {/* 3. Seção Sobre o Salão */}
        <About lang={lang} />
        
        {/* 4. Seção de Serviços e Preços */}
        <Services lang={lang} />
        
        {/* 5. Seção de Avaliações das Clientes */}
        <Reviews lang={lang} />
        
        {/* 6. Seção de Contato e Mapa */}
        <Contact lang={lang} />
      </main>

      {/* 7. Rodapé do Site */}
      <Footer lang={lang} />
      
      {/* Botão flutuante para agendamento rápido no Celular */}
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