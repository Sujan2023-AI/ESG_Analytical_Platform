import '../Css/Exploration.css';
import React from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';

function Exploration() {
    return (
        <div className="App">
            <AppHeader />
            <div className='Body'>
                <AppNavigator />
                <div className='content'>
                    <div className='explorationContent'>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Exploration;
