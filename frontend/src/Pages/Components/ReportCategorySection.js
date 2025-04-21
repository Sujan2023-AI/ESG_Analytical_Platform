import '../../Css/ReportCategorySection.css';
import React, { useState } from 'react';

function ReportCategorySection({
    category,
    categoryCode,
    categoryShortCode,
    subcategories,
    selectedSubcategory,
    setSelectedSubcategory,
    models,
    setModels,
    modelType,
    setModelType,
    metrics,
    setMetrics,
    onCalculate
}) {
    // Current user and selection
    const userData = JSON.parse(localStorage.getItem("userData"));
    let industry = userData.industry;
    let company = userData.company;
    let year = parseInt(localStorage.getItem("reportingYear"));
    const [selectedMetrics, setSelectedMetrics] = useState([]);

    // metric selector
    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;

        setSelectedSubcategory(selectedValue); // Update the state with the new value

        // Save the selected value to localStorage for persistence
        localStorage.setItem(categoryShortCode + 'Subcategory', selectedValue);
        setModelType(''); // Reset the model selection
        localStorage.removeItem(categoryShortCode + 'ModelType');

        // query metric list for selection
        fetch(`http://localhost:3902/models/${industry}/${company}/${year}/${categoryCode}/${selectedValue}`)
            .then(response => response.json())
            .then(data => setModels(data))
            .catch(error => console.error('Error fetching ' + category + ':', error));
    };

    // Model selected
    const handleModelSelection = (event) => {
        const selectedModel = event.target.value;

        // local storage call
        setModelType(selectedModel);
        localStorage.setItem(categoryShortCode + 'modelType', selectedModel);
 
        // query metric list for selection
        fetch(`http://localhost:3902/categories/${industry}/${company}/${year}/${categoryCode}/${selectedSubcategory}/${selectedModel}`)
            .then(response => response.json())
            .then(data => setMetrics(data))
            .catch(error => console.error('Error fetching ' + category + ':', error));
    };

    // Update selected metrics based on checkbox state
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedMetrics(prevSelectedMetrics => {
            if (prevSelectedMetrics.includes(value)) {
                return prevSelectedMetrics.filter(metric => metric !== value); // Deselect
            } else {
                return [...prevSelectedMetrics, value]; // Select
            }
        });
    };

    const handleCalculateClick = () => {
        // Gather selected metrics
        const selectedMetrics = Array.from(document.querySelectorAll(`input[name="${categoryShortCode}_metrics"]:checked`))
            .map(checkbox => checkbox.value);

        // Debugging to ensure selected metrics are correct
        //console.log("Selected Metrics:", selectedMetrics);

        // Ensure that onCalculate is called only if it's a valid function
        if (typeof onCalculate === 'function') {
            if (selectedSubcategory && modelType && selectedMetrics.length > 0) {
                onCalculate(selectedSubcategory, modelType, selectedMetrics); // Pass the details to parent
            }
            else{
                console.error('Invalid data or no metrics selected');
            }
        } else {
            console.error('onCalculate is not a valid function');
        }
    }

    // Step 6: Render the checkboxes and the "Calculate" button for each div
    const renderCheckboxes = (metrics) => {

        return metrics.map((sc) => (
            <div className='metric_checkbox' key={sc[0]}>
                <input
                    type="checkbox"
                    value={sc[0]}
                    name={`${categoryShortCode}_metrics`} // Group checkboxes by category
                    onChange={handleCheckboxChange}
                />
                <label title={sc[0]} style={{minWidth: '200px', maxWidth: '200px', textAlign: 'left'}}>{sc[0]}</label>
                <label>{sc[1]}</label>
            </div>
        ));
    
        /* OLD PRIYA CODE */ /*
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
        )); */
    };

    return (
         <div className='pillar'>
            <p className='title'>{category}</p>
            <div className='pillar_body'>
                <div className="dropdowns">
                    <select id="dropdown" value={selectedSubcategory} onChange={handleDropdownChange}>
                        <option key='' value=''>Select a Metric</option>
                        {subcategories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    {(selectedSubcategory !== '') && (
                        <div className='ERContent2'>
                            <select id="modelSelection1" value={modelType} onChange={handleModelSelection}>
                                <option value=''>Select Model</option>
                                {models.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    {/* Conditionally render metrics based on model selection for er */}
                    {(modelType !== '') && (
                        <div className='ERContent3'>
                            {renderCheckboxes(metrics)}
                        </div>
                    )}
                </div>
            {(modelType !== '') && (
                <div className="calculate">
                    <button onClick={handleCalculateClick}>Calculate</button>
                </div>
            )}
            </div>
        </div>
    );
}

export default ReportCategorySection;