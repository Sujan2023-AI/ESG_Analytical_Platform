import React from 'react';
import { useState } from 'react';
import Plot from "react-plotly.js";

const PlotlyChart = ({industry, year, pillar, model, metric}) => {
    const [plotData, setPlotData] = useState(null);
    
    fetch(`http://localhost:3902/ontology/scree/${industry}/${year}/${pillar}/${model}/${metric}`)
        .then((res) => res.json())
        .then((json) => {
            const parsed = typeof json === "string" ? JSON.parse(json) : json;
            setPlotData(parsed);
        });
  
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