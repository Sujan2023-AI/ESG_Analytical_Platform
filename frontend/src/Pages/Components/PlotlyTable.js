import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const PlotlyTable = ({dataUrl}) => {
    const [tableData, setTableData] = useState(null);
    
    useEffect(() => {
        fetch(dataUrl)
            .then((res) => res.json())
            .then((json) => {
                const parsed = typeof json === "string" ? JSON.parse(json) : json;
                setTableData(parsed);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!tableData) return <p><i>(Loading table...)</i></p>;
  
    return (
        <div className="table-container">
            <table className="my-table">
                <thead>
                <tr>
                    <th>Metric</th>
                    <th>Percentage</th>
                </tr>
                </thead>
                <tbody>
                    {tableData.map((t) => (
                        <tr key={t[0]}>
                            <td>{t[0]}</td>
                            <td>{t[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlotlyTable;