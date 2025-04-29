import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Plot from "react-plotly.js";

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