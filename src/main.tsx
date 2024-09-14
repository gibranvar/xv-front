import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'aos/dist/aos.css'; // Importa el CSS de AOS
import AOS from 'aos';
// Inicializa AOS
AOS.init({
  duration: 1000, // Duración de la animación en milisegundos
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
