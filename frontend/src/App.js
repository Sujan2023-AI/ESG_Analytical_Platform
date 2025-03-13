
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Exploration from './Pages/Exploration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exploration" element={<Exploration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

