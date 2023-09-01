import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from 'modules/Home/Home.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scoreboard from './modules/Scoreboard/Scoreboard.tsx';
import Exploits from './modules/Exploits/Exploits.tsx';
import Layout from 'modules/Layout.tsx';
import { SnackbarProvider } from 'notistack';
import DataProvider from 'modules/DataProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <BrowserRouter>
        <DataProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scoreboard" element={<Scoreboard />} />
              <Route path="/exploits/*" element={<Exploits />} />
            </Routes>
          </Layout></DataProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
);
