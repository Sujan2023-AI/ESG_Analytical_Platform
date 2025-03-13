import React from 'react';
import '../Css/Dashboard.css';
import Navigator from './Components/Navigator';

function Dashboard() {
  return (
    <div className="App">
      <div className="content">
        <h1>Welcome</h1>
        <p>From here you can navigte to our features below</p>
      </div>
      <Navigator />
    </div>
    
  );
}

export default Dashboard;
