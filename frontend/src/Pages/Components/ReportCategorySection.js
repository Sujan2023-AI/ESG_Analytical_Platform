// import '../Css/Enhanced.css';
import React, { useEffect } from 'react';

function DummyModelOptions({modelType, handleChange}) {
    return (
        <select id="modelSelection1" value={modelType} onChange={handleChange}>
            <option value="">Select Model</option>
            <option value="PCA Model">PCA Model</option>
            <option value="Ontology Model">Ontology Model</option>
        </select>
    );
}

function ReportCategorySection({
    category,
    categoryCode,
    categoryShortCode,
    subcategories,
    setSubcategories,
    selectedSubcategory,
    setSelectedSubcategory,
    modelType,
    setModelType,
    metrics,
    setMetrics,
}) {

    // Environment Risk Handlers

    // Subcategory selected
    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSubcategory(selectedValue); // Update the state with the new value

        // Save the selected value to localStorage for persistence
        localStorage.setItem(categoryShortCode + 'Subcategory', selectedValue);
        setModelType(''); // Reset the model selection
        localStorage.removeItem(categoryShortCode + 'ModelType');
    };

    // Model selected
    const handleModelSelection = (event) => {
        const selectedModel = event.target.value;

        // local storage call
        setModelType(selectedModel);
        localStorage.setItem(categoryShortCode + 'modelType', selectedModel);
 
        // query metric list for selection
        fetch(`http://localhost:3902/data/${categoryCode}/${selectedSubcategory}/metrics`)
            .then(response => response.json())
            .then(data => setMetrics(data))
            .catch(error => console.error('Error fetching ' + category + ':', error));
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
         <div className='metric1'>
            <p className='metricTitle'>{category}</p>
            <div className='ERContent'>
                <div className="ERContent1">
                    <select id="dropdown" value={selectedSubcategory} onChange={handleDropdownChange}>
                        <option key='default' value=''>Select a Metric</option>
                        {subcategories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                {(selectedSubcategory !== '') && (
                    <div className='ERContent2'>
                        <DummyModelOptions modelType={modelType} handleChange={handleModelSelection} />
                    </div>
                )}

                {/* Conditionally render metrics based on model selection for er */}
                {(modelType !== '') && (
                    <div className='ERContent3'>
                        {renderCheckboxes(metrics)}
                        <button onClick={() => console.log('Calculating has not been implemented...')}>Calculate</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReportCategorySection;