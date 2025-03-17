import React from 'react';
import '../Css/Dashboard.css';
import AppNavigator from './Components/AppNavigator';
import AppOptions from './Components/AppOptions';

function Dashboard() {
  return (
    <div className="App">
      <div className="content">
        <AppOptions />
        Welcome Sujan to our app. you can select options below
      </div>
      <AppNavigator />
    </div>
    
  );
}

export default Dashboard;