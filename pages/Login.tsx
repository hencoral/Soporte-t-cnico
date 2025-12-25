
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProfile } from '../types.ts';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

const NeuroBOTLogo = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
    <path d="M20 35L50 48L80 35L50 22L20 35Z" stroke="#136dec" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 35V75L50 88V48" stroke="#136dec" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M80 35V75L50 88" stroke="#136dec" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 22C42 8 28 12 38 22C48 32 50 22 50 22Z" stroke="#136dec" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 22C58 8 72 12 62 22C52 32 50 22 50 22Z" stroke="#136dec" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <g transform="translate(65, 68) scale(0.45)">
      <circle cx="0" cy="-20" r="7" fill="#136dec" />
      <circle cx="20" cy="0" r="7" fill="#136dec" />
      <circle cx="0" cy="20" r="7" fill="#136dec" />
      <circle cx="-20" cy="0" r="7" fill="#136dec" />
      <path d="M0 -20L20 0L0 20L-20 0Z" stroke="#136dec" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const storedUser = localStorage.getItem('sisst_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email || user.company?.workEmail === email) {
          onLogin(user);
          return;
        }
      }
      alert("Credenciales no encontradas. Si acabas de registrarte, asegúrate de usar el email corporativo correcto.");
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    const mockUser: UserProfile = {
      name: "Usuario Demo",
      email: "demo@neurobot.com",
      role: "Usuario",
      company: {
        companyName: "NeuroBOT Corp",
        taxId: "900.123.456-7",
        industry: "Tecnología",
        employeeCount: "100-500",
        department: "Innovación",
        officeLocation: "Sede Principal",
        workEmail: "demo@neurobot.com",
        phone: "+57 300 000 0000"
      }
    };
    
    setTimeout(() => {
      onLogin(mockUser);
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark p-8 animate-fade">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-12 text-center">
          <NeuroBOTLogo />
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
            Neuro<span className="text-primary">BOT</span>
          </h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-3">Soporte Inteligente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2 block">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border-none dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="nombre@empresa.com" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2 block">Contraseña</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border-none dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="••••••••" />
          </div>

          <button disabled={loading} type="submit" className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center">
            {loading ? "Iniciando..." : "Ingresar"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t dark:border-gray-800"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-background-dark px-2 text-gray-500 font-bold">o también</span></div>
        </div>

        <button 
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full py-4 bg-gray-100 dark:bg-surface-dark dark:text-white font-black rounded-2xl border-2 border-transparent hover:border-primary/30 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">rocket_launch</span>
          Acceso Rápido (Demo)
        </button>
      </div>

      <div className="mt-8 text-center pb-4">
        <p className="text-sm text-gray-500">¿Eres nuevo en la plataforma?</p>
        <Link to="/register" className="text-primary font-black uppercase text-xs tracking-widest mt-2 inline-block">
          Crea tu Perfil Corporativo
        </Link>
      </div>
    </div>
  );
};

export default Login;
