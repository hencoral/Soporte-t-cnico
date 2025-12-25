import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProfile } from './types.ts';

// Pages
import Login from './pages/Login.tsx';
import Registration from './pages/Registration.tsx';
import MyTickets from './pages/MyTickets.tsx';
import NewTicket from './pages/NewTicket.tsx';
import Assistant from './pages/Assistant.tsx';
import TechDashboard from './pages/TechDashboard.tsx';
import TicketDetail from './pages/TicketDetail.tsx';
import Metrics from './pages/Metrics.tsx';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sisst_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error recuperando sesión:", e);
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const handleAuth = (userData: UserProfile) => {
    localStorage.setItem('sisst_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('sisst_user');
    setUser(null);
  };

  if (isInitializing) {
    return null;
  }

  return (
    <HashRouter>
      <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark shadow-2xl relative border-x border-gray-100 dark:border-gray-800">
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login onLogin={handleAuth} />} />
              <Route path="/register" element={<Registration onRegister={handleAuth} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<MyTickets user={user} onLogout={handleLogout} />} />
              <Route path="/new-ticket" element={<NewTicket />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/tech-dashboard" element={<TechDashboard />} />
              <Route path="/ticket-detail/:id" element={<TicketDetail />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;