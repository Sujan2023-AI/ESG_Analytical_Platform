import React from 'react';
import '../Css/Exploration.css';
import Navigator from './Components/AppNavigator';

function Exploration() {
  return (
    <div className="App">
      <h1>Data Exploration</h1>
      <div className="exploration-content">
        <div className="esg-selection">
          <button>Environment</button>
          <button>Social</button>
          <button>Governance</button>
        </div>
        <div className="ro-selection">
          <button>Risk</button>
          <button>Opportunity</button>
        </div>
      </div>
      <Navigator />
    </div>
  );
}

export default Exploration;
