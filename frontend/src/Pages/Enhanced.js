import '../Css/Enhanced.css';
import React from 'react';
import { useEffect, useState } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';
import PlotlyChart from './Components/PlotlyChart';

function Enhanced() {

    const [top5, setTop5] = useState([]);
    // const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3902/top_5')
            .then(response => response.json())
            .then(data => setTop5(data))
            .catch(error => console.error('Error hitting /top_5 endpoint:', error));
    }, []);
  
    return (
        <div className="App">
            <AppHeader />
            <div className='Body'>
                <AppNavigator />
                <div className="content">
                    <div>
                        <h1>Ontology Enhanced Principle Component Analysis</h1>
                        <p>Welcome to the insights from our enhanced PCA analysis</p>
                        <h2>PCA Screeplot</h2>
                        <p>
                        The scree plot visually represents how much variance in the dataset is explained by each principal component (PC) after performing PCA. The blue line shows the explained variance for each individual PC, indicating how much of the original data's variability that component captures. The orange line shows the cumulative variance, which adds up the contribution of PCs sequentially. A red dashed line marks a variance threshold (typically 70%), helping to identify how many components are needed to retain most of the data's information.
                        </p>
                        <PlotlyChart />
                        <h2>Top ESG Categories</h2>
                        <p>
                        This step presents the top ESG metric categories that have the strongest influence on the principal components identified through PCA. After analyzing the data, PCA highlights which features contribute most to the variance in ESG performance across companies. The system ranks these features based on their impact, and this output helps end users focus on the most significant sustainability areas—such as emissions, supply chain risks, or governance practices—that drive differences in company behavior. These top categories serve as a data-driven guide for prioritizing metrics in further analysis, reporting, or decision-making.
                        </p>
                        <div className="table-container">
                            <table className="my-table">
                                <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Percentage</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {top5.map((t) => (
                                        <tr key={t[0]}>
                                            <td>{t[0]}</td>
                                            <td>{t[1]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Enhanced;