
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Metrics: React.FC = () => {
  const navigate = useNavigate();

  const data = [
    { name: 'Lun', tickets: 12 },
    { name: 'Mar', tickets: 19 },
    { name: 'Mie', tickets: 15 },
    { name: 'Jue', tickets: 22 },
    { name: 'Vie', tickets: 10 },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-background-dark">
      <header className="px-6 py-4 flex items-center justify-between bg-white dark:bg-background-dark border-b dark:border-gray-800 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-surface-dark">
          <span className="material-symbols-outlined dark:text-white">arrow_back</span>
        </button>
        <h1 className="font-bold dark:text-white">Análisis y Métricas</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-sm border dark:border-gray-800">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Tickets Resueltos por Día</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Bar dataKey="tickets" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#3b82f6' : '#1e3a8a'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MetricCard label="CSAT" value="4.8/5" sub="Satisfacción" />
          <MetricCard label="TTR" value="42m" sub="Tiempo de Resp." />
        </div>

        <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-sm border dark:border-gray-800">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Eficiencia IA</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100 dark:text-gray-800" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 * 0.15} className="text-primary" />
              </svg>
              <span className="absolute text-xs font-black dark:text-white">85%</span>
            </div>
            <div>
              <p className="text-sm font-bold dark:text-white">Autoresolución</p>
              <p className="text-xs text-gray-500">Tickets cerrados por el bot sin intervención técnica.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const MetricCard: React.FC<{ label: string, value: string, sub: string }> = ({ label, value, sub }) => (
  <div className="bg-white dark:bg-surface-dark p-4 rounded-3xl border dark:border-gray-800 shadow-sm text-center">
    <p className="text-xl font-black text-primary mb-1">{value}</p>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
    <p className="text-[8px] text-gray-500 mt-1">{sub}</p>
  </div>
);

export default Metrics;
