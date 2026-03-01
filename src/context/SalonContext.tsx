// src/context/SalonContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { SALON_DATA as INITIAL_DATA } from "../constants";

type SalonContextType = {
  salonData: typeof INITIAL_DATA;
  updateSalonData: (newData: typeof INITIAL_DATA) => void;
};

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider = ({ children }: { children: ReactNode }) => {
  const [salonData, setSalonData] = useState<typeof INITIAL_DATA>(() => {
    const saved = localStorage.getItem("bless-nails-data");
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // MERGE INTELIGENTE:
        // Priorizamos o que está no código (INITIAL_DATA) para novas funcionalidades,
        // mas mantemos as edições do usuário (parsed) para o que já existia.
        return {
          ...INITIAL_DATA,
          ...parsed,
          // Se o parsed.team for undefined (versão antiga), usamos o do código.
          // Se o usuário limpou a equipe no painel, ele virá como [] e respeitaremos isso.
          team: parsed.team || INITIAL_DATA.team,
          socialLinks: { ...INITIAL_DATA.socialLinks, ...parsed.socialLinks },
          galleryPhotos: parsed.galleryPhotos || INITIAL_DATA.galleryPhotos
        };
      } catch (e) {
        console.error("Erro ao carregar dados do LocalStorage:", e);
        return INITIAL_DATA;
      }
    }
    
    return INITIAL_DATA;
  });

  const updateSalonData = (newData: typeof INITIAL_DATA) => {
    setSalonData(newData);
    localStorage.setItem("bless-nails-data", JSON.stringify(newData));
  };

  return (
    <SalonContext.Provider value={{ salonData, updateSalonData }}>
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) throw new Error("useSalon must be used within SalonProvider");
  return context;
};