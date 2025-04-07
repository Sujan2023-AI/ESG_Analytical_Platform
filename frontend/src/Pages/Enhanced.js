import '../Css/Enhanced.css';
import React from 'react';
import { useState, useEffect } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';

function Enhanced() {
  



  return (
    <div className="App">
      <AppHeader />
      <div className='Body'>
        <AppNavigator />
        <div className="content">
          <div>
            <h1>Ontology Enhanced Principle Component Analysis</h1>
            <p>Get advanced insights from our enhanced PCA analysis</p>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Enhanced;