import React, { useEffect, useState } from 'react';
import NavbarAdmin from './NavbarAdmin';
import { BE_URL } from '../../../utils/Url_request';

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
                
                const data = await response.json(); // Sử dụng await để chờ phản hồi JSON
                setListReport(data);
            } catch (error) {
                console.log("Error fetching report list:", error);
            }
        };

        fetchListReport();
    }, []); // Thêm mảng phụ thuộc rỗng để useEffect chỉ chạy một lần

    return (
        <div>
            <NavbarAdmin />
            <div className='works'>
                <p className='dsshow'>List Report</p>
                <ul>
                    {Array.isArray(listReport) && listReport.length > 0 ? (
                        listReport.map((report) => (
                            <li key={report.requestId}>
                                <span>{report.requestTile} - Của lớp: {report.subjectClass}</span>
                                <div>
                                    <button>Delete</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No reports found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ListReport;
