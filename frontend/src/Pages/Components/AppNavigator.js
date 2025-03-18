import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Css/AppNavigator.css';

function DashboardNavigator() {
  const navigate = useNavigate();

  return (  
    <nav className="nav-links">
      <button onClick={() => navigate('/Dashboard')}>Home</button>
      <button onClick={() => navigate('/exploration')}>Data Exploration</button>
      <button onClick={() => navigate('/pca')}>PCA Analysis</button>
      <button onClick={() => navigate('/ontology')}>View Ontology</button>
      <button onClick={() => navigate('/enhanced')}>Ontology Enhanced PCA Analysis</button>
      <button>Logout</button>
    </nav>
  );
}

export default DashboardNavigator;