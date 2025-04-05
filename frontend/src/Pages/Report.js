import '../Css/Ontology.css';
import React from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';

function Report() {
  return (
    <div className="App">
      <AppHeader />
      <div className='Body'>
        <AppNavigator />
        <div className="content">
          <div>
            <h1>Reporting of the elements</h1>
            <p>Dive into our initial analysis model</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;