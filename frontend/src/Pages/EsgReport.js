import '../Css/Report.css';
import React, { useState, useEffect } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';
import ReportCategorySection from './Components/ReportCategorySection';

function EsgReport() {

    // states for environment risk
    const [erSubcategories, setErSubcategories] = useState([]);
    const [selectedErSubcategory, setSelectedErSubcategory] = useState('');
    const [erModels, setErModels] = useState([]);
    const [erModelType, setErModelType] = useState('');
    const [erMetrics, setErMetrics] = useState([]);

    // states for social risk
    const [srSubcategories, setSrSubcategories] = useState([]);
    const [selectedSrSubcategory, setSelectedSrSubcategory] = useState('');
    const [srModels, setSrModels] = useState([]);
    const [srModelType, setSrModelType] = useState('');
    const [srMetrics, setSrMetrics] = useState([]);

    // states for governance risk
    const [grSubcategories, setGrSubcategories] = useState([]);
    const [selectedGrSubcategory, setSelectedGrSubcategory] = useState('');
    const [grModels, setGrModels] = useState([]);
    const [grModelType, setGrModelType] = useState('');
    const [grMetrics, setGrMetrics] = useState([]);

    // states for environment opportunity
    const [eoSubcategories, setEoSubcategories] = useState([]);
    const [selectedEoSubcategory, setSelectedEoSubcategory] = useState('');
    const [eoModels, setEoModels] = useState([]);
    const [eoModelType, setEoModelType] = useState('');
    const [eoMetrics, setEoMetrics] = useState([]);

    // states for social opportunity
    const [soSubcategories, setSoSubcategories] = useState([]);
    const [selectedSoSubcategory, setSelectedSoSubcategory] = useState('');
    const [soModels, setSoModels] = useState([]);
    const [soModelType, setSoModelType] = useState('');
    const [soMetrics, setSoMetrics] = useState([]);

    // states for governance opportunity
    const [goSubcategories, setGoSubcategories] = useState([]);
    const [selectedGoSubcategory, setSelectedGoSubcategory] = useState('');
    const [goModels, setGoModels] = useState([]);
    const [goModelType, setGoModelType] = useState('');
    const [goMetrics, setGoMetrics] = useState([]);
    
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
                <div className="content">
                <div className='allContent'>
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
                            />
                        </div>
                    </div>
                    </div>
                    <div className='calculatedPanel'>
                        <p>(Summed calculations will be shown here in the future)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EsgReport;