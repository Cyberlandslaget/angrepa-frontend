import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from 'modules/Home/Home.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scoreboard from './Scoreboard.tsx';
import Exploits from './Exploits.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/exploits" element={<Exploits />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
