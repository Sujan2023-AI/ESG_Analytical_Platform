import '../../Css/ReportCategorySection.css';
import React from 'react';

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
}) {

    // Environment Risk Handlers

    // metric selector
    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;

        setSelectedSubcategory(selectedValue); // Update the state with the new value

        // Save the selected value to localStorage for persistence
        localStorage.setItem(categoryShortCode + 'Subcategory', selectedValue);
        setModelType(''); // Reset the model selection
        localStorage.removeItem(categoryShortCode + 'ModelType');

        // query metric list for selection
        fetch(`http://localhost:3902/metrics/industry/company/year/${categoryCode}/${selectedValue}/models`)
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
        fetch(`http://localhost:3902/data/${categoryCode}/${selectedSubcategory}/${selectedModel}/metrics`)
            .then(response => response.json())
            .then(data => setMetrics(data))
            .catch(error => console.error('Error fetching ' + category + ':', error));
    };

    // Step 6: Render the checkboxes and the "Calculate" button for each div
    const renderCheckboxes = (metrics) => {

        return metrics.map((sc) => (
            <div className='metric_checkbox' key={sc[0]}>
                <input
                    type="checkbox"
                    value={sc[0]}
                />
                <label style={{minWidth: '200px', maxWidth: '200px', textAlign: 'left'}}>{sc[0].toLowerCase()}</label>
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
                    <button onClick={() => console.log('Calculating has not been implemented...')}>Calculate</button>
                </div>
            )}
            </div>
        </div>
    );
}

export default ReportCategorySection;