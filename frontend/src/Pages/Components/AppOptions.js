import React from 'react';
import '../../Css/AppOptions.css';

function AppOptions() {

  const reportingFrameworks = ["IFRS S1", "IFRS S2"]
  const reportingYears = ["2020", "2021", "2022", "2023", "2024"]

  return (  
    <div className="appOptions">
      <div className="content-row">
        <h3>Logged in as Sujan</h3>
      </div>
      <div className="content-row">
        <p>Your Company:</p>
        <input value="StarPower" disabled></input>
      </div>
      <div className="content-row">
        <p>Your Industry:</p>
        <input value="Semiconductors" disabled></input>
      </div>
      <div className="content-row">
        <p>Reporting Framework:</p>
        <select>
          {reportingFrameworks.map((rf) => (
            <option key={rf} value={rf}>{rf}</option>
          ))}
        </select>
      </div>
      <div className="content-row">
        <p>Reporting Year(s):</p>
        <div className="year-selection">

        <select defaultValue={"2020"}>
          {reportingYears.map((year) => 
            <option key={year} value={year}>{year}</option>
          )}
        </select>
        &nbsp;-&nbsp;
        <select defaultValue={"2024"}>
          {reportingYears.map((year) => 
            <option key={year} value={year}>{year}</option>
          )}
        </select>
        </div>
      </div>
    </div>
  );
}

export default AppOptions;