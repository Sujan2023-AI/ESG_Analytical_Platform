import React from 'react';
import '../Css/Ontology.css';
import AppNavigator from './Components/AppNavigator';

function PCA() {
  return (
    <div className="App">
      <div className="content">
        <div>

          <h1>Principle Component Analysis</h1>
          <p>Dive into our initial analysis model</p>
        </div>
        <img src="/pcaExample.png" alt="image" height={210} width={370} />
      </div>
      <AppNavigator />
    </div>
    
  );
}

export default PCA;