/* Ontology Enhanced PCA page */

import '../Css/PCA.css';
import React from 'react';
import { useState } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';
import PlotlyChart from './Components/PlotlyChart';
import PlotlyTable from './Components/PlotlyTable';

function Enhanced() {

    // Get user data and selections
    let UserData = JSON.parse(localStorage.getItem('userData'));
    let industry = UserData.industry;
    let company = UserData.company;
    let year = parseInt(localStorage.getItem("reportingYear"));

    // States and handlers for pillar selection dropdown
    const [pillar, setPillar] = useState('');
    const pillars = ['E_risk', 'G_risk', 'S_risk', 'E_opportunity', 'G_opportunity', 'S_opportunity'];
    const handlePillarSelection = (event) => {
        let newPillar = event.target.value;
        setPillar(newPillar);
        setMetric('');
        setModel('');
        fetch(`http://localhost:3902/metrics/${industry}/${company}/${year}/${newPillar}`)
            .then(response => response.json())
            .then(data => {setMetrics(data); console.log("Retrieved metrics =", data);})
            .catch(error => console.error('Error hitting /top_5 endpoint:', error));
    };

    // States and handlers for metric selection dropdown
    const [metric, setMetric] = useState('');
    const [metrics, setMetrics] = useState([]);
    const handleMetricSelection = (event) => {
        let newMetric = event.target.value;
        setMetric(newMetric);
        setModel('');
        fetch(`http://localhost:3902/models/${industry}/${company}/${year}/${pillar}/${newMetric}`)
            .then(response => response.json())
            .then(data => {setModels(data); console.log("Retrieved models =", data);})
            .catch(error => console.error('Error hitting /top_5 endpoint:', error));
    };

    // States and handlers for modal selection dropdown
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]);
    const handleModelSelection = (event) => {
        let newModel = event.target.value;
        setModel(newModel);

        // Query top 5 loading values for a report save
        fetch(`http://localhost:3902/ontology/table/${industry}/${year}/${pillar}/${newModel}/${metric}`)
            .then((res) => res.json())
            .then((json) => {
                const parsed = typeof json === "string" ? JSON.parse(json) : json;
                setReportData(parsed);
            });
    }    
    
    // Save current information to report snapshot
    const [reportData, setReportData] = useState();
    const handleSaveReport = () => {
        const report = {
            name: "Ontology Enhanced PCA Analysis Report",
            timestamp: new Date().toLocaleString(),
            data: reportData,
            pillar,
            metric,
            model,
        };

        // Save this report in localStorage
        let savedReports = JSON.parse(localStorage.getItem('savedReports')) || [];
        savedReports.push(report);
        localStorage.setItem('savedReports', JSON.stringify(savedReports));

        // Alert user that the report has been saved
        alert('Report saved successfully!');
    };
    
    return (
        <div className="App">
            <AppHeader />
            <div className='Body'>
                <AppNavigator />
                <div className='Main'>
                    <div className="Content">
                        <div className="pca-results">
                            <h1>Ontology Enhanced Principle Component Analysis</h1>
                            <p>Welcome to the insights from our enhanced PCA analysis. Please select the data you would like to see below.</p>
                            <div className="selectionOptions">
                                <p>Data Selection:</p>
                                <select id="pillarSelection" value={pillar} onChange={handlePillarSelection}>
                                    <option value=''>Select Pillar</option>
                                    {pillars.map((m) => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                                {(pillar !== '') && (
                                    <select id="metricSelection" value={metric} onChange={handleMetricSelection}>
                                        <option value=''>Select Metric</option>
                                        {metrics.map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                )}
                                {(metric !== '') && (
                                    <select id="modelSelection" value={model} onChange={handleModelSelection}>
                                        <option value=''>Select Model</option>
                                        {models.map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            {(model !== '') && (
                                <> 
                                <h2>PCA Screeplot</h2>
                                <p>
                                The scree plot visually represents how much variance in the dataset is explained by each principal component (PC) after performing PCA. The blue line shows the explained variance for each individual PC, indicating how much of the original data's variability that component captures. The orange line shows the cumulative variance, which adds up the contribution of PCs sequentially. A red dashed line marks a variance threshold (typically 70%), helping to identify how many components are needed to retain most of the data's information.
                                </p>
                                <PlotlyChart dataUrl={`http://localhost:3902/ontology/scree/${industry}/${year}/${pillar}/${model}/${metric}`}/>
                                <h2>Top ESG Categories</h2>
                                <p>
                                This step presents the top ESG metric categories that have the strongest influence on the principal components identified through PCA. After analyzing the data, PCA highlights which features contribute most to the variance in ESG performance across companies. The system ranks these features based on their impact, and this output helps end users focus on the most significant sustainability areas—such as emissions, supply chain risks, or governance practices—that drive differences in company behavior. These top categories serve as a data-driven guide for prioritizing metrics in further analysis, reporting, or decision-making.
                                </p>
                                <PlotlyTable dataUrl={`http://localhost:3902/ontology/table/${industry}/${year}/${pillar}/${model}/${metric}`} />
                                <button onClick={handleSaveReport}>Save Report</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Enhanced;