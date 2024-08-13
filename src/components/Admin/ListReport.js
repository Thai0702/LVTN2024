import React, { useEffect, useState } from 'react';
import NavbarAdmin from './NavbarAdmin';
import { BE_URL } from '../../utils/Url_request';
import listreport from './css/ListReport.css'

const ListReport = () => {
    const [listReport, setListReport] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        const fetchListReport = async () => {
            try {
                const response = await fetch(`${BE_URL}/api-gv/report-request`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                
                const data = await response.json();
                setListReport(data);
            } catch (error) {
                console.log("Error fetching report list:", error);
            }
        };

        fetchListReport();
    }, []); 

    return (
        <div>
            <NavbarAdmin />
            <div className='containerreport'>
            <div className='listre'>
                <p className='listreport'>List Report</p>
                <ul>
                    {Array.isArray(listReport) && listReport.length > 0 ? (
                        listReport.map((report) => (
                            <li key={report.requestId}>
                                <span>{report.requestTile} - Của lớp: {report.subjectClass}</span>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-warning me-md-2" type="edit">EDIT</button>
                                    <button class="btn btn-danger" type="delete">DELETE</button>
                                </div>  
                            </li>
                        ))
                    ) : (
                        <p>No reports found.</p>
                    )}
                </ul>
            </div>
            </div>
        </div>
    );
};

export default ListReport;
