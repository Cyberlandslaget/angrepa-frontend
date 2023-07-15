import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/scoreboard" element={<h1>TODO scoreboard</h1>} />
        <Route path="/exploits" element={<h1>TODO exploits</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
