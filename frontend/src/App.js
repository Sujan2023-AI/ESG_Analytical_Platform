
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';

import Dashboard from './Pages/Dashboard';
import Exploration from './Pages/Exploration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exploration" element={<Exploration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;