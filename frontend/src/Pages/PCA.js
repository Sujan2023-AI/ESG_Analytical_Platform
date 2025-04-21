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
                        <h1>Traditional Principle Component Analysis</h1>
                        <p>Here you can see basic results from our initial analysis model</p>
                        <h2>PCA Screeplot</h2>
                        <p>See screeplot below</p>
                        <TraditionalChart industry={industry} year={year} />
                        <h2>Top ESG Categories</h2>
                        <p>See categories below</p>
                        <h3>For PC1</h3>
                        <TraditionalTable1 industry={industry} year={year} />
                        <h3>For PC2</h3>
                        <TraditionalTable1 industry={industry} year={year} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PCA;