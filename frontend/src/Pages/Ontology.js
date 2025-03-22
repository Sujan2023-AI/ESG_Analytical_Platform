import React from 'react';
import '../Css/Ontology.css';
import AppNavigator from './Components/AppNavigator';

//import ontologyImage from '../../public/ontologyExample.png';

function Ontology() {
  return (
    <div className="App">
      <div className="content">
        <div>
          <h1>Ontology</h1>
          <p>View our primary ontology</p>
        </div>
        <img src="/ontologyExample.png" alt="dummy example ontology" height={210} width={370} />
      </div>
      <AppNavigator />
    </div>
    
  );
}

export default Ontology;