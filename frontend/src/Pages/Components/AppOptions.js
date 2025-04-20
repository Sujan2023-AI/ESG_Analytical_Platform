import React from 'react';
import { useState, useEffect } from 'react'

import '../../Css/AppOptions.css';

function AppOptions() {

  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState({
    name: '', company: '', industry: ''
  });

  // this is throwing me an error on frontend, the backend i'm running from server.js is using port 5001, so i am changing, was earlier 3902
  useEffect(() => {
      fetch('http://localhost:5001/api/categories')
          .then(response => response.json())
          .then(data => setCategories(data))
          .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Check localStorage for saved user data
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const reportingFrameworks = ["SASB", "IFRS S2"]
  const reportingYears = ["2020", "2021", "2022", "2023", "2024"]

  return (  
    <div className="appOptions">
      <div className="content-row">
        <h3>Logged in as {userData.name}</h3>
      </div>
      <div className="content-row">
        <p>Your Company:</p>
        <input value={userData.company} disabled></input>
      </div>
      <div className="content-row">
        <p>Your Industry:</p>
        <input value={userData.industry} disabled></input>
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
        <p>Reporting Year:</p>
        <div className="year-selection">
        <select defaultValue={"2024"}>
          {reportingYears.map((year) => 
            <option key={year} value={year}>{year}</option>
          )}
        </select>
        </div>
      </div>
      <div className="conent-row">
        <b>Dataset Categories</b>:
        <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.category} {category.subCategory}
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default AppOptions;