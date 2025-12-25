
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TicketDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-background-dark">
      <header className="px-6 py-4 flex items-center justify-between bg-white dark:bg-background-dark border-b dark:border-gray-800 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-surface-dark">
          <span className="material-symbols-outlined dark:text-white">arrow_back</span>
        </button>
        <h1 className="font-bold dark:text-white">Ticket #{id}</h1>
        <button className="text-red-500 font-bold text-sm">Cerrar</button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-sm border dark:border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold dark:text-white">Fallo en VPN Corporativa</h2>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Acción Requerida</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            No puedo conectar a la VPN desde mi hogar. Sale error de autenticación 0x800.
          </p>
          
          <div className="grid grid-cols-2 gap-4 border-t dark:border-gray-800 pt-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Prioridad</p>
              <p className="text-sm font-bold text-orange-500">Alta</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Asignado a</p>
              <p className="text-sm font-bold dark:text-white">Carlos Soporte</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-600/10 dark:bg-purple-900/20 p-4 rounded-2xl border border-purple-200 dark:border-purple-800/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">auto_awesome</span>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Análisis IA</span>
          </div>
          <p className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
            Basado en tickets previos, el error 0x800 suele resolverse con un reseteo de la cuenta de Active Directory. Se sugiere verificar el estado de la cuenta del usuario.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold dark:text-white text-sm uppercase tracking-widest">Actividad</h3>
          <div className="relative pl-6 space-y-6 border-l-2 border-gray-100 dark:border-gray-800">
             <ActivityItem 
              time="Hace 10 min"
              user="IA NeuroBOT"
              content="Sugerencia de solución enviada al técnico."
              isSystem
            />
            <ActivityItem 
              time="Hoy 10:30 AM"
              user="Juan Pérez"
              content="Envié el ticket inicial con los detalles del error."
            />
          </div>
        </div>
      </main>

      <footer className="p-4 bg-white dark:bg-background-dark border-t dark:border-gray-800">
        <button className="w-full py-4 bg-gray-100 dark:bg-surface-dark dark:text-white font-bold rounded-2xl">Responder al Técnico</button>
      </footer>
    </div>
  );
};

const ActivityItem: React.FC<{ time: string, user: string, content: string, isSystem?: boolean }> = ({ time, user, content, isSystem }) => (
  <div className="relative">
    <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 bg-white dark:bg-background-dark ${isSystem ? 'border-purple-500' : 'border-primary'}`}></div>
    <p className="text-[10px] font-bold text-gray-400 mb-1">{time} • {user}</p>
    <p className="text-xs dark:text-gray-300 leading-relaxed">{content}</p>
  </div>
);

export default TicketDetail;