
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const renderApp = () => {
  const container = document.getElementById('root');
  if (!container) return;
  
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Asegurar que el DOM esté totalmente listo antes de ejecutar React
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  renderApp();
} else {
  document.addEventListener('DOMContentLoaded', renderApp);
}
