// src/components/FloatingContact.tsx
import { motion } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { useSalon } from "../context/SalonContext";

// Certifique-se de que a linha abaixo começa com "export const"
export const FloatingContact = () => {
  const { salonData } = useSalon();

  // Limpeza do número para os links
  const cleanPhone = salonData.phoneNumber?.replace(/\s/g, "");
  const waNumber = cleanPhone?.replace("+", "");

  return (
    <div className="fixed bottom-10 right-10 z-40 hidden md:flex flex-col gap-4">
      {/* Botão: Chamada */}
      <motion.a
        href={`tel:${cleanPhone}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1, y: -2 }}
        className="w-14 h-14 bg-white text-brand-leaf rounded-full shadow-2xl flex items-center justify-center border border-brand-straw/30 hover:bg-brand-leaf hover:text-white transition-all duration-500 group"
        title="Ligar para o Salão"
      >
        <Phone size={22} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform duration-300" />
      </motion.a>

      {/* Botão: WhatsApp */}
      <motion.a
        href={`https://wa.me/${waNumber}?text=Olá! Gostaria de obter informações sobre os serviços da Bless Nails.`}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-500 group"
        title="Enviar WhatsApp"
      >
        <MessageCircle size={26} fill="currentColor" className="text-white transition-transform duration-300 group-hover:-rotate-12" />
      </motion.a>
    </div>
  );
};