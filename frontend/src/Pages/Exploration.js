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
                            <p>There are four main tiers of metric in the Eurofidai dataset. We have preserved these tiers in our EDA process.</p>
                            <p><b>Pillar</b> - this includes the three main ESG categories of environment, social and risk. Each has been subdivided into two sections for risk and opportunity (e.g. Environment_Opportunity)</p>
                            <p><b>metric</b> - summary metric for a particular set of measurements (e.g. Water_Management, GHG_Emissions)</p>
                            <p><b>Model</b> - the SASB categorisation of selected metric. Determines which categories will contribute to the metric (e.g. GHG_Emissions_Model)</p>
                            <p><b>Category</b> - specific, measured values that make up the fundamental datapoints of this dataset (e.g. Targets_Emissions)</p>
                            {/* <div className="esg-selection">
                                <button>Environment</button>
                                <button>Social</button>
                                <button>Governance</button>
                            </div>
                            <div className="ro-selection">
                                <button>Risk</button>
                                <button>Opportunity</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Exploration;