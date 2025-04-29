/* component that renders a chart using plotly based on given api call */
/* can be seen on PCA Analysis and Ontology Enhanced PCA page */

import Plot from 'react-plotly.js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const PlotlyChart = ({dataUrl}) => {
    const [plotData, setPlotData] = useState(null);
    
    useEffect(() => {
        fetch(dataUrl)
            .then((res) => res.json())
            .then((json) => {
                const parsed = typeof json === "string" ? JSON.parse(json) : json;
                setPlotData(parsed);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // parametres will be passed in as prop, so eslint warning here will be disabled
  
    // while waiting for fetch, tell user we are loading
    if (!plotData) return <p><i>(Loading chart...)</i></p>;
  
    return (
        <Plot
            data={plotData.data}
            layout={plotData.layout}
            config={plotData.config || {}}
        />
    );
};

export default PlotlyChart;