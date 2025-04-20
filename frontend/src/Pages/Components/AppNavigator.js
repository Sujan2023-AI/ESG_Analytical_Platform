import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Css/AppNavigator.css';

function DashboardNavigator() {
    const navigate = useNavigate();

    const [activePage, setActivePage] = useState(() => {
        return localStorage.getItem("currentPage") || "0";
    });

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
        if (button != undefined) { /* this cannot be change to !== as it throws an error, but the linter wants it*/
            button.classList.add("active");
        }
    }, [activePage]);

    return (  
        <nav className="nav-links">
            <button id="nav-button-1" className="nav-button" onClick={() => {setActivePage(1); navigate('/exploration');}}>Data Exploration</button>
            <button id="nav-button-2" className="nav-button" onClick={() => {setActivePage(2); navigate('/pca');}}>PCA Analysis</button>
            <button id="nav-button-3" className="nav-button" onClick={() => {setActivePage(3); navigate('/ontology');}}>View Ontology</button>
            <button id="nav-button-4" className="nav-button" onClick={() => {setActivePage(4); navigate('/enhanced');}}>Ontology Enhanced PCA Results</button>
            <button id="nav-button-5" className="nav-button" onClick={() => {setActivePage(5); navigate('/esg-report');}}>ESG Report</button>
            <button id="nav-button-6" className="nav-button" onClick={() => {setActivePage(6); navigate('/pillar-report');}}>Pillar Report</button>
            <button id="nav-button-7" className="nav-button" onClick={() => {setActivePage(7); navigate('/DownloadReport');}}>Download Reports</button>
      </nav>
    );
}

export default DashboardNavigator;