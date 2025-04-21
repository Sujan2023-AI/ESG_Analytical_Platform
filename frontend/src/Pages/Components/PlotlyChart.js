import React from 'react';
import { useEffect, useState } from 'react';
import Plot from "react-plotly.js";

const PlotlyChart = () => {
    const [plotData, setPlotData] = useState(null);
  
    useEffect(() => {
        fetch("http://localhost:3902/plot/scree/1")
            .then((res) => res.json())
            .then((json) => {
                const parsed = typeof json === "string" ? JSON.parse(json) : json;
                setPlotData(parsed);
            });
    }, []);
  
    if (!plotData) return <p>Loading chart...</p>;
  
    return (
        <Plot
            data={plotData.data}
            layout={plotData.layout}
            config={plotData.config || {}}
        />
    );
};

export default PlotlyChart;