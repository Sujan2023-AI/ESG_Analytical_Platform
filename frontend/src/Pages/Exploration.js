import React from 'react';
import '../Css/Dashboard.css';
import Navigator from './Components/Navigator';

function Exploration() {
  return (
    <div className="App">
      <div className="content">
        <h1>Data Exploration</h1>
        <p>ESG</p>
        <p>E - Environemnt</p>
        <p>S - Social</p>
        <p>G - Governance</p>
      </div>
      <Navigator />
    </div>
  );
}

export default Exploration;
