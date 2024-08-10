import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import project from '../Tacvu/css/project.css';

const Project = () => {
    const navigate = useNavigate();
    const createClassRef = useRef();
    const { classId } = useParams();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [project_name, setProjectName] = useState('');
    const [project_of_group, setProjectOfGroup] = useState('');
    const [description, setDescription] = useState('');
    const [expiredDate, setExpiredDate] = useState('');
    const [expiredTime, setExpiredTime] = useState('');
    const [dateError, setDateError] = useState('');
    const groupRegisterMethod = localStorage.getItem('groupRegisterMethod');

    const handleAddProject = async (e) => {
        e.preventDefault();

        if (!project_name || !project_of_group || !description || !expiredDate || !expiredTime) {
            window.alert('Vui lòng điền đủ thông tin.');
            return;
        }

        const currentDate = new Date();
        const selectedDate = new Date(`${expiredDate}T${expiredTime}`);

        if (selectedDate <= currentDate) {
            setDateError("Ngày và giờ hết hạn không được nhỏ hơn ngày và giờ hiện tại.");
            return;
        } else {
            setDateError("");
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${BE_URL}/api-gv/project/create-project`,
                {
                    projectName: project_name,
                    projectOfGroup: project_of_group,
                    projectDescription: description,
                    expiredDay: expiredDate,
                    expiredTime: expiredTime
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                }
            );
            if (response.status === 200) {
                setProjectName('');
                setProjectOfGroup('');
                setDescription('');
                setExpiredDate('');
                setExpiredTime('');
                window.alert("Tạo đồ án thành công!!!");
                if (groupRegisterMethod === 'Teacher') {
                    navigate(`/tearchAdd/${classId}`)
                } else {
                    navigate(`/group/${classId}`);
                }
            }
        } catch (error) {
            window.alert("Thêm dự án thất bại!!!");
        }
    };

    const handleExpiredDateChange = (e) => {
        setExpiredDate(e.target.value);
        validateDateTime(e.target.value, expiredTime);
    };

    const handleExpiredTimeChange = (e) => {
        setExpiredTime(e.target.value);
        validateDateTime(expiredDate, e.target.value);
    };

    const validateDateTime = (date, time) => {
        const currentDate = new Date();
        const selectedDate = new Date(`${date}T${time}`);

        if (selectedDate <= currentDate) {
            setDateError("Ngày và giờ hết hạn không được nhỏ hơn ngày và giờ hiện tại.");
        } else {
            setDateError("");
        }
    };

    const [grouptList, setGroupList] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${BE_URL}/api-gv/classId/group-list/${classId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                setGroupList(data);
            })
            .catch(error => console.error('Error fetching student list:', error));
    }, [classId]);

    return (
        <div>
            <Navbar />
            <DetailClass />
            <div ref={createClassRef} className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className='taobaocao'>
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">TẠO ĐỒ ÁN</h2>
                                    <div className="mb-3">
                                        <input
                                            type='text'
                                            className="form-control"
                                            value={project_name}
                                            placeholder='Tên đồ án'
                                            onChange={(e) => setProjectName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            type='text'
                                            className="form-control"
                                            placeholder='Mô tả'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type='date'
                                            className="form-control"
                                            placeholder='Ngày tạo'
                                            value={expiredDate}
                                            onChange={handleExpiredDateChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type='time'
                                            className="form-control"
                                            placeholder='Thời gian hết hạn'
                                            value={expiredTime}
                                            onChange={handleExpiredTimeChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <select
                                            className="form-control"
                                            onChange={(e) => setProjectOfGroup(e.target.value)}
                                            value={project_of_group}
                                        >
                                            <option value="">Chọn nhóm</option>
                                            {grouptList.map((group) => (
                                                <option key={group.groupId} value={group.groupId}>
                                                    {group.groupName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {dateError && <div className="alert alert-danger">{dateError}</div>}
                                    <button className="btn btn-primary add-project" type='submit' onClick={handleAddProject} disabled={!!dateError}>
                                        Thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
