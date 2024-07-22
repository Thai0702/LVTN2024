import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import { getAllSubmitReportsByRequestId } from './apiService';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass'
const Submit = () => {
    const accountId = localStorage.getItem('accountId');
    const { requestId, classId } = useParams();
    const [reportTitle, setReportTitle] = useState('');
    const [reportDescription, setReportDescription] = useState('');
    const [attachments, setAttachments] = useState([]); // Changed to an array
    const [reports, setReports] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false); // New state
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('submitBy', accountId);
        formData.append('reportOfRequest', requestId);
        formData.append('reportTitle', reportTitle);
        formData.append('reportDescription', reportDescription);
        
        // Append each selected file to FormData
        attachments.forEach(file => {
            formData.append('attachment', file);
        });
        try {
            const response = await axios.post(`${BE_URL}/api/report/submit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200 || response.status === 201) {
                alert('Submit success!!');
                // Reset form fields
                setIsSubmitted(true);
                setReportTitle('');
                setReportDescription('');
                setAttachments([]); // Reset attachments
                document.getElementById('fileInput').value = null; // Clear file input
                // Fetch lại báo cáo mới
                const newReports = await getAllSubmitReportsByRequestId(requestId);
                setReports(newReports);
                navigate(`/upload/${classId}/${requestId}`);
            } else {
                setMessage('There was an error submitting the report.');
            }
        } catch (error) {
            console.error('There was an error uploading the file!', error);
            alert('Vui lòng gửi lại !');
        }
    };
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to array
        setAttachments(files); // Set the state to the array of files
    };
    return (
        <div>
          <Navbar />
          <DetailClass />
          <div className="container">
          <div className="row justify-content-center">
        <div className="col-md-8 col-12">
          <div className="card">
            <div className="card-body">
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="Report Title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Report Description"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    onChange={handleFileChange}
                    multiple // Allow multiple file selection
                    required
                  />
                </div>
                <button className="btn btn-primary" type="submit">Nộp</button>
              </form>
              {isSubmitted && (
                <p className="mt-3">Bài nộp đã được gửi. Nhấn "Cancel" để hủy.</p>
              )}
              {message && <p className="mt-3">{message}</p>}
            </div>
          </div>
        </div>
      </div>
          </div>
        </div>
      );
      
}

export default Submit