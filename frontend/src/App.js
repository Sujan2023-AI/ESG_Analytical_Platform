
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';

import Dashboard from './Pages/Dashboard';
import Exploration from './Pages/Exploration';
import Ontology from './Pages/Ontology';
import PCA from './Pages/PCA';
import Enhanced from './Pages/Enhanced';
import Report from './Pages/Report';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exploration" element={<Exploration />} />
        <Route path="/ontology" element={<Ontology />} />
        <Route path="/pca" element={<PCA />} />
        <Route path="/enhanced" element={<Enhanced />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;