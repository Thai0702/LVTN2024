import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import { getAllSubmitReportsByRequestId } from '../../../services/apiService';
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass"
const Submit = () => {
    const accountId = localStorage.getItem('accountId');
    const { requestId, classId } = useParams();
    const [reportTitle, setReportTitle] = useState('');
    const [reportDescription, setReportDescription] = useState('');
    const [attachments, setAttachments] = useState([]); 
    const [reports, setReports] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('submitBy', accountId);
        formData.append('reportOfRequest', requestId);
        formData.append('reportTitle', reportTitle);
        formData.append('reportDescription', reportDescription);

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

                setIsSubmitted(true);
                setReportTitle('');
                setReportDescription('');
                setAttachments([]); 
                document.getElementById('fileInput').value = null; 

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
        const files = Array.from(e.target.files);
        setAttachments(files); 
    };
  return (
    <div>
        <Navbar/>
        <DetailClass/>
      <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={reportTitle}
                                        onChange={(e) => setReportTitle(e.target.value)}
                                        placeholder="Report Title"

                                    />
                                    <input
                                        value={reportDescription}
                                        className="form-control"
                                        onChange={(e) => setReportDescription(e.target.value)}
                                        placeholder="Report Description"

                                    />
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="fileInput"
                                        onChange={handleFileChange}
                                        multiple 
                                        required
                                    />
                                    <button className="btn btn-primary" type="submit">Nộp</button>
                                </form>
                                {isSubmitted && (
                                    <p>Bài nộp đã được gửi. Nhấn "Cancel" để hủy.</p>
                                )}
                                {message && <p>{message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}
export default Submit
