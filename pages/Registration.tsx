
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types.ts';

interface RegistrationProps {
  onRegister: (user: UserProfile) => void;
}

const Registration: React.FC<RegistrationProps> = ({ onRegister }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Employee',
    companyName: '',
    taxId: '',
    industry: 'Tecnología',
    employeeCount: '1-50',
    department: '',
    officeLocation: '',
    workEmail: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserProfile = {
      name: formData.name,
      email: formData.workEmail,
      role: formData.role,
      company: {
        companyName: formData.companyName,
        taxId: formData.taxId,
        industry: formData.industry,
        employeeCount: formData.employeeCount,
        department: formData.department,
        officeLocation: formData.officeLocation,
        workEmail: formData.workEmail,
        phone: formData.phone
      }
    };
    onRegister(user);
  };

  const isStep1Valid = formData.name && formData.role;
  const isStep2Valid = formData.companyName && formData.taxId && formData.industry;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark p-8 animate-fade overflow-y-auto no-scrollbar">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
          Neuro<span className="text-primary">BOT</span>
        </h1>
        <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Registro Corporativo</p>
      </div>

      <div className="flex gap-2 mb-10">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= s ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-800'}`}></div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex-1">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black dark:text-white">Sobre <span className="text-primary">Ti</span></h2>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Nombre Completo</label>
              <input required name="name" value={formData.name} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border-none dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Ej: Carlos Silva" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Tu Rol</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border-none dark:text-white focus:ring-2 focus:ring-primary outline-none">
                <option value="Employee">Usuario</option>
                <option value="Technician">Técnico de Soporte</option>
                <option value="Admin">Administrador TI</option>
              </select>
            </div>
            <button type="button" onClick={() => setStep(2)} disabled={!isStep1Valid} className="w-full py-4 bg-primary text-white font-black rounded-2xl mt-4 disabled:opacity-50 transition-opacity">Siguiente Paso</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black dark:text-white">Sobre tu <span className="text-primary">Empresa</span></h2>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Nombre de Empresa</label>
              <input required name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border-none dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Ej: TechCorp S.A.S" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Sector / Industria</label>
                <select name="industry" value={formData.industry} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border-none dark:text-white focus:ring-2 focus:ring-primary outline-none">
                  <option value="Tecnología">Tecnología</option>
                  <option value="Finanzas">Finanzas</option>
                  <option value="Salud">Salud</option>
                  <option value="Educación">Educación</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Colaboradores</label>
                <select name="employeeCount" value={formData.employeeCount} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border-none dark:text-white focus:ring-2 focus:ring-primary outline-none">
                  <option value="1-50">1-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-1000">201-1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">NIT / Tax ID</label>
              <input required name="taxId" value={formData.taxId} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border-none dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Número fiscal" />
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 border dark:border-gray-800 dark:text-white font-bold rounded-2xl">Atrás</button>
              <button type="button" onClick={() => setStep(3)} disabled={!isStep2Valid} className="flex-[2] py-4 bg-primary text-white font-black rounded-2xl disabled:opacity-50 transition-opacity">Siguiente</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black dark:text-white">Ubicación y <span className="text-primary">Contacto</span></h2>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Departamento / Área</label>
              <input required name="department" value={formData.department} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border-none dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Ej: Operaciones IT" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Sede / Oficina</label>
              <input required name="officeLocation" value={formData.officeLocation} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border-none dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="Ej: Torre Norte - Oficina 502" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Correo Corporativo</label>
              <input required type="email" name="workEmail" value={formData.workEmail} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark border-none dark:text-white focus:ring-2 focus:ring-primary outline-none" placeholder="usuario@empresa.com" />
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 border dark:border-gray-800 dark:text-white font-bold rounded-2xl">Atrás</button>
              <button type="submit" className="flex-[2] py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 active:scale-[0.98] transition-all">Finalizar Registro</button>
            </div>
          </div>
        )}
      </form>

      <div className="mt-8 text-center pb-4">
        <p className="text-sm text-gray-500">¿Ya tienes cuenta?</p>
        <Link to="/login" className="text-primary font-black uppercase text-xs tracking-widest mt-2 inline-block">
          Inicia Sesión
        </Link>
      </div>
    </div>
  );
};

export default Registration;
