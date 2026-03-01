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
        // Lógica de "Verdade Absoluta":
        // Fundimos o que está no localStorage com os dados iniciais do ficheiro.
        // Isto garante que se uma nova propriedade (como 'team') for adicionada ao código,
        // o site não quebra mesmo que o localStorage seja de uma versão antiga.
        return { ...INITIAL_DATA, ...parsed };
      } catch (e) {
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