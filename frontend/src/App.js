// this file handles the navigational structure of the site
// for the login/landing page see the Pages/Login.js file
// for the home/dashboard page see the Pages/Home.js file

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';

import Home from './Pages/Home';
import DataExploration from './Pages/DataExploration';
import Ontology from './Pages/Ontology';
import PCA from './Pages/PCA';
import Enhanced from './Pages/Enhanced';
import EsgReport from './Pages/EsgReport';
import DownloadReport from './Pages/DownloadReports';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/home" element={<Home />} />
                <Route path="/data-exploration" element={<DataExploration />} />
                <Route path="/ontology" element={<Ontology />} />
                <Route path="/pca" element={<PCA />} />
                <Route path="/enhanced" element={<Enhanced />} />
                <Route path="/esg-report" element={<EsgReport />} />
                <Route path="/DownloadReport" element={<DownloadReport />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;