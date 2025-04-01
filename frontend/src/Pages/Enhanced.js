import React from 'react';
import '../Css/Enhanced.css';
import AppNavigator from './Components/AppNavigator';
import AppHeader from './Components/AppHeader';

function Enhanced() {
  return (
    <div className="App">
      <AppHeader />
      <div className="content">
        <div>
          <h1>Ontology Enhanced Principle Component Analysis</h1>
          <p>Get advanced insights from our enhanced PCA analysis</p>
        </div>
        <p>(Coming soon!)</p>
      </div>
      <AppNavigator />
    </div>
    
  );
}

export default Enhanced;