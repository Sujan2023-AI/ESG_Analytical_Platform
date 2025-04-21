import '../Css/PCA.css';
import React from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';
import TraditionalChart from './Components/TraditionalChart';
import TraditionalTable1 from './Components/TraditionalTable1';
import PlotlyTable from './Components/PlotlyTable'; //TODO: DELETE THIS!!!

function PCA() {
    let UserData = JSON.parse(localStorage.getItem('userData'));
    let industry = UserData.industry;

    let year = parseInt(localStorage.getItem("reportingYear"));

    return (
        <div className="App">
            <AppHeader />
            <div className='Body'>
                <AppNavigator />
                <div className="content">
                    <div className="pcaContent">
                        <h1>Principle Component Analysis</h1>
                        <h2>PCA</h2>
                        <p>Dive into our initial analysis model</p>
                        <TraditionalChart industry={industry} year={year} />
                        <TraditionalTable1 industry={industry} year={year} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PCA;