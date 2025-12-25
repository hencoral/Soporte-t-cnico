
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeminiService } from '../services/geminiService';

const NewTicket: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [generatingVideo, setGeneratingVideo] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const generateAnimation = async () => {
    if (!filePreview || !description) return;
    
    setGeneratingVideo(true);
    setLoadingStep('Analizando escena...');
    
    try {
      const b64 = filePreview.split(',')[1];
      const videoUrl = await GeminiService.generateErrorVideo(b64, description);
      setGeneratedVideoUrl(videoUrl);
    } catch (error) {
      console.error(error);
      alert("Hubo un error generando la animación. Por favor intenta de nuevo.");
    } finally {
      setGeneratingVideo(false);
      setLoadingStep('');
    }
  };

  const loadingMessages = [
    "Sintetizando vectores de movimiento...",
    "Reconstruyendo entorno 3D...",
    "Generando visualización de falla...",
    "Finalizando animación de soporte..."
  ];

  React.useEffect(() => {
    if (generatingVideo) {
      const interval = setInterval(() => {
        setLoadingStep(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [generatingVideo]);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-background-dark">
      <header className="px-6 py-4 flex items-center justify-between border-b dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-surface-dark">
          <span className="material-symbols-outlined dark:text-white">close</span>
        </button>
        <h1 className="font-bold dark:text-white">Nuevo Ticket</h1>
        <button onClick={() => navigate('/')} className="text-primary font-bold">Enviar</button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6 pb-20">
        <div>
          <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">DESCRIPCIÓN DEL PROBLEMA</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4} 
            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark dark:text-white outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-400 resize-none"
            placeholder="¿Qué está pasando? Describe el error o problema..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">EVIDENCIA VISUAL</label>
          <div className="grid grid-cols-2 gap-4">
            {!filePreview ? (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors"
              >
                <span className="material-symbols-outlined text-gray-400 text-3xl">add_a_photo</span>
                <span className="text-xs font-medium text-gray-400">Añadir Foto</span>
              </button>
            ) : (
              <div className="relative aspect-square rounded-2xl overflow-hidden border dark:border-gray-700">
                <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => {setFile(null); setFilePreview(null); setGeneratedVideoUrl(null);}} 
                  className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            )}
            
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

            {filePreview && !generatedVideoUrl && !generatingVideo && (
              <button 
                onClick={generateAnimation}
                disabled={!description}
                className="aspect-square rounded-2xl bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 flex flex-col items-center justify-center gap-2 hover:bg-purple-200 transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-3xl">movie</span>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 px-2 text-center">Animar Error con IA</span>
              </button>
            )}

            {generatingVideo && (
              <div className="aspect-square rounded-2xl bg-gray-100 dark:bg-surface-dark flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                <div className="animate-shimmer absolute inset-0"></div>
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-bold text-primary animate-pulse text-center px-4">{loadingStep}</p>
              </div>
            )}

            {generatedVideoUrl && (
              <div className="aspect-square rounded-2xl overflow-hidden border dark:border-gray-700 relative group">
                <video src={generatedVideoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-purple-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest">IA Video</div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-500 dark:text-gray-400">CATEGORÍA</label>
          <div className="flex flex-wrap gap-2">
            {['Hardware', 'Software', 'Redes', 'Accesos', 'Otros'].map(cat => (
              <button key={cat} className="px-4 py-2 rounded-full border dark:border-gray-700 dark:text-white text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-6 pt-2">
        <button 
          onClick={() => navigate('/')}
          className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          Crear Ticket de Soporte
          <span className="material-symbols-outlined">send</span>
        </button>
      </footer>
    </div>
  );
};

export default NewTicket;
