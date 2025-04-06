import '../Css/Report.css';
import React, { useState, useEffect } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';

function Report() {
    // Step 1: Initialize the state with an empty value (initially)
    const [dropdownValue1, setDropdownValue1] = useState('');
    const [isERContent2Visible, setIsERContent2Visible] = useState(false); // Updated variable name
    const [modelType1, setModelType1] = useState('');
    const [isERContent3Visible, setIsERContent3Visible] = useState(false);
    const [isERContent4Visible, setIsERContent4Visible] = useState(false);

    // Step 2: Use useEffect to load dropdownValue from localStorage
    useEffect(() => {
        // Fetch the saved dropdown value from localStorage (if any)
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
    }, []); // Empty dependency array ensures this runs once when the component mounts

    // Step 3: Handle dropdown change and save to localStorage
    const handleDropdownChange1 = (event) => {
        const selectedValue = event.target.value;
        setDropdownValue1(selectedValue); // Update the state with the new value

        // Save the selected value to localStorage for persistence
        localStorage.setItem('dropdownValue1', selectedValue);

        // Update visibility of div2 based on the selected value
        //if (selectedValue === 'GHG Emissions' || selectedValue === 'Water Management') {
        //setIsERContent2Visible(selectedValue === 'GHG Emissions' || selectedValue === 'Water Management');
        if (selectedValue === 'GHG Emissions' || selectedValue === 'Water Management') {
            setIsERContent2Visible(true);  // Show ERContent2 when valid selection is made
        } else {
            setIsERContent2Visible(false); // Hide ERContent2 when invalid selection or no selection
        }        
        setModelType1(''); // Reset the model selection
        localStorage.removeItem('modelType1');
        setIsERContent3Visible(false); // Hide div3 (PCA Model)
        setIsERContent4Visible(false);
        //    setIsERContent2Visible(true);
        //} else {
        //    setIsERContent2Visible(false);
        //}
    };

    // Step 3: Handle model selection for Metric 1 (PCA/ Ontology)
    const handleModelSelection1 = (event) => {
        const selectedModel = event.target.value;
        setModelType1(selectedModel);
        localStorage.setItem('modelType1', selectedModel);

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
                            <div class="ERContent1">
                                <select id="dropdown" value={dropdownValue1} onChange={handleDropdownChange1}>
                                    <option value="">Select a Metric</option>
                                    <option value="GHG Emissions">GHG Emissions</option>
                                    <option value="Water Management">Water Management</option>
                                </select>
                            </div>
                            {isERContent2Visible && (
                                <div className='ERContent2'>
                                    <select id="modelSelection1" value={modelType1} onChange={handleModelSelection1}>
                                        <option value="">Select Model</option>
                                        <option value="PCA Model">PCA Model</option>
                                        <option value="Ontology Model">Ontology Model</option>
                                    </select>
                                </div>
                            )}

                            {/* Conditionally render div3 or div4 based on model selection for Metric 1 */}
                            {isERContent3Visible && (
                                <div className='ERContent3'>
                                    <p>This is Div 3 - PCA Model for Metric 1.</p>
                                </div>
                            )}
                            {isERContent4Visible && (
                                <div className='ERContent4'>
                                    <p>This is Div 4 - Ontology Model for Metric 1.</p>
                                </div>
                            )}
                            </div>
                        </div>
                    <div className='metric2'>
                        <p className='metricTitle'>Social Risk</p>
                        <div className='SRContent'>SRContent</div>
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
                        <p className='metricTitle'>SO</p>
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