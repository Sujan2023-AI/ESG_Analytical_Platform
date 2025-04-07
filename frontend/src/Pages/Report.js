import '../Css/Report.css';
import React, { useState, useEffect } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';
import ReportCategorySection from './Components/ReportCategorySection';

function Report() {

    // states for environment risk
    const [erSubcategories, setErSubcategories] = useState([]);
    const [selectedErSubcategory, setSelectedErSubcategory] = useState('');
    const [erModelType, setErModelType] = useState('');
    const [erMetrics, setErMetrics] = useState([]);

    // states for social risk
    const [srSubcategories, setSrSubcategories] = useState([]);
    const [selectedSrSubcategory, setSelectedSrSubcategory] = useState('');
    const [srModelType, setSrModelType] = useState('');
    const [srMetrics, setSrMetrics] = useState([]);

    // states for governance risk
    const [grSubcategories, setGrSubcategories] = useState([]);
    const [selectedGrSubcategory, setSelectedGrSubcategory] = useState('');
    const [grModelType, setGrModelType] = useState('');
    const [grMetrics, setGrMetrics] = useState([]);

    // states for environment opportunity
    const [eoSubcategories, setEoSubcategories] = useState([]);
    const [selectedEoSubcategory, setSelectedEoSubcategory] = useState('');
    const [eoModelType, setEoModelType] = useState('');
    const [eoMetrics, setEoMetrics] = useState([]);

    // states for social opportunity
    const [soSubcategories, setSoSubcategories] = useState([]);
    const [selectedSoSubcategory, setSelectedSoSubcategory] = useState('');
    const [soModelType, setSoModelType] = useState('');
    const [soMetrics, setSoMetrics] = useState([]);

    // states for governance opportunity
    const [goSubcategories, setGoSubcategories] = useState([]);
    const [selectedGoSubcategory, setSelectedGoSubcategory] = useState('');
    const [goModelType, setGoModelType] = useState('');
    const [goMetrics, setGoMetrics] = useState([]);




    const [isERContent2Visible, setIsERContent2Visible] = useState(false); // Updated variable name
    const [isERContent3Visible, setIsERContent3Visible] = useState(false);
    const [isERContent4Visible, setIsERContent4Visible] = useState(false);
    // States for checkboxes
    const [selectedCheckboxesERPCA, setSelectedCheckboxesERPCA] = useState([]);
    const [selectedCheckboxesEROntology, setSelectedCheckboxesEROntology] = useState([]);
    // User-defined options for checkboxes
    const optionsForDivERPCA = ['Scope Emission 1', 'Scope Emission 2', 'Scope Emission 3'];
    const optionsForDivEROntology = ['Water 1', 'Water Discharge'];

    // States for Metric 2 (Social Risk)
    const [dropdownValue2, setDropdownValue2] = useState('');
    const [isSRContent2Visible, setIsSRContent2Visible] = useState(false); // SRContent2 visibility state
    const [modelType2, setModelType2] = useState(''); // Default model type for Metric 2
    const [isSRContent3Visible, setIsSRContent3Visible] = useState(false);
    const [isSRContent4Visible, setIsSRContent4Visible] = useState(false);

    

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
        const savedValue1 = localStorage.getItem('erSubcategory');
        const savedModel1 = localStorage.getItem('erModelType');
  
        // If a saved value exists, update the state
        if (savedValue1) {
            setSelectedErSubcategory(savedValue1); // Set dropdownValue to the saved value
            if (savedValue1 === 'GHG Emissions' || savedValue1 === 'Water Management') {
                setIsERContent2Visible(true); // If 'show' is selected, make div2 visible
            }
        }
        if (savedModel1) {
            setErModelType(savedModel1); // Retain the model selection from localStorage
            if (savedModel1 === 'PCA Model') {
                setIsERContent3Visible(true);
                setIsERContent4Visible(false);
            } else if (savedModel1 === 'Ontology Model') {
                setIsERContent4Visible(true);
                setIsERContent3Visible(false);
            }
        }

        const savedCheckboxesERPCA = JSON.parse(localStorage.getItem('selectedCheckboxesERPCA')) || [];
        const savedCheckboxesEROntology = JSON.parse(localStorage.getItem('selectedCheckboxesEROntology')) || [];
    
        setSelectedCheckboxesERPCA(savedCheckboxesERPCA);
        setSelectedCheckboxesEROntology(savedCheckboxesEROntology);

        // Fetch the saved dropdown value from localStorage for SR(if any)
        const savedValue2 = localStorage.getItem('dropdownValue2');
        const savedModel2 = localStorage.getItem('modelType2');

        // If a saved value exists, update the state
        if (savedValue2) {
            setDropdownValue2(savedValue2); // Set dropdownValue to the saved value
            if (savedValue2 === 'GHG Emissions' || savedValue2 === 'Water Management') {
                setIsSRContent2Visible(true); // If 'show' is selected, make div2 visible
            }
        }
        if (savedModel2) {
            setModelType2(savedModel2); // Retain the model selection from localStorage
            if (savedModel2 === 'PCA Model') {
                setIsSRContent3Visible(true);
                setIsSRContent4Visible(false);
            } else if (savedModel2 === 'Ontology Model') {
                setIsSRContent4Visible(true);
                setIsSRContent3Visible(false);
            }
        }
        console.log('Loaded SRContent2 visibility:', isSRContent2Visible);
    }, []); // Empty dependency array ensures this runs once when the component mounts

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
    };
    
      // Step 6: Render the checkboxes and the "Calculate" button for each div
      const renderCheckboxes = (metrics) => {

        return metrics.map((sc) => (
            <div className='metric_checkbox' key={sc}>
                <input
                    type="checkbox"
                    value={sc}
                />
                <label style={{minWidth: '200px', maxWidth: '200px', textAlign: 'left'}}>{sc.toLowerCase()}</label>
                <label>1.23</label>
            </div>
        ));
        
        /*
        const checkboxes = divNumber === 3 ? ['Option 1', 'Option 2', 'Option 3'] : ['Option A', 'Option B', 'Option C'];
    
        return checkboxes.map((option, index) => (
          <div key={index}>
            <input
              type="checkbox"
              value={option}
              checked={divNumber === 3 ? selectedCheckboxesERPCA.includes(option) : selectedCheckboxesEROntology.includes(option)}
              onChange={divNumber === 3 ? handleCheckboxChangeERPCA : handleCheckboxChangeEROntology}
            />
            <label>{option}</label>
          </div>
        ));
        */
      };

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
                        setSubcategories={setErSubcategories}
                        selectedSubcategory={selectedErSubcategory}
                        setSelectedSubcategory={setSelectedErSubcategory}
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
                        setSubcategories={setSrSubcategories}
                        selectedSubcategory={selectedSrSubcategory}
                        setSelectedSubcategory={setSelectedSrSubcategory}
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
                        setSubcategories={setGrSubcategories}
                        selectedSubcategory={selectedGrSubcategory}
                        setSelectedSubcategory={setSelectedGrSubcategory}
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
                        setSubcategories={setEoSubcategories}
                        selectedSubcategory={selectedEoSubcategory}
                        setSelectedSubcategory={setSelectedEoSubcategory}
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
                        setSubcategories={setSoSubcategories}
                        selectedSubcategory={selectedSoSubcategory}
                        setSelectedSubcategory={setSelectedSoSubcategory}
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
                        setSubcategories={setGoSubcategories}
                        selectedSubcategory={selectedGoSubcategory}
                        setSelectedSubcategory={setSelectedGoSubcategory}
                        modelType={goModelType}
                        setModelType={setGoModelType}
                        metrics={goMetrics}
                        setMetrics={setGoMetrics}
                    />
                </div>
            </div>
            <div className='calculatedPanel'>
                <p>Calculation comes here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;