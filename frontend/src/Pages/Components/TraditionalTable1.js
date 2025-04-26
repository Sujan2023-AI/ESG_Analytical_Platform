import React from 'react';
import { useEffect, useState } from 'react';

const TraditionalTable1 = ({industry, year, pillar, model, metric}) => {
    const [tableData, setTableData] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:3902/traditional/table1/${industry}/${year}`)
            .then((res) => res.json())
            .then((json) => {
                const parsed = typeof json === "string" ? JSON.parse(json) : json;
                setTableData(parsed);
            });
    }, []);
  
    if (!tableData) return <p><i>(Loading table...)</i></p>;
  
    return (
        <div className="table-container">
            <table className="my-table">
                <thead>
                <tr>
                    <th>Metric</th>
                    <th>Loading Value</th>
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

export default TraditionalTable1;