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

    // Step 2: Use useEffect to load dropdownValue from localStorage
    useEffect(() => {

        fetch('http://localhost:3902/data/E_risk')
            .then(response => response.json())
            .then(data => setErSubcategories(data))
            .catch(error => console.error('Error fetching environment risk sub categories:', error));

        fetch('http://localhost:3902/data/S_risk')
            .then(response => response.json())
            .then(data => setSrSubcategories(data))
            .catch(error => console.error('Error fetching social risk sub categories:', error));

        fetch('http://localhost:3902/data/G_risk')
            .then(response => response.json())
            .then(data => setGrSubcategories(data))
            .catch(error => console.error('Error fetching governance risk sub categories:', error));

        fetch('http://localhost:3902/data/E_opportunity')
            .then(response => response.json())
            .then(data => setEoSubcategories(data))
            .catch(error => console.error('Error fetching environment opportunity sub categories:', error));

        fetch('http://localhost:3902/data/S_opportunity')
            .then(response => response.json())
            .then(data => setSoSubcategories(data))
            .catch(error => console.error('Error fetching risk opportunity sub categories:', error));

        fetch('http://localhost:3902/data/G_opportunity')
            .then(response => response.json())
            .then(data => setGoSubcategories(data))
            .catch(error => console.error('Error fetching governance opportunity sub categories:', error));

        // Fetch the saved dropdown value from localStorage for ER(if any)
        // const savedValue1 = localStorage.getItem('erSubcategory');
        // const savedModel1 = localStorage.getItem('erModelType');
    }, []);

    /* PRIYA OLD METHOD */ /*
        // Step 3: Handle dropdown change and save to localStorage
        const handleDropdownChange2 = (event) => {
            const selectedValue = event.target.value;
            setDropdownValue2(selectedValue); // Update the state with the new value
            // Save the selected value to localStorage for persistence
            localStorage.setItem('dropdownValue2', selectedValue);
            if (selectedValue === 'SocialRisk Metric1' || selectedValue === 'SocialRisk Metric2') {
                setIsSRContent2Visible(true);  // Show ERContent2 when valid selection is made
            } else {
                setIsSRContent2Visible(false); // Hide ERContent2 when invalid selection or no selection
            }        
            setModelType2(''); // Reset the model selection
            localStorage.removeItem('modelType2');
            setIsSRContent3Visible(false); // Hide div3 (PCA Model)
            setIsSRContent4Visible(false);
        };
    
        // Step 3: Handle model selection for Metric 1 (PCA/ Ontology)
        const handleModelSelection2 = (event) => {
            const selectedModel = event.target.value;
            setModelType2(selectedModel);
            localStorage.setItem('modelType2', selectedModel);
    
            if (selectedModel === 'PCA Model') {
                setIsSRContent3Visible(true);
                setIsSRContent4Visible(false);
            } else if (selectedModel === 'Ontology Model') {
                setIsSRContent4Visible(true);
                setIsSRContent3Visible(false);
            } else {
                setIsSRContent3Visible(false);
                setIsSRContent4Visible(false);
            }
        }; */

    /* PRIYA CHECKBOX CODE */ /*
    const handleCheckboxChangeERPCA = (event) => {
        const { value, checked } = event.target;
        setSelectedCheckboxesERPCA((prevSelected) => {
          const newSelected = checked ? [...prevSelected, value] : prevSelected.filter((item) => item !== value);
          localStorage.setItem('selectedCheckboxesERPCA', JSON.stringify(newSelected));
          return newSelected;
        });
    };
    
    // Step 5: Handle checkbox change for div4
    const handleCheckboxChangeEROntology = (event) => {
    const { value, checked } = event.target;
    setSelectedCheckboxesEROntology((prevSelected) => {
        const newSelected = checked ? [...prevSelected, value] : prevSelected.filter((item) => item !== value);
        localStorage.setItem('selectedCheckboxesEROntology', JSON.stringify(newSelected));
        return newSelected;
    });
    }; */

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