
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeminiService } from '../services/geminiService.ts';

const Assistant: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    {role: 'model', text: '¡Hola! Soy tu asistente NeuroBOT. ¿En qué puedo ayudarte hoy?'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const aiResponse = await GeminiService.generateChatResponse(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse || 'No pude procesar tu solicitud.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, hubo un problema técnico con mi conexión.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-background-dark">
      <header className="px-6 py-4 flex items-center justify-between bg-white dark:bg-background-dark border-b dark:border-gray-800 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-surface-dark">
          <span className="material-symbols-outlined dark:text-white">arrow_back</span>
        </button>
        <div className="text-center">
          <h1 className="font-bold dark:text-white leading-none">NeuroBOT Bot</h1>
          <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">En Línea</span>
        </div>
        <div className="w-10"></div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-white dark:bg-surface-dark dark:text-white rounded-tl-none border border-gray-100 dark:border-gray-800'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl rounded-tl-none border dark:border-gray-800 flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-4 bg-white dark:bg-background-dark border-t dark:border-gray-800">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-surface-dark rounded-2xl px-4 py-2 border border-transparent focus-within:border-primary transition-all">
          <textarea 
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-transparent border-none outline-none dark:text-white text-sm py-2 resize-none no-scrollbar"
          />
          <button onClick={handleSend} className="p-2 bg-primary text-white rounded-xl shadow-md hover:bg-blue-600 transition-colors">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Assistant;