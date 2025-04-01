import React from 'react';
import '../Css/Dashboard.css';
import AppNavigator from './Components/AppNavigator';
import AppOptions from './Components/AppOptions';
import AppHeader from './Components/AppHeader';

function Dashboard() {
  return (
    <div className="App">
      <AppHeader />
      <div>
        <div className="content">
          <AppOptions />
        </div>
      </div>
      <AppNavigator />
    </div>
    
  );
}

export default Dashboard;