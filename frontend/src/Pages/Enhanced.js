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

        // fetch('http://localhost:3902/plot/dummy')
        //     .then(response => response.json())
        //     .then(data => setGraphData(data))
        //     .catch(error => console.error('Error hitting /plot/dummy endpoint:', error));
    }, []);
  
    return (
        <div className="App">
            <AppHeader />
            <div className='Body'>
                <AppNavigator />
                <div className="content">
                    <div>
                        <h1>Ontology Enhanced Principle Component Analysis</h1>
                        <p>Get advanced insights from our enhanced PCA analysis</p>
                        <PlotlyChart />
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