// src/components/AdminPanel.tsx
import { useState } from "react";
import { motion } from "motion/react";
import { X, Plus, Trash2, Save, Code, Image as ImageIcon, RotateCcw, Users, Phone } from "lucide-react";
import { useSalon } from "../context/SalonContext";

export const AdminPanel = ({ onClose }: { onClose: () => void }) => {
  const { salonData, updateSalonData } = useSalon();
  
  // Prepara os dados iniciais garantindo que todas as novas estruturas existam
  const initialForm = JSON.parse(JSON.stringify(salonData));
  if (!initialForm.socialLinks) initialForm.socialLinks = { instagram: "", facebook: "", tiktok: "" };
  if (!initialForm.galleryPhotos) initialForm.galleryPhotos = Array(10).fill("");
  if (!initialForm.team) initialForm.team = [];
  if (!initialForm.phoneNumber) initialForm.phoneNumber = ""; // Garante que o campo telefone existe
  
  const [formData, setFormData] = useState(initialForm);
  const [activeTab, setActiveTab] = useState<"servicos" | "equipa" | "galeria" | "horarios" | "mapa" | "redes">("servicos");

  const handleSave = () => {
    updateSalonData(formData);
    onClose();
    // Forçamos um refresh para garantir que o site carregue os dados do localStorage limpos
    window.location.reload();
  };

  const handleReset = () => {
    if (confirm("Deseja apagar todas as alterações feitas e voltar aos dados originais do ficheiro constants.ts?")) {
      localStorage.removeItem("bless-nails-data");
      window.location.reload();
    }
  };

  const handleExportCode = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    alert("Código copiado! Cole-o no seu arquivo constants.ts substituindo o objeto SALON_DATA.");
  };

  // Funções para Gerir Serviços
  const addService = () => {
    setFormData({
      ...formData,
      services: [
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

  // Funções para Gerir Equipa
  const addTeamMember = () => {
    setFormData({
      ...formData,
      team: [
        ...formData.team,
        { name: "", role: { pt: "", en: "", es: "" }, image: "" }
      ]
    });
  };

  const removeTeamMember = (index: number) => {
    const newTeam = [...formData.team];
    newTeam.splice(index, 1);
    setFormData({ ...formData, team: newTeam });
  };

  const gallerySlots = Array(10).fill("").map((_, i) => formData.galleryPhotos[i] || "");

  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark/80 backdrop-blur-md flex items-center justify-center p-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-brand-cream w-full max-w-5xl h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-white p-6 border-b border-brand-straw/30 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif text-brand-dark">Modo Gestor Secreto 🤫</h2>
            <p className="text-xs text-brand-dark/50 uppercase tracking-widest mt-1">Bless Nails Admin</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-brand-cream rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex bg-white px-6 gap-6 border-b border-brand-straw/20 overflow-x-auto custom-scrollbar">
          {(["servicos", "equipa", "galeria", "horarios", "mapa", "redes"] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? "border-brand-leaf text-brand-leaf" : "border-transparent text-brand-dark/40 hover:text-brand-leaf"}`}
            >
              {tab === "servicos" ? "Serviços" : tab === "equipa" ? "Equipa" : tab === "redes" ? "Contactos & Redes" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-brand-cream/50 custom-scrollbar">
          
          {/* TAB: SERVIÇOS */}
          {activeTab === "servicos" && (
            <div className="space-y-6">
              {formData.services.map((service: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-brand-straw/30 shadow-sm relative">
                  <button onClick={() => removeService(index)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-brand-leaf mb-1 block">Nome (PT)</label>
                      <input type="text" value={service.name.pt} onChange={(e) => { const newS = [...formData.services]; newS[index].name.pt = e.target.value; setFormData({...formData, services: newS}) }} className="w-full border p-2 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-brand-leaf mb-1 block">Preço (€)</label>
                      <input type="text" value={service.price} onChange={(e) => { const newS = [...formData.services]; newS[index].price = e.target.value; setFormData({...formData, services: newS}) }} className="w-full border p-2 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-brand-leaf mb-1 block">Duração</label>
                      <input type="text" value={service.duration} onChange={(e) => { const newS = [...formData.services]; newS[index].duration = e.target.value; setFormData({...formData, services: newS}) }} className="w-full border p-2 rounded-xl text-sm" />
                    </div>
                  </div>
                  <label className="text-[10px] font-bold uppercase text-brand-leaf mb-1 block">Descrição (PT)</label>
                  <textarea value={service.description.pt} onChange={(e) => { const newS = [...formData.services]; newS[index].description.pt = e.target.value; setFormData({...formData, services: newS}) }} className="w-full border p-2 rounded-xl text-sm" rows={2} />
                </div>
              ))}
              <button onClick={addService} className="flex items-center gap-2 text-brand-leaf font-bold hover:underline">
                <Plus size={18} /> Adicionar Novo Serviço
              </button>
            </div>
          )}

          {/* TAB: EQUIPA */}
          {activeTab === "equipa" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-straw/20">
                <div className="p-3 bg-brand-leaf/10 text-brand-leaf rounded-xl"><Users size={24} /></div>
                <div>
                  <h3 className="font-serif text-xl">Gestão de Profissionais</h3>
                  <p className="text-xs text-brand-dark/50">Adicione as caras que fazem a Bless Nails brilhar.</p>
                </div>
              </div>
              {formData.team.map((member: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-brand-straw/30 relative shadow-sm">
                  <button onClick={() => removeTeamMember(index)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-brand-leaf mb-1 block">Nome Completo</label>
                      <input type="text" value={member.name} onChange={(e) => { const newT = [...formData.team]; newT[index].name = e.target.value; setFormData({...formData, team: newT}) }} className="w-full border p-2 rounded-xl text-sm" placeholder="Ex: Stefanie" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-brand-leaf mb-1 block">Cargo (PT)</label>
                      <input type="text" value={member.role.pt} onChange={(e) => { const newT = [...formData.team]; newT[index].role.pt = e.target.value; setFormData({...formData, team: newT}) }} className="w-full border p-2 rounded-xl text-sm" placeholder="Ex: Master Stylist" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-bold uppercase text-brand-leaf mb-1 block">Link da Foto</label>
                      <input type="text" value={member.image} onChange={(e) => { const newT = [...formData.team]; newT[index].image = e.target.value; setFormData({...formData, team: newT}) }} className="w-full border p-2 rounded-xl text-sm" placeholder="https://i.ibb.co/..." />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addTeamMember} className="flex items-center gap-2 text-brand-leaf font-bold hover:underline">
                <Plus size={18} /> Adicionar Novo Profissional
              </button>
            </div>
          )}

          {/* TAB: GALERIA */}
          {activeTab === "galeria" && (
            <div className="bg-white p-6 rounded-2xl border border-brand-straw/30">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-straw/20">
                <div className="p-3 bg-brand-leaf/10 text-brand-leaf rounded-xl"><ImageIcon size={24} /></div>
                <div>
                  <h3 className="font-serif text-xl">Galeria de Inspiração</h3>
                  <p className="text-xs text-brand-dark/50">Máximo 10 fotos. Use links diretos do ImgBB.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {gallerySlots.map((url, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-brand-leaf">Foto {i + 1}</label>
                    <input 
                      type="text" 
                      value={url} 
                      onChange={(e) => { 
                        const newPhotos = [...gallerySlots]; 
                        newPhotos[i] = e.target.value; 
                        setFormData({...formData, galleryPhotos: newPhotos}) 
                      }} 
                      className="w-full border p-2 rounded-xl text-xs bg-gray-50" 
                      placeholder="https://i.ibb.co/..." 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: REDES SOCIAIS E CONTACTOS */}
          {activeTab === "redes" && (
            <div className="bg-white p-6 rounded-2xl border border-brand-straw/30 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-straw/20">
                  <div className="p-3 bg-brand-leaf/10 text-brand-leaf rounded-xl"><Phone size={24} /></div>
                  <div>
                    <h3 className="font-serif text-xl">Contactos Diretos</h3>
                    <p className="text-xs text-brand-dark/50">Configura o número para chamadas e WhatsApp.</p>
                  </div>
                </div>
                <label className="text-[10px] font-bold uppercase text-brand-leaf mb-2 block">Número de Telefone (com indicativo)</label>
                <input 
                  type="text" 
                  value={formData.phoneNumber} 
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} 
                  className="w-full border p-3 rounded-xl text-sm font-mono" 
                  placeholder="Ex: +351937832777"
                />
                <p className="text-[9px] text-brand-dark/40 mt-2 italic">Este número será usado nos botões flutuantes e na barra mobile.</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Redes Sociais</h4>
                <div>
                  <label className="text-[10px] font-bold uppercase text-brand-leaf mb-2 block">Instagram</label>
                  <input type="text" value={formData.socialLinks.instagram} onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})} className="w-full border p-3 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-brand-leaf mb-2 block">Facebook</label>
                  <input type="text" value={formData.socialLinks.facebook} onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, facebook: e.target.value}})} className="w-full border p-3 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-brand-leaf mb-2 block">TikTok</label>
                  <input type="text" value={formData.socialLinks.tiktok} onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, tiktok: e.target.value}})} className="w-full border p-3 rounded-xl text-sm" />
                </div>
              </div>
            </div>
          )}

          {/* TAB: HORÁRIOS */}
          {activeTab === "horarios" && (
            <div className="grid md:grid-cols-2 gap-4">
              {formData.hours.map((h: any, i: number) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-brand-straw/30 flex items-center justify-between">
                  <span className="font-medium text-sm w-32">{h.day.pt}</span>
                  <input type="text" value={h.time} onChange={(e) => { const newH = [...formData.hours]; newH[i].time = e.target.value; setFormData({...formData, hours: newH}) }} className="border p-2 rounded-lg text-sm w-40 text-center" />
                </div>
              ))}
            </div>
          )}

          {/* TAB: MAPA */}
          {activeTab === "mapa" && (
            <div className="bg-white p-6 rounded-2xl border border-brand-straw/30">
              <label className="text-xs font-bold uppercase text-brand-leaf mb-2 block">Link SRC de Incorporação do Google Maps</label>
              <textarea value={formData.mapEmbedUrl} onChange={(e) => setFormData({...formData, mapEmbedUrl: e.target.value})} className="w-full border p-4 rounded-xl text-sm font-mono text-brand-dark/70" rows={6} />
            </div>
          )}

        </div>

        {/* Footer Buttons */}
        <div className="bg-white p-6 border-t border-brand-straw/30 flex justify-between items-center">
          <div className="flex gap-6">
            <button onClick={handleReset} className="flex items-center gap-2 text-red-500/60 hover:text-red-500 font-medium text-xs transition-colors">
              <RotateCcw size={16} /> Restaurar Padrão
            </button>
            <button onClick={handleExportCode} className="flex items-center gap-2 text-brand-dark/50 hover:text-brand-dark font-medium text-xs transition-colors">
              <Code size={18} /> Gerar Código
            </button>
          </div>
          <div className="flex gap-4">
            <button onClick={onClose} className="btn-outline py-2 px-6 text-xs uppercase tracking-widest">Cancelar</button>
            <button onClick={handleSave} className="btn-primary py-2 px-6 flex items-center gap-2 text-xs uppercase tracking-widest">
              <Save size={16} /> Guardar Live
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};