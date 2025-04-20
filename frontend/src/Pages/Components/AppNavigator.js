import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Css/AppNavigator.css';

function DashboardNavigator() {
    const navigate = useNavigate();

    var currPage = 5;

    var startButton = document.getElementById('nav' + currPage);
    if (startButton !== null) {
        startButton.classList.add('active');
    }

    const clearButtons = () => {
        document.getElementById('nav1').classList.remove('active');
        document.getElementById('nav2').classList.remove('active');
        document.getElementById('nav3').classList.remove('active');
        document.getElementById('nav4').classList.remove('active');
        document.getElementById('nav5').classList.remove('active');
        document.getElementById('nav6').classList.remove('active');
    }
    const activate = (id) => {
        // clearButtons();
        document.getElementById('nav' + id).classList.add('active');
        localStorage.setItem('navPage', id);
    }

    return (  
        <nav className="nav-links">
            <button id="nav1" className="navi" onClick={() => {clearButtons(); activate(1); navigate('/exploration');}}>Data Exploration</button>
            <button id="nav2" className="navi" onClick={() => {clearButtons(); activate(2); navigate('/pca');}}>PCA Analysis</button>
            <button id="nav3" className="navi" onClick={() => {clearButtons(); activate(3); navigate('/ontology');}}>View Ontology</button>
            <button id="nav4" className="navi" onClick={() => {clearButtons(); activate(4); navigate('/enhanced');}}>Ontology Enhanced PCA Results</button>
            <button id="nav5" className="navi" onClick={() => {clearButtons(); activate(5); navigate('/esg-report');}}>ESG Report</button>
            <button id="nav5" className="navi" onClick={() => {clearButtons(); activate(6); navigate('/pillar-report');}}>Pillar Report</button>
            <button id="nav5" className="navi" onClick={() => {clearButtons(); activate(5); navigate('/Report');}}>Reports</button>
            <button id="nav6" className="navi" onClick={() => {clearButtons(); activate(6); navigate('/DownloadReport');}}>Download Reports</button>
      </nav>
    );
}

export default DashboardNavigator;