import '../Css/Ontology.css';
import React from 'react';
import { useEffect } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';

function Ontology() {

      useEffect(() => {
          fetch('http://localhost:3902/top_5')
              .then(response => response.json())
              // .then(data => setPillars(data))
              .catch(error => console.error('Error fetching environment risk sub categories:', error));
      });
  return (
    <div className="App">
      <AppHeader />
      <div className='Body'>
        <AppNavigator />
        <div className="content">
          <div>
            <h1>Ontology</h1>
            <p>View our primary ontology</p>
          </div>
          <img src="/ontologyExample.png" alt="dummy example ontology" height={210} width={370} />
        </div>
      </div>
    </div>
  );
}

export default Ontology;