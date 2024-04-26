import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Project = () => {
    const [classData, setClassData] = useState({
        project_name: '',
        project_of_group: '',
        description: '',
        created_by: '',
        created_at: '',
        expired_day: '',
        expired_time: '',
    });
    const [project_name, setProjectName] = useState('');
    const [project_of_group, setGrsetProjectofgroup] = useState('');
    const [description, setdescription] = useState('');
    const [created_by, setcreated_by] = useState('');
    const [created_at, setcreated_at] = useState('');
    const [expired_day, setexpired_day] = useState('');
    const [expired_time, setexpired_time] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { classId } = useParams();
    const [grouptList, setGroupList] = useState([]);
    useEffect(() => {
        // Fetch the list of students
        fetch(`http://localhost:8080/api/class/${classId}/group-list`)
            .then(response => response.json())
            .then(data => {
                setGroupList(data);
            })
            .catch(error => console.error('Error fetching student list:', error));
    }, [classId]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/project/create-project`, {
                projectName: project_name,
                projectOfGroup: project_of_group,
                projectDescription: description,
                createdBy: created_by,
                createdAt: created_at,
                expiredDay: expired_day,
                expiredTime: expired_time
            });
            if (response.status != 200) {
                // Đặt lại các trường nhập
                setProjectName('');
                setGrsetProjectofgroup('');
                setdescription('');
                setcreated_by('');
                setcreated_at('');
                setexpired_day('');
                setexpired_time('');
                // Đặt thông báo thành công
                setSuccessMessage('Project created successfully.');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        } catch (error) {
            setError('Lỗi đăng ký');
        }
    };

    return (
        <div className='container-create-project'>
            <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                {successMessage && <div className="success">{successMessage}</div>}
                <input
                    type='text'
                    placeholder='Project Name'
                    className='input'
                    value={project_name}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <select onChange={(e) => setGrsetProjectofgroup(e.target.value)} value={classData.project_of_group}>
                    <option value=''>Select Class</option>
                    {Array.isArray(grouptList) && grouptList.map((group) => (
                        <option key={group.group_id} value={group.group_id}>
                            {group.groupName}
                        </option>
                    ))}
                </select>

                <input
                    type='text'
                    placeholder='Description'
                    className='input'
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='CreatedBy'
                    className='input'
                    value={created_by}
                    onChange={(e) => setcreated_by(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Project Name'
                    className='input'
                    value={created_at}
                    onChange={(e) => setcreated_at(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Project Name'
                    className='input'
                    value={expired_day}
                    onChange={(e) => setexpired_day(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Project Name'
                    className='input'
                    value={expired_time}
                    onChange={(e) => setexpired_time(e.target.value)}
                />
                <button className='btn btn-primary' type='submit'>
                    Add project
                </button>
            </form>
        </div>
    );
}

export default Project;
