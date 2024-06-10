import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass'
const Project = () => {
    const createClassRef = useRef();
    const { classId } = useParams();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    /*add project */
    const [project_name, setProjectName] = useState('');
    const [project_of_group, setProjectOfGroup] = useState('');
    const [description, setDescription] = useState('');
    const [expired_day, setExpiredDay] = useState('');
    const [expired_time, setExpiredTime] = useState('');
    const handleAddProject = async (e) => {
        e.preventDefault();
        // Kiểm tra không được bỏ trống các trường
        if (!project_name || !project_of_group || !description || !expired_day || !expired_time) {
            window.alert('Vui lòng điền đủ thông tin.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${BE_URL}/api-gv/project/create-project`,
                {
                    projectName: project_name,
                    projectOfGroup: project_of_group,
                    projectDescription: description,
                    expiredDay: expired_day,
                    // expiredTime: formatTime(expired_time)
                    expiredTime: expired_time
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token // Thêm token vào header
                    }
                }
            );
            if (response.status === 200) {
                // Đặt lại các trường nhập
                setProjectName('');
                setProjectOfGroup('');
                setDescription('');
                setExpiredDay('');
                setExpiredTime('');
                window.alert("Project created successfully !");
            }
        } catch (error) {
            window.alert("Add fail !");
        }
    };
    // hiển thị group của lớp
    const [grouptList, setGroupList] = useState([]);
    useEffect(() => {
        // Fetch the list of students
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/api-gv/classId/group-list/${classId}`, {
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
            <Navbar/>
            <DetailClass/>
            <div ref={createClassRef} className='container-create-project'>
                <form onSubmit={handleAddProject}>
                    <input
                        type='text'
                        placeholder='Tên đồ án'
                        className='input'
                        value={project_name}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <select onChange={(e) => setProjectOfGroup(e.target.value)} value={project_of_group}>
                        <option value=''>Select Group</option>
                        {grouptList.map((group) => (
                            <option key={group.groupId} value={group.groupId}>
                                {group.groupName}
                            </option>
                        ))}
                    </select>
                    <input
                        type='text'
                        placeholder='Mô tả'
                        className='input'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type='date'
                        placeholder='CreateDay'
                        className='input'
                        value={expired_day}
                        onChange={(e) => setExpiredDay(e.target.value)}
                    />
                    <input
                        type='time'
                        placeholder='Thời gian hết hạn'
                        className='input'
                        value={expired_time}
                        onChange={(e) => setExpiredTime(e.target.value)}
                    />
                    {error && <div className="error">{error}</div>}
                    {successMessage && <div className="success">{successMessage}</div>}
                    <button className='btn btn-primary' type='submit' onClick={handleAddProject}>
                        Add project
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Project;
