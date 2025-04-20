
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';

import Dashboard from './Pages/Dashboard';
import Exploration from './Pages/Exploration';
import Ontology from './Pages/Ontology';
import PCA from './Pages/PCA';
import Enhanced from './Pages/Enhanced';
import EsgReport from './Pages/EsgReport';
import PillarReport from './Pages/PillarReport';
// import DownloadReport from './Pages/DownloadReports';

function App() {

    useEffect(() => {
        localStorage.clear();  // Clears the localStorage when the app starts
    }, []); 

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/exploration" element={<Exploration />} />
                <Route path="/ontology" element={<Ontology />} />
                <Route path="/pca" element={<PCA />} />
                <Route path="/enhanced" element={<Enhanced />} />
                <Route path="/esg-report" element={<EsgReport />} />
                <Route path="/pillar-report" element={<PillarReport />} />
                <Route path="/DownloadReport" element={<DownloadReport />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;