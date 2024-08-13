import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import { BE_URL } from "../../../utils/Url_request";
import DetailClass from "./DetailClass";
const EditProject = () => {
    const {classId}=useParams();
    const location = useLocation();
    const listproject = location.state.listproject;
    const navigate = useNavigate();
    const [updateData, setUpdateData] = useState(listproject);
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
                `${BE_URL}/api-gv/project/update/${updateData.projectId}`,
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
                navigate(`/projectListClass/${classId}`); 
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
                                    <h2 className="card-title">Sửa đồ án</h2>
                                    <div className="mb-3">
                                        <label>Tên đồ án:</label>
                                        <input
                                            type="text"
                                            name="projectName"
                                            className="form-control"
                                            value={updateData.projectName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Mô tả:</label>
                                        <input
                                            type="text"
                                            name="projectDescription"
                                            className="form-control"
                                            value={updateData.projectDescription}
                                            onChange={handleInputChange}
                                            placeholder="Mô tả"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Ngày kết thúc:</label>
                                        <input
                                            type="date"
                                            name="expiredDay"
                                            className="form-control"
                                            value={updateData.expiredDay}
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

export default EditProject