import '../Css/DownloadReports.css';
import React, { useState, useEffect } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';
// @ts-ignore
import html2pdf from 'html2pdf.js';

function DownloadReport() {
    // State to store multiple report files
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const savedReports = JSON.parse(localStorage.getItem('savedReports')) || [];
        setReports(savedReports);
    }, []);

    // Simulate fetching report data (use actual API or static files if needed)
    //useEffect(() => {
    //    const dummyReports = [
    //        {
    //            filename: 'dummy_report_1.csv',
    //            createdAt: new Date().toLocaleString(),
    //            description: 'Report for 2023 Q1 data analysis.',
    //        },
    //        {
    //            filename: 'dummy_report_2.csv',
    //            createdAt: new Date().toLocaleString(),
    //            description: 'Report for 2023 Q2 data analysis.',
    //        },
    //        {
    //            filename: 'dummy_report_3.csv',
    //            createdAt: new Date().toLocaleString(),
    //            description: 'Annual report for 2023 fiscal year.',
    //        },
    //    ];
    //    setReports(dummyReports);
    //}, []);

    // Function to handle file download
    //const handleDownload = (file) => {
    //    const fileContent = `Filename,Creation Time,Description\n${file.filename},${file.createdAt},${file.description}`;
    //    const blob = new Blob([fileContent], { type: 'text/csv' });
    //    const url = window.URL.createObjectURL(blob);
    //    const link = document.createElement('a');
    //    link.href = url;
    //    link.download = file.filename;
    //    link.click();
    //    window.URL.revokeObjectURL(url); // Clean up the object URL
    //};

    // Function to generate PDF for a report
    const handleDownloadPDF = (report) => {
        const reportContent = `
            <h1>Report</h1>
            <p><strong>Pillar:</strong> ${report.pillar}</p>
            <p><strong>Metric:</strong> ${report.metric}</p>
            <p><strong>Model:</strong> ${report.model}</p>
            <p><strong>Timestamp:</strong> ${report.timestamp}</p>
        `;
        
        const options = {
            filename: `report_${report.timestamp}.pdf`,
            margin:       [10, 10, 10, 10],
            jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' },
        };

        html2pdf()
            .from(reportContent)
            .set(options)
            .save();
    };

    return (
        <div className="App">
            <AppHeader />
            <div className="Body">
                <AppNavigator />
                <div className='Main'>
                    <div className='Content'>
                        <div className='download-reports'>
                            <div className='header'>
                                <h1>Download Reports</h1>
                                <p className="p1">Here are the available reports for download:</p>
                            </div>
                            {/*
                            <div className='reportList'>
                                {reports.length > 0 ? (
                                    reports.map((file, index) => (
                                        <div key={index} className="report-details">
                                            <div className="content-row">
                                                <p className="p1"><strong>File Name:</strong> {file.filename}</p>
                                            </div>
                                            <div className="content-row">
                                                <p className="p1"><strong>Created At:</strong> {file.createdAt}</p>
                                            </div>
                                            <div className="content-row">
                                                <p className="p1"><strong>Description:</strong> {file.description}</p>
                                            </div>
                                            <div className="content-row">
                                                <button className="download-btn" onClick={() => handleDownload(file)}>
                                                    Export {file.filename}
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="p1">No reports available to download.</p>
                                )}
                            </div>*/}
                            <div className='reportList'>
                                {/* Display the reports */}
                                {reports.length > 0 ? (
                                    reports.map((report, index) => (
                                        <div key={index} className="report-details">
                                            <div className="content-row">
                                                <p className="p1"><strong>Pillar:</strong> {report.pillar}</p>
                                                <p className="p1"><strong>Metric:</strong> {report.metric}</p>
                                                <p className="p1"><strong>Model:</strong> {report.model}</p>
                                                <p className="p1"><strong>Timestamp:</strong> {report.timestamp}</p>
                                            </div>
                                            <button className="download-btn" onClick={() => handleDownloadPDF(report)}>
                                                Download Report as PDF
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="p1">No reports available to download.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DownloadReport;
