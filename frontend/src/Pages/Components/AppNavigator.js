import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Css/AppNavigator.css';

function DashboardNavigator() {
    const navigate = useNavigate();

    const [activePage, setActivePage] = useState(() => {
        return localStorage.getItem("currentPage") || "0";
    });

    const navClicked = (id) => {
        setActivePage(id);
    }

    const deactivateAllButtons = () => {
        var navButtons = document.getElementsByClassName("nav-button");
        for (let button of navButtons) {
            button.classList.remove("active");
        }
    }
      
    useEffect(() => {
        localStorage.setItem("currentPage", activePage);
        deactivateAllButtons();
        let buttonId = "nav-button-" + activePage;
        let button = document.getElementById(buttonId);
        if (button) {
            button.classList.add("active");
        }
    }, [activePage]);

    return (  
        <nav className="nav-links">
            <button id="nav-button-1" className="nav-button" onClick={() => {navClicked(1); navigate('/exploration');}}>Data Exploration</button>
            <button id="nav-button-2" className="nav-button" onClick={() => {navClicked(2); navigate('/pca');}}>PCA Analysis</button>
            <button id="nav-button-3" className="nav-button" onClick={() => {navClicked(3); navigate('/ontology');}}>View Ontology</button>
            <button id="nav-button-4" className="nav-button" onClick={() => {navClicked(4); navigate('/enhanced');}}>Ontology Enhanced PCA Results</button>
            <button id="nav-button-5" className="nav-button" onClick={() => {navClicked(5); navigate('/esg-report');}}>ESG Report</button>
            <button id="nav-button-6" className="nav-button" onClick={() => {navClicked(6); navigate('/DownloadReport');}}>Download Reports</button>
      </nav>
    );
}

export default DashboardNavigator;