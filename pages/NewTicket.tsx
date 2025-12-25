
import React, { useState, useRef, useEffect } from 'react';
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
  
  // Voice Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleTranscription(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("No se pudo acceder al micrófono:", err);
      alert("Necesitamos acceso al micrófono para grabar la nota de voz.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) window.clearInterval(timerRef.current);
    }
  };

  const handleTranscription = async (blob: Blob) => {
    setIsTranscribing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        const transcription = await GeminiService.transcribeAudio(base64Audio);
        if (transcription) {
          setDescription(prev => prev ? `${prev}\n\n${transcription}` : transcription);
        }
      };
    } catch (error) {
      console.error("Error transcribiendo:", error);
    } finally {
      setIsTranscribing(false);
    }
  };

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

  useEffect(() => {
    if (generatingVideo) {
      const interval = setInterval(() => {
        setLoadingStep(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [generatingVideo]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-background-dark">
      <header className="px-6 py-4 flex items-center justify-between border-b dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-surface-dark">
          <span className="material-symbols-outlined dark:text-white">close</span>
        </button>
        <h1 className="font-bold dark:text-white">Nuevo Ticket</h1>
        <button onClick={() => navigate('/')} className="text-primary font-bold">Enviar</button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6 pb-20 no-scrollbar">
        <div className="relative">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Descripción del Problema</label>
          <div className="relative group">
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6} 
              className="w-full p-5 pb-14 rounded-3xl bg-gray-50 dark:bg-surface-dark dark:text-white outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-400 resize-none transition-all shadow-inner"
              placeholder="¿Qué está pasando? Escribe o graba tu problema..."
            />
            
            {/* Voice Control Button Group */}
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              {isRecording && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 rounded-full animate-pulse">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-[10px] font-black text-red-500 font-mono">{formatTime(recordingTime)}</span>
                </div>
              )}
              
              {isTranscribing && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                  <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-tighter">Procesando...</span>
                </div>
              )}

              <button 
                type="button"
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                  isRecording 
                    ? 'bg-red-500 text-white scale-110 shadow-red-500/30' 
                    : 'bg-primary text-white hover:scale-105 active:scale-95'
                } ${isTranscribing ? 'opacity-50 pointer-events-none' : ''}`}
                title="Mantén presionado para grabar"
              >
                <span className="material-symbols-outlined text-2xl">
                  {isRecording ? 'stop' : 'mic'}
                </span>
              </button>
            </div>
          </div>
          <p className="mt-2 text-[9px] text-gray-400 font-bold uppercase tracking-tight text-right italic">Mantén presionado el micrófono para grabar</p>
        </div>

        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Evidencia Visual</label>
          <div className="grid grid-cols-2 gap-4">
            {!filePreview ? (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors"
              >
                <span className="material-symbols-outlined text-gray-400 text-3xl">add_a_photo</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Añadir Foto</span>
              </button>
            ) : (
              <div className="relative aspect-square rounded-3xl overflow-hidden border dark:border-gray-700 group">
                <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => {setFile(null); setFilePreview(null); setGeneratedVideoUrl(null);}} 
                  className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
                className="aspect-square rounded-3xl bg-purple-600 text-white flex flex-col items-center justify-center gap-2 hover:bg-purple-700 transition-all shadow-xl shadow-purple-900/20 disabled:opacity-50 group"
              >
                <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">movie</span>
                <span className="text-[10px] font-black uppercase px-4 text-center tracking-tighter">Simular con IA</span>
              </button>
            )}

            {generatingVideo && (
              <div className="aspect-square rounded-3xl bg-gray-100 dark:bg-surface-dark flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                <div className="animate-shimmer absolute inset-0"></div>
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-primary animate-pulse text-center px-4 uppercase tracking-tighter">{loadingStep}</p>
              </div>
            )}

            {generatedVideoUrl && (
              <div className="aspect-square rounded-3xl overflow-hidden border dark:border-gray-700 relative group shadow-2xl">
                <video src={generatedVideoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-purple-600 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">Predictivo IA</div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Categoría del Incidente</label>
          <div className="flex flex-wrap gap-2">
            {['Hardware', 'Software', 'Redes', 'Accesos', 'Sistemas'].map(cat => (
              <button key={cat} className="px-5 py-2.5 rounded-2xl border dark:border-gray-700 dark:text-white text-xs font-bold hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-6 pt-2 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button 
          onClick={() => navigate('/')}
          className="w-full py-4.5 bg-primary text-white font-black rounded-[2rem] shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
        >
          Crear Ticket de Soporte
          <span className="material-symbols-outlined text-xl">send</span>
        </button>
      </footer>
    </div>
  );
};

export default NewTicket;
