/* Download Reports page */

import '../Css/DownloadReports.css';
import React, { useState, useEffect } from 'react';
import AppHeader from './Components/AppHeader';
import AppNavigator from './Components/AppNavigator';
import html3pdf from 'html3pdf';

function DownloadReport() {
    // State to store multiple report files
    const [reports, setReports] = useState([]);

    // Get saved reports data
    useEffect(() => {
        const savedReports = JSON.parse(localStorage.getItem('savedReports')) || [];
        setReports(savedReports);
    }, []);

    function EsgMetricReportContentRow({ report }) {
        return (
            <div className="content-row">
                <p className="p1"><strong>Name:</strong> {report.name}</p>
                <p className="p1"><strong>Timestamp:</strong> {report.timestamp}</p>
            </div>
        );
    }

    function OntologyReportContentRow({ report }) {
        return (
            <div className="content-row">
                <p className="p1"><strong>Pillar:</strong> {report.pillar}</p>
                <p className="p1"><strong>Metric:</strong> {report.metric}</p>
                <p className="p1"><strong>Model:</strong> {report.model}</p>
                <p className="p1"><strong>Timestamp:</strong> {report.timestamp}</p>
            </div>
        );
    }

    // Generate content for a report saved from the Ontology Enhanced PCA page
    const generateOntologyReportContent = (report) => {
        let reportContent = "<h1>" + report.name + "</h1>\n<br>"
        reportContent += `<p><strong>Timestamp:</strong> ${report.timestamp}</p><br><br><br>`;
        reportContent += `
                <p><strong>Pillar:</strong> ${report.pillar}</p><br>
                <p><strong>Metric:</strong> ${report.metric}</p><br>
                <p><strong>Model:</strong> ${report.model}</p><br><br>
            `;

        // Add header for csv table
        reportContent += "<p><b>Top ESG Categories (csv)</b>:</p><br>"
        reportContent += "<p>metric, percentage</p>"
        for (let dataRow of report.data) {
            // Add list of metrics and their loading values
            reportContent += "<p>" + dataRow.join(", ") + "</p>"
        }
        
        return reportContent;
    }

    // Generate content for a report saved from the ESG Report page
    const generateEsgReportContent = (report) => {
        // Display name and time
        let reportContent = "<h1>" + report.name + "</h1>\n<br>"
        reportContent += `<p><strong>Timestamp:</strong> ${report.timestamp}</p><br><br><br>`;

        for (let dataRow of report.data) {
            // Display metric and model
            reportContent += "<p><b>" + dataRow.subcategory + " - " + dataRow.model + "</b></p><br>"

            // Display average
            reportContent += "<p><i>Mean</i>:&nbsp;" + dataRow.mean + "</p><br>"
            
            // Add list of metrics used to generate this sum
            reportContent += "<p><i>Metrics Contributing</i>:&nbsp;" + dataRow.metrics.join(", ") + "</p><br><br>"
        }
        
        return reportContent
    }

    // Function to generate PDF for a report
    const handleDownloadPDF = (report) => {
        // Create content
        let reportContent = ""
        if (report.name === "Ontology Enhanced PCA Analysis Report") {
            reportContent = generateOntologyReportContent(report);
        } else if (report.name === "ESG Metric Summary Report") {
            reportContent = generateEsgReportContent(report);
        }
        
        // Add formatting options
        const options = {
            filename: `report_${report.timestamp}.pdf`,
            margin: [10, 10, 10, 10],
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
        };

        // Generate report with python module
        html3pdf()
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
                                    [...reports].reverse().map((report, index) => (
                                        <div key={index} className="report-details">
                                            {report.name === "Ontology Enhanced PCA Analysis Report"
                                                && <OntologyReportContentRow report={report} />}
                                            {report.name === "ESG Metric Summary Report"
                                                && <EsgMetricReportContentRow report={report} />}
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