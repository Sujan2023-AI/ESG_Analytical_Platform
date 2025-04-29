// PCA Analysis page

import '../Css/PCA.css';
import React from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';
import PlotlyChart from './Components/PlotlyChart';
import PlotlyTable from './Components/PlotlyTable';

function PCA() {
    // Get user data
    let UserData = JSON.parse(localStorage.getItem('userData'));
    let industry = UserData.industry;
    let year = parseInt(localStorage.getItem("reportingYear"));

    return (
        <div className="App">
            <AppHeader />
            <div className='Body'>
                <AppNavigator />
                <div className='Main'>
                    <div className='Content'>
                        <div className="pca-results">
                            <h1>Traditional Principle Component Analysis</h1>
                            <p>Here you can see basic results from our initial analysis model</p>
                            <h2>PCA Screeplot</h2>
                            <p>See screeplot below</p>
                            <PlotlyChart dataUrl={`http://localhost:3902/traditional/scree/${industry}/${year}`} />
                            <h2>Top ESG Categories</h2>
                            <p>See categories below</p>
                            <h3>For PC1</h3>
                            <PlotlyTable dataUrl={`http://localhost:3902/traditional/table/pc1/${industry}/${year}`} />
                            <h3>For PC2</h3>
                            <PlotlyTable dataUrl={`http://localhost:3902/traditional/table/pc2/${industry}/${year}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PCA;