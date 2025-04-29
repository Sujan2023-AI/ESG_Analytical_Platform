/* ESG Report page */

import '../Css/EsgReport.css';
import React, { useState, useEffect } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';
import ReportCategorySection from './Components/ReportCategorySection';

function EsgReport() {

    // States for calculated results component (can be seen at the bottom of the page)
    const [calculatedRows, setCalculatedRows] = useState([]);

    // States for environment risk
    const [erSubcategories, setErSubcategories] = useState([]);
    const [selectedErSubcategory, setSelectedErSubcategory] = useState('');
    const [erModels, setErModels] = useState([]);
    const [erModelType, setErModelType] = useState('');
    const [erMetrics, setErMetrics] = useState([]);

    // States for social risk
    const [srSubcategories, setSrSubcategories] = useState([]);
    const [selectedSrSubcategory, setSelectedSrSubcategory] = useState('');
    const [srModels, setSrModels] = useState([]);
    const [srModelType, setSrModelType] = useState('');
    const [srMetrics, setSrMetrics] = useState([]);

    // States for governance risk
    const [grSubcategories, setGrSubcategories] = useState([]);
    const [selectedGrSubcategory, setSelectedGrSubcategory] = useState('');
    const [grModels, setGrModels] = useState([]);
    const [grModelType, setGrModelType] = useState('');
    const [grMetrics, setGrMetrics] = useState([]);

    // States for environment opportunity
    const [eoSubcategories, setEoSubcategories] = useState([]);
    const [selectedEoSubcategory, setSelectedEoSubcategory] = useState('');
    const [eoModels, setEoModels] = useState([]);
    const [eoModelType, setEoModelType] = useState('');
    const [eoMetrics, setEoMetrics] = useState([]);

    // States for social opportunity
    const [soSubcategories, setSoSubcategories] = useState([]);
    const [selectedSoSubcategory, setSelectedSoSubcategory] = useState('');
    const [soModels, setSoModels] = useState([]);
    const [soModelType, setSoModelType] = useState('');
    const [soMetrics, setSoMetrics] = useState([]);

    // States for governance opportunity
    const [goSubcategories, setGoSubcategories] = useState([]);
    const [selectedGoSubcategory, setSelectedGoSubcategory] = useState('');
    const [goModels, setGoModels] = useState([]);
    const [goModelType, setGoModelType] = useState('');
    const [goMetrics, setGoMetrics] = useState([]);

    // Reload page when data is added to calculated results component
    useEffect(() => {
        const savedRows = JSON.parse(localStorage.getItem('calculatedRows')) || [];
        setCalculatedRows(savedRows);
    }, []);

    // Handler for when calculate button at of each pillar box is clicked
    const handleCalculate = (subcategory, model, metrics, mean) => {
        const newRow = {subcategory, model,metrics, mean};

        // Check if this row already exists (to prevent duplicates)
        const isDuplicate = calculatedRows.some(
            (row) => row.subcategory === subcategory && row.model === model && JSON.stringify(row.metrics) === JSON.stringify(metrics)
        );

        // Don't add duplicate records
        if (isDuplicate) {
            alert('Record already exists');
        } else {
            // Add new record
            const updatedRows = [...calculatedRows, newRow];
            setCalculatedRows(updatedRows);
            localStorage.setItem('calculatedRows', JSON.stringify(updatedRows));
        }
    };
    
    // Load initial options for each pillar's metric dropdown list
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        let industry = userData.industry;
        let company = userData.company;
        let year = parseInt(localStorage.getItem("reportingYear"));

        fetch(`http://localhost:3902/metrics/${industry}/${company}/${year}/E_risk`)
            .then(response => response.json())
            .then(data => setErSubcategories(data))
            .catch(error => console.error('Error fetching metrics from api:', error));
        
        fetch(`http://localhost:3902/metrics/${industry}/${company}/${year}/S_risk`)
            .then(response => response.json())
            .then(data => setSrSubcategories(data))
            .catch(error => console.error('Error fetching social risk sub categories:', error));
        
        fetch(`http://localhost:3902/metrics/${industry}/${company}/${year}/G_risk`)
            .then(response => response.json())
            .then(data => setGrSubcategories(data))
            .catch(error => console.error('Error fetching governance risk sub categories:', error));
        
        fetch(`http://localhost:3902/metrics/${industry}/${company}/${year}/E_opportunity`)
            .then(response => response.json())
            .then(data => setEoSubcategories(data))
            .catch(error => console.error('Error fetching environment opportunity sub categories:', error));
        
        fetch(`http://localhost:3902/metrics/${industry}/${company}/${year}/S_opportunity`)
            .then(response => response.json())
            .then(data => setSoSubcategories(data))
            .catch(error => console.error('Error fetching risk opportunity sub categories:', error));
        
        fetch(`http://localhost:3902/metrics/${industry}/${company}/${year}/G_opportunity`)
            .then(response => response.json())
            .then(data => setGoSubcategories(data))
            .catch(error => console.error('Error fetching governance opportunity sub categories:', error));
    }, []);

    return (
        <div className="App">
            <AppHeader />
            <div className='Body'>
                <AppNavigator />
                <div className='Main'>
                    <div className='report-selection'>
                        {/* metric selection component at the top of the page */}
                        <div className="mainMetrics">
                            <div className='metricRow1'>
                                <ReportCategorySection
                                    category={'Environment Risk'}
                                    categoryCode={'E_risk'}
                                    categoryShortCode={'Er'}
                                    subcategories={erSubcategories}
                                    selectedSubcategory={selectedErSubcategory}
                                    setSelectedSubcategory={setSelectedErSubcategory}
                                    models={erModels}
                                    setModels={setErModels}
                                    modelType={erModelType}
                                    setModelType={setErModelType}
                                    metrics={erMetrics}
                                    setMetrics={setErMetrics}
                                    onCalculate={handleCalculate}
                                />
                                <ReportCategorySection
                                    category={'Social Risk'}
                                    categoryCode={'S_risk'}
                                    categoryShortCode={'Sr'}
                                    subcategories={srSubcategories}
                                    selectedSubcategory={selectedSrSubcategory}
                                    setSelectedSubcategory={setSelectedSrSubcategory}
                                    models={srModels}
                                    setModels={setSrModels}
                                    modelType={srModelType}
                                    setModelType={setSrModelType}
                                    metrics={srMetrics}
                                    setMetrics={setSrMetrics}
                                    onCalculate={handleCalculate}
                                />
                                <ReportCategorySection
                                    category={'Governance Risk'}
                                    categoryCode={'G_risk'}
                                    categoryShortCode={'Gr'}
                                    subcategories={grSubcategories}
                                    selectedSubcategory={selectedGrSubcategory}
                                    setSelectedSubcategory={setSelectedGrSubcategory}
                                    models={grModels}
                                    setModels={setGrModels}
                                    modelType={grModelType}
                                    setModelType={setGrModelType}
                                    metrics={grMetrics}
                                    setMetrics={setGrMetrics}
                                    onCalculate={handleCalculate}
                                />
                            </div>
                            <div className='metricRow2'>
                                <ReportCategorySection
                                    category={'Environment Opportunity'}
                                    categoryCode={'E_opportunity'}
                                    categoryShortCode={'Eo'}
                                    subcategories={eoSubcategories}
                                    selectedSubcategory={selectedEoSubcategory}
                                    setSelectedSubcategory={setSelectedEoSubcategory}
                                    models={eoModels}
                                    setModels={setEoModels}
                                    modelType={eoModelType}
                                    setModelType={setEoModelType}
                                    metrics={eoMetrics}
                                    setMetrics={setEoMetrics}
                                    onCalculate={handleCalculate}
                                />
                                <ReportCategorySection
                                    category={'Social Opportunity'}
                                    categoryCode={'S_opportunity'}
                                    categoryShortCode={'So'}
                                    subcategories={soSubcategories}
                                    selectedSubcategory={selectedSoSubcategory}
                                    setSelectedSubcategory={setSelectedSoSubcategory}
                                    models={soModels}
                                    setModels={setSoModels}
                                    modelType={soModelType}
                                    setModelType={setSoModelType}
                                    metrics={soMetrics}
                                    setMetrics={setSoMetrics}
                                    onCalculate={handleCalculate}
                                />
                                <ReportCategorySection
                                    category={'Governance Opportunity'}
                                    categoryCode={'G_opportunity'}
                                    categoryShortCode={'Go'}
                                    subcategories={goSubcategories}
                                    selectedSubcategory={selectedGoSubcategory}
                                    setSelectedSubcategory={setSelectedGoSubcategory}
                                    models={goModels}
                                    setModels={setGoModels}
                                    modelType={goModelType}
                                    setModelType={setGoModelType}
                                    metrics={goMetrics}
                                    setMetrics={setGoMetrics}
                                    onCalculate={handleCalculate}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='report-calculation'>
                        {/* calculated results component at the bottom of the page */}
                        <h3>Calculated Results</h3>
                        <div className="calculated-table" style={{  }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Subcategory</th>
                                        <th>Model</th>
                                        <th>Metrics</th>
                                        <th>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calculatedRows.map((row,index) => (
                                        <tr key={index}>
                                            <td>{row.subcategory}</td>
                                            <td>{row.model}</td>
                                            <td>{(row.metrics || []).join(', ')}</td>
                                            <td>{row.mean}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button>Save Data</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EsgReport;