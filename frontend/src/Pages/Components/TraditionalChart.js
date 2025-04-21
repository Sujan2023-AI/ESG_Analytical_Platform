import React from 'react';
import { useEffect, useState } from 'react';
import Plot from "react-plotly.js";

const TraditionalChart = ({industry, year, pillar, model, metric}) => {
    const [plotData, setPlotData] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:3902/traditional/scree/${industry}/${year}`)
        //fetch(`http://localhost:3902/plot/scree/dummy`)
            .then((res) => res.json())
            .then((json) => {
                const parsed = typeof json === "string" ? JSON.parse(json) : json;
                setPlotData(parsed);
            });
    }, []);
  
    if (!plotData) return <p><i>(Loading chart...)</i></p>;
  
    return (
        <Plot
            data={plotData.data}
            layout={plotData.layout}
            config={plotData.config || {}}
        />
    );
};

export default TraditionalChart;