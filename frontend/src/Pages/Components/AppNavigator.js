import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Css/AppNavigator.css';

function DashboardNavigator() {

  
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/dashboard');
  }
  

  return (  
    <nav className="nav-links">
      <button onClick={goToHome}>Home</button>
      
      <button onClick={() => navigate('/exploration')}>Data Exploration</button>
      <button onClick={() => navigate('/exploration')}>View Ontology</button>
      <button onClick={() => navigate('/exploration')}>PCA Analysis</button>
      <button onClick={() => navigate('/exploration')}>Ontology Enhanced PCA Analysis</button>
    </nav>
  );
}

export default DashboardNavigator;