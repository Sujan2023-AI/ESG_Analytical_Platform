import '../Css/Report.css';
import React, { useState, useEffect } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';

function DummyModelOptions({modelType, handleChange}) {
    return (
        <select id="modelSelection1" value={modelType} onChange={handleChange}>
            <option value="">Select Model</option>
            <option value="PCA Model">PCA Model</option>
            <option value="Ontology Model">Ontology Model</option>
        </select>
    );
}

function Report() {
    // Step 1: Initialize the state with an empty value (initially)
    const [dropdownValue1, setDropdownValue1] = useState('');
    const [isERContent2Visible, setIsERContent2Visible] = useState(false); // Updated variable name
    const [modelType1, setModelType1] = useState('');
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

    const [erCategories, setErCategories] = useState([]);
    const [erMetrics, setErMetrics] = useState([]);
    const [srCategories, setSrCategories] = useState([]);
    const [srMetrics, setSrMetrics] = useState([]);

    // Step 2: Use useEffect to load dropdownValue from localStorage
    useEffect(() => {
        fetch('http://localhost:3902/data/E_risk')
          .then(response => response.json())
          .then(data => setErCategories(data))
          .catch(error => console.error('Error fetching groups:', error));
        
        fetch('http://localhost:3902/data/S_risk')
          .then(response => response.json())
          .then(data => setSrCategories(data))
          .catch(error => console.error('Error fetching groups:', error));

        // Fetch the saved dropdown value from localStorage for ER(if any)
        const savedValue1 = localStorage.getItem('dropdownValue1');
        const savedModel1 = localStorage.getItem('modelType1');
  
        // If a saved value exists, update the state
        if (savedValue1) {
            setDropdownValue1(savedValue1); // Set dropdownValue to the saved value
            if (savedValue1 === 'GHG Emissions' || savedValue1 === 'Water Management') {
                setIsERContent2Visible(true); // If 'show' is selected, make div2 visible
            }
        }
        if (savedModel1) {
            setModelType1(savedModel1); // Retain the model selection from localStorage
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

    // when user selects a subcategory for environmental risk
    const handleErDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setDropdownValue1(selectedValue); // Update the state with the new value
        // Save the selected value to localStorage for persistence
        localStorage.setItem('dropdownValue1', selectedValue);
        if (selectedValue !== 'Select a Metric') {
            setIsERContent2Visible(true);  // Show ERContent2 when valid selection is made
        } else {
            setIsERContent2Visible(false); // Hide ERContent2 when invalid selection or no selection
        }        
        setModelType1(''); // Reset the model selection
        localStorage.removeItem('modelType1');
        setIsERContent3Visible(false); // Hide div3 (PCA Model)
        setIsERContent4Visible(false);


    };

    // When the user selects a model for Environment Risk section
    const handleErModelSelection = (event) => {
        const selectedModel = event.target.value;
        console.log('model selected');
        console.log(selectedModel);

        // local storage call
        setModelType1(selectedModel);
        localStorage.setItem('modelType1', selectedModel);

        // priya thing
        if (selectedModel === 'PCA Model') {
            setIsERContent3Visible(true);
            setIsERContent4Visible(false);
        } else if (selectedModel === 'Ontology Model') {
            setIsERContent4Visible(true);
            setIsERContent3Visible(false);
        } else {
            setIsERContent3Visible(false);
            setIsERContent4Visible(false);
        }
 
        // query metric list for selection
        console.log("ER - DELETE (subcategory) =", dropdownValue1)
        console.log("ER - Selected Model =", selectedModel)
        fetch(`http://localhost:3902/data/E_risk/${dropdownValue1}/metrics`)
          .then(response => response.json())
          .then(data => {setErMetrics(data); console.log(data);})
          .catch(error => console.error('Error fetching groups:', error));
    };

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
                    <div className='metric1'>
                        <p className='metricTitle'>Environmental Risk</p>
                        <div className='ERContent'>
                            <div className="ERContent1">
                                <select id="dropdown" value={dropdownValue1} onChange={handleErDropdownChange}>
                                    <option key='default' value='Select a Metric'>Select a Metric</option>
                                    {erCategories.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            {isERContent2Visible && (
                                <div className='ERContent2'>
                                    <DummyModelOptions modelType={modelType1} handleChange={handleErModelSelection} />
                                </div>
                            )}

                            {/* Conditionally render erMetrics based on model selection for er */}
                            {isERContent3Visible && (
                                <div className='ERContent3'>
                                    {renderCheckboxes(erMetrics)}
                                    <button onClick={() => console.log('Calculating has not been implemented...')}>Calculate</button>
                                </div>
                            )}
                            </div>
                        </div>
                    <div className='metric2'>
                        <p className='metricTitle'>Social Risk</p>
                        <div className='SRContent'>
                            <div className="SRContent1">
                                <select id="dropdown" value={dropdownValue2} onChange={handleDropdownChange2}>
                                    <option key='default' value='Select a Metric'>Select a Metric</option>
                                    {srCategories.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            {isSRContent2Visible && (
                                <div className='SRContent2'>
                                    <select id="modelSelection2" value={modelType2} onChange={handleModelSelection2}>
                                        <option value="">Select Model</option>
                                        <option value="PCA Model">PCA Model</option>
                                        <option value="Ontology Model">Ontology Model</option>
                                    </select>
                                </div>
                            )}

                            {/* Conditionally render div3 or div4 based on model selection for Metric 1 */}
                            {isSRContent3Visible && (
                                <div className='SRContent3'>
                                    {renderCheckboxes(3)}
                                    <button onClick={() => console.log('Calculating...')}>Calculate</button>
                                </div>
                            )}
                            {isSRContent4Visible && (
                                <div className='SRContent4'>
                                    {renderCheckboxes(4)}
                                    <button onClick={() => console.log('Calculating...')}>Calculate</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='metric3'>
                        <p className='metricTitle'>Governance Risk</p>
                        <div className='GRContent'>GRContent</div>
                    </div>
                </div>
                <div className='metricRow2'>
                    <div className='metric4'>
                        <p className='metricTitle'>EO</p>
                        <div className='EOContent'>EOContent</div>
                    </div>
                    <div className='metric5'>
                        <p className='metricTitle'>Social Oppurtunity</p>
                        <div className='SOContent'>SOContent</div>
                    </div>
                    <div className='metric6'>
                        <p className='metricTitle'>GO</p>
                        <div className='GOContent'>GOContent</div>
                    </div>
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