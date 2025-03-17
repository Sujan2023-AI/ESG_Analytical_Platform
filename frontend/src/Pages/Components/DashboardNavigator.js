import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardNavigator() {

  
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/dashboard');
  }
  const goToExploration = () => {
    navigate('/exploration');
  }

  return (  
    <nav className="nav-links">
      <button onClick={goToHome}>Home</button>
      <button onClick={goToExploration}>Explore Data</button>
    </nav>
  );
}

export default DashboardNavigator;