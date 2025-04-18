import React, { useState, useEffect } from 'react';
import '../Css/DownloadReports.css';

function DownloadReport() {
  // State to store multiple report files
  const [reports, setReports] = useState([]);

  // Simulate fetching report data (use actual API or static files if needed)
  useEffect(() => {
    const dummyReports = [
      {
        filename: 'dummy_report_1.csv',
        createdAt: new Date().toLocaleString(),
        description: 'Report for 2023 Q1 data analysis.',
      },
      {
        filename: 'dummy_report_2.csv',
        createdAt: new Date().toLocaleString(),
        description: 'Report for 2023 Q2 data analysis.',
      },
      {
        filename: 'dummy_report_3.csv',
        createdAt: new Date().toLocaleString(),
        description: 'Annual report for 2023 fiscal year.',
      },
    ];
    setReports(dummyReports);
  }, []);

  // Function to handle file download
  const handleDownload = (file) => {
    const fileContent = `Filename,Creation Time,Description\n${file.filename},${file.createdAt},${file.description}`;
    const blob = new Blob([fileContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.filename;
    link.click();
    window.URL.revokeObjectURL(url); // Clean up the object URL
  };

  return (
    <div className="download-report">
      <div className="content-row">
        <h3>Download Reports</h3>
      </div>
      {reports.length > 0 ? (
        reports.map((file, index) => (
          <div key={index} className="report-details">
            <div className="content-row">
              <p><strong>File Name:</strong> {file.filename}</p>
            </div>
            <div className="content-row">
              <p><strong>Created At:</strong> {file.createdAt}</p>
            </div>
            <div className="content-row">
              <p><strong>Description:</strong> {file.description}</p>
            </div>
            <div className="content-row">
              <button className="download-btn" onClick={() => handleDownload(file)}>
                Export {file.filename}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No reports available to download.</p>
      )}
    </div>
  );
}

export default DownloadReport;
