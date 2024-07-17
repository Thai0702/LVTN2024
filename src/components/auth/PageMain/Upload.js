import React, { useEffect, useState } from "react";
import axios from "axios";
import { BE_URL } from "../../../utils/Url_request"; // Make sure this URL is correct
import Navbar from '../Navbar';
import { useNavigate, useParams } from "react-router-dom";
import DetailClass from "../DetailClass";
import './css/upload.css';
import cancel from "../img/cancel.png";
import student from "../img/student.png";
import { deleteAllSubmitReportsByRequestId, deleteSubmitReportsBySubmitId, getAllFeedbackBySubmitId, getAllSubmitReportsByRequestId, saveFeedback } from "./apiService";

const GoogleDriverPicker = () => {
    const { requestId, classId } = useParams();
    const [isSubmitted, setIsSubmitted] = useState(false); // New state
    const [reportTitle, setReportTitle] = useState('');
    const [reportDescription, setReportDescription] = useState('');
    const [attachments, setAttachments] = useState([]); // Changed to an array
    const [message, setMessage] = useState('');
    const accountId = localStorage.getItem('accountId');
    const [loading, setLoading] = useState(true);
    const [reportDetail, setReportDetail] = useState(null);
    const [error, setError] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [isClick, setClick] = useState(false);
    const navigate = useNavigate();
    const toggleSubmit = () => {
        setClick(!isClick); // Toggle the button click state
        setIsSubmit(!isSubmit); // Show/hide the submit form
    };
    // lay requestId
    useEffect(() => {
        const fetchReportDetail = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${BE_URL}/api/report-request/${requestId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setReportDetail(data);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch report detail');
            } finally {
                setLoading(false);
            }
        };

        fetchReportDetail();
    }, [requestId]);
    //
    const [reports, setReports] = useState([]);
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getAllSubmitReportsByRequestId(requestId);
                setReports(data);
            } catch (err) {
                setError(err.message); // Cập nhật lỗi
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, [requestId]);
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to array
        setAttachments(files); // Set the state to the array of files
    };
    // delete all submit
    const handleDeleteAllSubmit = async (id) => {
        const confirmed = window.confirm('Bạn có muốn hủy bài nộp này không?');
        if (!confirmed) {
            return;
        }
        try {
            const data = await deleteAllSubmitReportsByRequestId(requestId);
            setReports([]);
            window.alert('Hủy bài nộp thành công!');
        } catch (error) {
            console.error('Đã xảy ra lỗi khi hủy bài nộp! ', error);
            window.alert('Đã xảy ra lỗi khi hủy bài nộp!');
        }
    };
    // delete submitId
    const handleDeleteSubmit = async (submitId) => {
        try {
            await deleteSubmitReportsBySubmitId(submitId);
            const newReports = await getAllSubmitReportsByRequestId(requestId); // Fetch updated reports
            setReports(newReports);
            return
        } catch (error) {
            console.error('Đã xảy ra lỗi khi hủy bài nộp! ', error);
            window.alert('Đã xảy ra lỗi khi hủy bài nộp!');
        }
    };
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
                toggleSubmit(false)
            } else {
                setMessage('There was an error submitting the report.');
            }
        } catch (error) {
            console.error('There was an error uploading the file!', error);
            alert('Vui lòng gửi lại !');
        }
    };
    //feedback
    const [feedbackData, setFeedabckData] = useState({
        feedbackOfRequestId: requestId,
        contentFeedback: "",
        score: null,
    });
    const handleFeedback = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${BE_URL}/api/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({ ...feedbackData }),
            });

            if (response.ok) {
                const newFeedback = await getAllFeedbackBySubmitId(requestId);
                setFeedback(newFeedback);
                setFeedabckData({
                    feedbackOfRequestId: requestId,
                    contentFeedback: "",
                    score:0
                });
            } else {
                window.alert("feedback failed!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    //get all feedback
    const [feedback, setFeedback] = useState([]);
    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const data = await getAllFeedbackBySubmitId(requestId);
                setFeedback(data);
            } catch (err) {
                setError(err.message); // Cập nhật lỗi
            } finally {
                setLoading(false);
            }
        };
        fetchFeedback();
    }, [requestId]);
    const handleChange = (e) => {
        setFeedabckData({ ...feedbackData, [e.target.name]: e.target.value });
      };
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!reportDetail) {
        return <p>No report detail available</p>;
    }
    return (
        <div>
            <Navbar />
            <DetailClass />
            <div className="showRequest">
                <h2>{reportDetail.requestTile}</h2>
                <p>Ngày giờ hết hạn : {reportDetail.expiredDate}/ {reportDetail.expiredTime}</p>
                <p>Mô tả : {reportDetail.requestDescription}</p>
            </div>
            {reports.length > 0 && (
                <div className="showsubmit">
                    {reports.map(report => (
                        <div key={report.id}>
                            {report.attachment_URL.split(', ').map((url, index) => {
                                // Lấy tên file từ URL
                                const fileName = url.split('?').pop(); // Lấy phần cuối cùng của URL
                                return (
                                    <div key={index} className="report-item">
                                        <a href={url} target="_blank" rel="noopener noreferrer">
                                            {fileName} {/* Hiển thị tên file */}
                                        </a>
                                        <span onClick={() => handleDeleteSubmit(report.submitId)}>
                                            <img src={cancel} />
                                        </span>
                                    </div>
                                );
                            })}

                        </div>
                    ))}
                </div>
            )}
            {isSubmit && (
                <div className="formSubmit">
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
                            multiple // Allow multiple file selection
                            required
                        />
                        <button className="btn btn-primary" type="submit">Nộp</button>
                    </form>
                    {isSubmitted && (
                        <p>Bài nộp đã được gửi. Nhấn "Cancel" để hủy.</p>
                    )}
                    {message && <p>{message}</p>}
                </div>
            )}
            {!isClick && <button onClick={toggleSubmit}>Thêm báo cáo</button>}  <br></br>
            {reports.length > 0 && (
                <button onClick={handleDeleteAllSubmit}>Hủy nộp</button>
            )}
            <div>
                <h4>Nhận xét !!</h4>
                {feedback.length > 0 && (
                    <div>
                        {feedback.map(feedback => (
                            <div key={feedback.id}>
                                {feedback.email.split('@')[0]}: {feedback.contentFeedback}
                            </div>
                        ))}
                    </div>
                )}
                <textarea
                    type="text"
                    className="form-control"
                    name="contentFeedback"
                    value={feedbackData.contentFeedback}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="form-control"
                    name="score"
                    value={feedbackData.score}
                    onChange={handleChange}
                />
                <button onClick={handleFeedback}>Gửi</button>
            </div>
        </div>
    );
}

export default GoogleDriverPicker;
