
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserProfile, TicketStatus } from '../types';

const MyTickets: React.FC<{ user: UserProfile, onLogout: () => void }> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const companyName = typeof user.company === 'string' ? user.company : user.company.companyName;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 bg-white dark:bg-background-dark sticky top-0 z-10 border-b border-gray-50 dark:border-gray-900">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black dark:text-white tracking-tight">Mis Tickets</h1>
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
              {companyName} <span className="mx-1 opacity-30">|</span> {user.name}
            </p>
          </div>
          <button onClick={onLogout} className="p-2.5 rounded-2xl bg-gray-50 dark:bg-surface-dark hover:text-red-500 transition-colors">
            <span className="material-symbols-outlined text-sm">logout</span>
          </button>
        </div>
        
        <div className="relative mb-4">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
          <input className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-surface-dark border-none dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Buscar tickets..." />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          <button className="px-5 py-2 bg-primary text-white rounded-full text-xs font-bold whitespace-nowrap shadow-lg shadow-primary/20">Todos</button>
          <button className="px-5 py-2 bg-gray-100 dark:bg-surface-dark dark:text-white rounded-full text-xs font-medium whitespace-nowrap">Abiertos</button>
          <button className="px-5 py-2 bg-gray-100 dark:bg-surface-dark dark:text-white rounded-full text-xs font-medium whitespace-nowrap">Cerrados</button>
        </div>
      </header>

      {/* Ticket List */}
      <main className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
        <div className="space-y-4 py-4">
          <TicketCard 
            id="#4023"
            title="Fallo en VPN Corporativa"
            status={TicketStatus.ACTION_REQUIRED}
            time="Hace 15 min"
            priority="Alta"
            onClick={() => navigate('/ticket-detail/4023')}
          />
          <TicketCard 
            id="#3982"
            title="Reemplazo de Periféricos"
            status={TicketStatus.IN_PROGRESS}
            time="Hace 2 horas"
            priority="Media"
            onClick={() => navigate('/ticket-detail/3982')}
          />
          <div className="p-8 text-center opacity-30">
            <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
            <p className="text-xs font-bold uppercase tracking-widest">No hay más tickets</p>
          </div>
        </div>
      </main>

      {/* Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 flex justify-around items-center z-20">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-2xl">confirmation_number</span>
          <span className="text-[10px] font-black uppercase tracking-tighter">Tickets</span>
        </button>
        <Link to="/assistant" className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">chat_bubble</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Bot</span>
        </Link>
        <Link to="/tech-dashboard" className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Panel</span>
        </Link>
      </nav>

      <Link to="/new-ticket" className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all z-30 group">
        <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">add</span>
      </Link>
    </div>
  );
};

const TicketCard: React.FC<{ id: string, title: string, status: TicketStatus, time: string, priority: string, onClick: () => void }> = ({ id, title, status, time, priority, onClick }) => {
  const statusColors = {
    [TicketStatus.OPEN]: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    [TicketStatus.IN_PROGRESS]: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    [TicketStatus.ACTION_REQUIRED]: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    [TicketStatus.CLOSED]: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  };

  return (
    <div onClick={onClick} className="p-5 rounded-[2rem] bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer hover:border-primary/50 transition-all group">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-black text-gray-400 tracking-tighter">{id}</span>
        <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <h3 className="font-bold dark:text-white mb-3 text-sm group-hover:text-primary transition-colors leading-tight">{title}</h3>
      <div className="flex justify-between items-center text-[10px]">
        <span className="text-gray-400 font-medium">{time}</span>
        <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-background-dark px-2 py-1 rounded-lg">
          <span className="text-gray-500 font-bold uppercase tracking-tighter">{priority}</span>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
