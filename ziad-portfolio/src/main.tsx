import React from 'react';
import ReactDOM from 'react-dom/client';
import AOS from 'aos';
import App from './App';
import './styles/index.css';
import 'aos/dist/aos.css';

AOS.init({
  duration: 1000,
  once: true,
  easing: 'ease-out-cubic',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
