import '../Css/Enhanced.css';
import React from 'react';
import { useEffect, useState } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';

function Enhanced() {

    // const [top5, setTop5] = useState([]);

    fetch('http://localhost:3902/top_5')
        .then(response => response.json())
        //.then(data => setTop5(data))
        .catch(error => console.error('Error fetching environment risk sub categories:', error));

    useEffect(() => {
    });
  
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