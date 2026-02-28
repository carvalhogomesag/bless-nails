// src/context/SalonContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { SALON_DATA as INITIAL_DATA } from "../constants";

type SalonContextType = {
  salonData: typeof INITIAL_DATA;
  updateSalonData: (newData: typeof INITIAL_DATA) => void;
};

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider = ({ children }: { children: ReactNode }) => {
  const[salonData, setSalonData] = useState(() => {
    const saved = localStorage.getItem("bless-nails-data");
    return saved ? JSON.parse(saved) : INITIAL_DATA;
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