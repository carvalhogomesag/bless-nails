// src/components/AdminPanel.tsx
import { useState } from "react";
import { motion } from "motion/react";
import { X, Plus, Trash2, Save, Code } from "lucide-react";
import { useSalon } from "../context/SalonContext";

export const AdminPanel = ({ onClose }: { onClose: () => void }) => {
  const { salonData, updateSalonData } = useSalon();
  
  // Assegura que o formData tem a estrutura socialLinks caso seja a primeira vez a abrir o painel após o update
  const initialForm = JSON.parse(JSON.stringify(salonData));
  if (!initialForm.socialLinks) {
    initialForm.socialLinks = { instagram: "", facebook: "", tiktok: "" };
  }
  
  const [formData, setFormData] = useState(initialForm);
  // Adicionámos o separador "redes" aqui em baixo
  const [activeTab, setActiveTab] = useState<"servicos" | "horarios" | "mapa" | "redes">("servicos");

  const handleSave = () => {
    updateSalonData(formData);
    onClose();
    alert("Alterações guardadas localmente! Para aplicar ao site oficial para sempre, clique em 'Gerar Código (Publicar)'.");
  };

  const handleExportCode = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    alert("Código copiado! Abra o seu constants.ts e cole-o substituindo a variável SALON_DATA.");
  };

  const addService = () => {
    setFormData({
      ...formData,
      services:[
        ...formData.services, 
        { name: { pt: "", en: "", es: "" }, price: "", duration: "1h", description: { pt: "", en: "", es: "" } }
      ]
    });
  };

  const removeService = (index: number) => {
    const newServices = [...formData.services];
    newServices.splice(index, 1);
    setFormData({ ...formData, services: newServices });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark/80 backdrop-blur-md flex items-center justify-center p-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-brand-cream w-full max-w-5xl h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header do Painel */}
        <div className="bg-white p-6 border-b border-brand-straw/30 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif text-brand-dark">Modo Gestor Secreto 🤫</h2>
            <p className="text-xs text-brand-dark/50 uppercase tracking-widest mt-1">Bless Nails Admin</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-brand-cream rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tabs - Agora tem 4 opções */}
        <div className="flex bg-white px-6 gap-6 border-b border-brand-straw/20 overflow-x-auto">
          {(["servicos", "horarios", "mapa", "redes"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? "border-brand-leaf text-brand-leaf" : "border-transparent text-brand-dark/40"}`}>
              {tab === "redes" ? "Redes Sociais" : tab}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-8 bg-brand-cream/50">
          
          {/* TAB SERVIÇOS */}
          {activeTab === "servicos" && (
            <div className="space-y-6">
              {formData.services.map((service: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-brand-straw/30 shadow-sm relative group">
                  <button onClick={() => removeService(index)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-brand-leaf mb-1 block">Nome (PT)</label>
                      <input type="text" value={service.name.pt} onChange={(e) => { const newS = [...formData.services]; newS[index].name.pt = e.target.value; setFormData({...formData, services: newS}) }} className="w-full border p-2 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-brand-leaf mb-1 block">Preço (€)</label>
                      <input type="text" value={service.price} onChange={(e) => { const newS = [...formData.services]; newS[index].price = e.target.value; setFormData({...formData, services: newS}) }} className="w-full border p-2 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-brand-leaf mb-1 block">Duração</label>
                      <input type="text" value={service.duration} onChange={(e) => { const newS =[...formData.services]; newS[index].duration = e.target.value; setFormData({...formData, services: newS}) }} className="w-full border p-2 rounded-xl text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-brand-leaf mb-1 block">Descrição (PT)</label>
                    <textarea value={service.description.pt} onChange={(e) => { const newS = [...formData.services]; newS[index].description.pt = e.target.value; setFormData({...formData, services: newS}) }} className="w-full border p-2 rounded-xl text-sm" rows={2} />
                  </div>
                </div>
              ))}
              <button onClick={addService} className="flex items-center gap-2 text-brand-leaf font-bold hover:underline">
                <Plus size={18} /> Adicionar Novo Serviço
              </button>
            </div>
          )}

          {/* TAB HORÁRIOS */}
          {activeTab === "horarios" && (
            <div className="grid md:grid-cols-2 gap-4">
              {formData.hours.map((h: any, i: number) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-brand-straw/30 flex items-center justify-between">
                  <span className="font-medium text-sm w-32">{h.day.pt}</span>
                  <input type="text" value={h.time} onChange={(e) => { const newH = [...formData.hours]; newH[i].time = e.target.value; setFormData({...formData, hours: newH}) }} className="border p-2 rounded-lg text-sm w-40 text-center" placeholder="10:00 - 19:00 ou Fechado" />
                </div>
              ))}
            </div>
          )}

          {/* TAB MAPA */}
          {activeTab === "mapa" && (
            <div className="bg-white p-6 rounded-2xl border border-brand-straw/30">
              <label className="text-xs font-bold uppercase text-brand-leaf mb-2 block">Link (SRC) de Incorporação do Google Maps</label>
              <textarea value={formData.mapEmbedUrl} onChange={(e) => setFormData({...formData, mapEmbedUrl: e.target.value})} className="w-full border p-4 rounded-xl text-sm font-mono text-brand-dark/70" rows={6} placeholder="Cole aqui o link do atributo src do iframe do Google Maps" />
              <p className="text-xs text-brand-dark/50 mt-2">Vá ao Google Maps &gt; Partilhar &gt; Incorporar Mapa &gt; Copie apenas o link que está dentro das aspas do src="...".</p>
            </div>
          )}

          {/* TAB REDES SOCIAIS (NOVA) */}
          {activeTab === "redes" && (
            <div className="bg-white p-6 rounded-2xl border border-brand-straw/30 space-y-6">
              <p className="text-sm text-brand-dark/60 mb-4">Deixe o campo vazio para esconder o respetivo ícone da página inicial.</p>
              
              <div>
                <label className="text-xs font-bold uppercase text-brand-leaf mb-2 block">Instagram Link</label>
                <input type="text" value={formData.socialLinks.instagram} onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})} className="w-full border p-3 rounded-xl text-sm" placeholder="Ex: https://instagram.com/blessnailslisbon" />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-brand-leaf mb-2 block">Facebook Link</label>
                <input type="text" value={formData.socialLinks.facebook} onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, facebook: e.target.value}})} className="w-full border p-3 rounded-xl text-sm" placeholder="Ex: https://facebook.com/blessnailslisbon" />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-brand-leaf mb-2 block">TikTok Link</label>
                <input type="text" value={formData.socialLinks.tiktok} onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, tiktok: e.target.value}})} className="w-full border p-3 rounded-xl text-sm" placeholder="Ex: https://tiktok.com/@blessnailslisbon" />
              </div>
            </div>
          )}

        </div>

        {/* Footer do Painel */}
        <div className="bg-white p-6 border-t border-brand-straw/30 flex justify-between">
          <button onClick={handleExportCode} className="flex items-center gap-2 text-brand-dark/50 hover:text-brand-dark font-medium text-sm transition-colors">
            <Code size={18} /> Gerar Código (Publicar)
          </button>
          <div className="flex gap-4">
            <button onClick={onClose} className="btn-outline py-2 px-6">Cancelar</button>
            <button onClick={handleSave} className="btn-primary py-2 px-6 flex items-center gap-2">
              <Save size={16} /> Guardar Live
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};