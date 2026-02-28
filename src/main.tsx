// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SalonProvider } from './context/SalonContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SalonProvider>
      <App />
    </SalonProvider>
  </StrictMode>,
);