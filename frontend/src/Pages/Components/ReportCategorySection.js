/* component used to display each ESG pillar box and it's associated drop down menu's */
/* can be seen on the ESG Report page */

import '../../Css/ReportCategorySection.css';
import React from 'react';

function ReportCategorySection({
    // category represents the "pillar" column in database, there will be six (ESG -> Risk/Opportunity)
    category,
    categoryCode,
    categoryShortCode,
    // subcategories reprsent the "metric" column in database
    subcategories,
    selectedSubcategory,
    setSelectedSubcategory,
    // models represent the "model" column in database
    models,
    setModels,
    modelType,
    setModelType,
    // metrics represent the "category" column in database
    metrics,
    setMetrics,
    // runs the calculation logic from the parent, which is EsgReport.js
    onCalculate
}) {
    // Get current user and selection information
    const userData = JSON.parse(localStorage.getItem("userData"));
    let industry = userData.industry;
    let company = userData.company;
    let year = parseInt(localStorage.getItem("reportingYear"));

    // Handles selection of the top level "select a metric" dropdown
    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;

        // Update the state with the new value
        setSelectedSubcategory(selectedValue);

        // Query model list to populate next selection options
        fetch(`http://localhost:3902/models/${industry}/${company}/${year}/${categoryCode}/${selectedValue}`)
            .then(response => response.json())
            .then(data => setModels(data))
            .catch(error => console.error('Error fetching ' + category + ':', error));
    };

    // Handles selection of the second level "select a model" dropdown
    const handleModelSelection = (event) => {
        const selectedModel = event.target.value;

        // Update the state with the new value
        setModelType(selectedModel);
 
        // Query category list for the next selection options
        fetch(`http://localhost:3902/categories/${industry}/${company}/${year}/${categoryCode}/${selectedSubcategory}/${selectedModel}`)
            .then(response => response.json())
            .then(data => setMetrics(data))
            .catch(error => console.error('Error fetching ' + category + ':', error));
    };

    const handleCalculateClick = () => {
        // Gather selected metrics
        const selectedMetrics = Array.from(document.querySelectorAll(`input[name="${categoryShortCode}_metrics"]:checked`))
            .map(checkbox => checkbox.value);

        // Debugging to ensure selected metrics are correct
        if (selectedMetrics.length > 0) {
            // Fetch values for selected metrics from the metrics list
            const selectedValues = metrics.filter(metric => selectedMetrics.includes(metric[0])).map(metric => metric[1]);
    
            // Calculate the mean of the selected metrics' values
            const mean = selectedValues.length > 0 
                ? selectedValues.reduce((acc, value) => acc + value, 0) / selectedValues.length 
                : 0;    

            // Ensure that onCalculate is called only if it's a valid function
            if (typeof onCalculate === 'function') {
                if (selectedSubcategory && modelType && selectedMetrics.length > 0) {
                    onCalculate(selectedSubcategory, modelType, selectedMetrics, mean); // Pass the details to parent
                }
                else {
                    console.error('Invalid data or no metrics selected');
                }
            } else {
                console.error('onCalculate is not a valid function');
            }
        }
        else {
            console.error('No metrics selected')
        }
    }

    // Render the checkboxes and the calculate button for each box
    const renderCheckboxes = (metrics) => {
        return metrics.map((sc) => (
            <div className='metric_checkbox' key={sc[0]}>
                <input
                    type="checkbox"
                    value={sc[0]}
                    name={`${categoryShortCode}_metrics`} // Group checkboxes by category
                />
                <label title={sc[0]} style={{minWidth: '200px', maxWidth: '200px', textAlign: 'left'}}>{sc[0]}</label>
                <label>{sc[1]}</label>
            </div>
        ));
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
                    {/* Conditionally render models based on metric selection status */}
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
                    {/* Conditionally render categories based on model selection status */}
                    {(modelType !== '') && (
                        <div className='ERContent3'>
                            {renderCheckboxes(metrics)}
                        </div>
                    )}
                </div>
            {/* Conditionally render calculate button based on model selection status */}
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