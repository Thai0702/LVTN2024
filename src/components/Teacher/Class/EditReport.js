import React, { useState } from 'react'
import { BE_URL } from '../../../utils/Url_request';
import Navbar from "../Home/Navbar";
import DetailClass from "./DetailClass";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const EditReport = () => {
    const { classId } = useParams();
    const location = useLocation();
    const listreport = location.state.listreport;
    const navigate = useNavigate();
    const [updateData, setUpdateData] = useState(listreport);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        try {
            const response = await fetch(
                `${BE_URL}/api-gv/report-request/update/${updateData.requestId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify(updateData),
                }
            );
            if (response.ok) {
                navigate(`/stream/${classId}`); 
            } else {
                console.error("Failed to update class");
            }
        } catch (error) {
            console.error("Error updating class:", error);
        }
    };
    return (
        <div>
            <Navbar />
            <DetailClass />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className='taobaocao'>
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Sửa yêu cầu báo cáo</h2>
                                    <div className="mb-3">
                                        <label>Chủ đề báo cáo:</label>
                                        <input
                                            type="text"
                                            name="requestTile"
                                            className="form-control"
                                            value={updateData.requestTile}
                                            onChange={handleInputChange}
                                            placeholder="Mô tả"
                                        />
                                        
                                    </div>
                                    <div className="mb-3">
                                        <label>Mô tả:</label>
                                        <input
                                            type="text"
                                            name="requestDescription"
                                            className="form-control"
                                            value={updateData.requestDescription}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Ngày kết thúc:</label>
                                        <input
                                            type="date"
                                            name="expiredDate"
                                            className="form-control"
                                            value={updateData.expiredDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Thời gian kết thúc:</label>
                                        <input
                                            type="time"
                                            name="expiredTime"
                                            className="form-control"
                                            value={updateData.expiredTime}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Lưu</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditReport