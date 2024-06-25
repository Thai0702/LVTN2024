import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass'
import css from './css/Stream.css'
import axios from 'axios';
const Stream = () => {
    const { classId } = useParams(); // Lấy classId từ URL
    // hiển thị hi tiết lớp môn học
    const [loading, setLoading] = useState(true);
    const [classDetail, setClassDetail] = useState(null);
    const [error, setError] = useState('');
    const fullName = localStorage.getItem('fullName');
    const type = localStorage.getItem('type');
    useEffect(() => {
        const fetchClassDetail = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            if (!classId) {
                setError('Class ID is required');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${BE_URL}/api-gv/class/get/${classId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token // Add token to header
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const classDetailData = await response.json();
                setClassDetail(classDetailData);
                console.log("chao:",classDetailData );
                const { memberPerGroup } = classDetailData
                localStorage.setItem('memberPerGroup', memberPerGroup);
                const { groupRegisterMethod } = classDetailData
                localStorage.setItem('groupRegisterMethod', groupRegisterMethod);
                const { subjectName } = classDetailData
                localStorage.setItem('subjectName', subjectName);
                const { schoolYear } = classDetailData
                localStorage.setItem('schoolYear', schoolYear);
                console.log("hhee:", memberPerGroup)
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch class detail');
            } finally {
                setLoading(false);
            }
        };

        fetchClassDetail();
    }, [classId]);

    //   hiển thị danh sách report 
    //lấy danh sách report of class id
    const [reportList, setreportList] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchReportList = async () => {
            try {
                const response = await fetch(`${BE_URL}/api-gv/report-request/${classId}`, {
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
                setreportList(data);
            } catch (error) {
                console.error('Error fetching report list:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched or an error occurs
            }
        };
        fetchReportList();
    }, [classId]);
    // delete report
    const [listReport, setListReport] = useState([]);

    const handleDeleteReport = async (requestId) => {
        if (!requestId) {
            console.error('request ID is missing or undefined');
            window.alert('request ID is missing or undefined');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            window.alert('No token found');
            return;
        }

        const confirmed = window.confirm("Bạn có chắc muốn xóa request này không?");
        if (!confirmed) {
            // Do not delete if user does not confirm
            return;
        }

        try {
            const responseDelete = await fetch(`${BE_URL}/api-gv/report-request/delete/${requestId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            if (responseDelete.ok) {
                // Remove project from list if deletion is successful
                setListReport(prevListReport => prevListReport.filter(project => project.requestId !== requestId));
                window.alert('Xóa project thành công.');
                window.location.reload(true);
            } else {
                const errorData = await responseDelete.json();
                console.error('Error deleting project:', errorData.message || responseDelete.statusText);
                window.alert('Xảy ra lỗi khi xóa project: ' + (errorData.message || responseDelete.statusText));
            }
        } catch (error) {
            console.error('Error deleting request:', error);
            window.alert('Xảy ra lỗi khi xóa request.');
        }
    };
    // update 
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateData, setUpdateData] = useState({
        requestOfProject: '',
        expiredTime: '',
        expiredDate: '',
        requestTile: '',
        requestDescription: ''
    });
    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        for (const key in updateData) {
            if (!updateData[key]) {
                alert('Vui lòng điền đầy đủ thông tin.');
                return;
            }
        }
        e.preventDefault();
        try {
            const response = await fetch(`${BE_URL}/api-gv/report-request/update/${updateData.requestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(updateData),
            });
            if (response.ok) {
                // Cập nhật trực tiếp danh sách lớp sau khi cập nhật thành công
                setListReport(prevList =>
                    prevList.map(item =>
                        item.subjectClassId === updateData.subjectClassId ? updateData : item
                    )
                );
                setUpdateData({
                    requestOfProject: '',
                    expiredTime: '',
                    expiredDate: '',
                    requestTile: '',
                    requestDescription: ''
                });
                setShowUpdateForm(false);
                // Ẩn form cập nhật sau khi cập nhật thành công
                window.alert('Sửa thành công !!');
                window.location.reload(true);
            } else {
                console.error('Failed to update class');
            }
        } catch (error) {
            console.error('Error updating class:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleUpdate = (reportItem) => {
        setUpdateData(reportItem);
        setShowUpdateForm(true); // Hiển thị form cập nhật khi nhấp vào "Cập nhật"
    };
    // add sinh vien bang ma sinh vien
    

    if (loading) {
        return <p>Loading...</p>;
    }


    if (error) {
        return <p>{error}</p>;
    }
    if (!classDetail) {
        return <p>No class detail available</p>;
    }
    return (
        <div>
            <Navbar />
            <DetailClass/>
            <div className='container-stream'>
                <div className='body-1'>
                    {/* <span>Tên giảng viên :{classDetail.fullNameCreate}</span> */}
                    <p>{classDetail.subjectName}</p>
                </div>
                <div className='body-2'>
                    {type === "GV" && (
                        <div className='body-code'>
                            <p>Code class</p>
                            <p>{classDetail.inviteCode}</p>
                        </div>
                    )}
                    <div className='works'>
                        <ul>
                            {reportList.map((report) => (
                                <li key={report.requestId}>
                                    <span>{report.requestTile} -  Ngày và giờ hết hạn : {report.expiredDate}/{report.expiredTime}</span>
                                    <button onClick={() => handleDeleteReport(report.requestId)}>Delete</button>
                                    
                                    {/* <button onClick={() => handleUpdate(report)}>Sửa</button> */}
                                    {showUpdateForm && updateData.requestId === report.requestId && (
                                        <div className="update-form">
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type="text"
                                                    name="requestOfProject"
                                                    value={updateData.requestOfProject}
                                                    onChange={handleInputChange}
                                                    placeholder="Report của group"
                                                    readOnly
                                                />
                                                <input
                                                    type="time"
                                                    name="expiredTime"
                                                    value={updateData.expiredTime}
                                                    onChange={handleInputChange}
                                                    placeholder="Thời gian hết hạn"
                                                />
                                                <input
                                                    type="date"
                                                    name="expiredDate"
                                                    value={updateData.expiredDate}
                                                    onChange={handleInputChange}
                                                    placeholder="Ngày hết hạn"
                                                />
                                                <input
                                                    type="text"
                                                    name="requestTile"
                                                    value={updateData.requestTile}
                                                    onChange={handleInputChange}
                                                    placeholder="Chủ đề"
                                                />
                                                <input
                                                    type="text"
                                                    name="requestDescription"
                                                    value={updateData.requestDescription}
                                                    onChange={handleInputChange}
                                                    placeholder="Mô tả"
                                                />

                                                <button type="submit">Lưu</button>
                                            </form>
                                        </div>
                                    )}
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stream
