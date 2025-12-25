
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TechDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-background-dark relative">
      <header className="p-6 bg-white dark:bg-background-dark border-b dark:border-gray-800 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black dark:text-white">Panel <span className="text-primary">NeuroBOT</span></h1>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-100 dark:bg-surface-dark rounded-full">
              <span className="material-symbols-outlined dark:text-white text-sm">notifications</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Pendientes" value="12" color="text-primary" />
          <StatCard label="Urgentes" value="3" color="text-red-500" />
          <StatCard label="Hoy" value="8" color="text-green-500" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6 pb-32 no-scrollbar">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold dark:text-white uppercase text-xs tracking-widest">Colas Críticas</h2>
            <Link to="/metrics" className="text-xs font-bold text-primary">Ver Métricas</Link>
          </div>
          
          <div className="space-y-4">
            <TechTaskCard 
              id="#4023"
              title="Error VPN - Juan Pérez"
              sla="23m restante"
              impact="Alto"
              status="En Espera"
            />
            <TechTaskCard 
              id="#3950"
              title="SAP Down - Contabilidad"
              sla="EXCEDIDO"
              impact="Crítico"
              status="En Progreso"
              isOverdue
            />
          </div>
        </section>

        <section>
          <h2 className="font-bold dark:text-white uppercase text-xs tracking-widest mb-4">Herramientas IA</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-900/20 text-left">
              <span className="material-symbols-outlined mb-2">auto_awesome</span>
              <p className="text-sm font-bold">Diagnóstico Predictivo</p>
            </button>
            <button className="p-4 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-900/20 text-left">
              <span className="material-symbols-outlined mb-2">history</span>
              <p className="text-sm font-bold">Base de Conocimiento</p>
            </button>
          </div>
        </section>
      </main>

      {/* Nav con Grid 3 columnas fija */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 py-3 grid grid-cols-3 z-40 h-16">
        <Link to="/" className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Tickets</span>
        </Link>
        <Link to="/assistant" className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Bot</span>
        </Link>
        <button className="flex flex-col items-center justify-center gap-1 text-primary">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[9px] font-black uppercase tracking-tighter">Panel</span>
        </button>
      </nav>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string, color: string }> = ({ label, value, color }) => (
  <div className="bg-gray-100 dark:bg-surface-dark p-3 rounded-2xl border dark:border-gray-800">
    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
    <p className={`text-xl font-black ${color}`}>{value}</p>
  </div>
);

const TechTaskCard: React.FC<{ id: string, title: string, sla: string, impact: string, status: string, isOverdue?: boolean }> = ({ id, title, sla, impact, status, isOverdue }) => (
  <div className="p-4 rounded-2xl bg-white dark:bg-surface-dark border dark:border-gray-800 shadow-sm flex flex-col gap-3">
    <div className="flex justify-between items-center">
      <span className="text-xs font-bold text-gray-400">{id}</span>
      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${isOverdue ? 'bg-red-500 text-white' : 'bg-primary/10 text-primary'}`}>SLA: {sla}</span>
    </div>
    <h3 className="font-bold dark:text-white">{title}</h3>
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <span className="text-[10px] font-bold text-gray-500 border dark:border-gray-700 px-2 py-0.5 rounded">Impacto: {impact}</span>
      </div>
      <button className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">Atender</button>
    </div>
  </div>
);

export default TechDashboard;
