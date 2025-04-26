import React from 'react';
import { useState, useEffect } from 'react'

import '../../Css/AppOptions.css';

function AppOptions() {

    const [categories, setCategories] = useState([]);
    const [reportingYear, setReportingYear] = useState(localStorage.getItem("reportingYear"));
    const initalUserData = JSON.parse(localStorage.getItem('userData'));
    const [userData, setUserData] = useState({
        name: initalUserData.name, company: initalUserData.company, industry: initalUserData.industry
    });

    // Check localStorage for saved user data
    useEffect(() => {
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
            setUserData(JSON.parse(savedUserData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("reportingYear", reportingYear)

        let otherUserData = JSON.parse(localStorage.getItem('userData'));
        let industry = otherUserData.industry;
        let company = otherUserData.company;
        fetch(`http://localhost:3902/metrics/${industry}/${company}/${reportingYear}`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, [reportingYear]);

    const handleYearSelection = (event) => {
        setReportingYear(event.target.value);
    }

    const reportingFrameworks = ["SASB"]
    const reportingYears = ["2020", "2021", "2022", "2023", "2024"]

    return (  
        <div className="AppOptions">
            <div className="options-row">
                <h3>Logged in as {userData.name}</h3>
            </div>
            <div className="options-row">
                <p>Your Company:</p>
                <input value={userData.company} disabled></input>
            </div>
            <div className="options-row">
                <p>Your Industry:</p>
                <input value={userData.industry} disabled></input>
            </div>
            <div className="options-row">
                <p>Reporting Framework:</p>
                <select>
                    {reportingFrameworks.map((rf) => (
                        <option key={rf} value={rf}>{rf}</option>
                    ))}
                </select>
            </div>
            <div className="options-row">
                <p>Reporting Year:</p>
                <div className="year-selection">
                    <select defaultValue={reportingYear} onChange={handleYearSelection}>
                        {reportingYears.map((year) => 
                            <option key={year} value={year}>{year}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="conent-row dataset-categories">
                <p>Dataset Categories Available in {reportingYear}:</p>
                <ul>
                    {categories.map(category => (
                        <li key={category}>
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AppOptions;