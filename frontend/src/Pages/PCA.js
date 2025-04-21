import '../Css/PCA.css';
import React from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';

function PCA() {
    return (
        <div className="App">
            <AppHeader />
            <div className='Body'>
                <AppNavigator />
                <div className="content">
                    <div className="pcaContent">
                        <h1>Principle Component Analysis</h1>
                        <p>Dive into our initial analysis model</p>
                        <img src="/pcaExample.png" alt="dummy example pca" height={210} width={370} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PCA;