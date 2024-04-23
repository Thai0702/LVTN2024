import React, { useState, useEffect } from 'react';

const Project = () => {
    const [projectData, setProjectData] = useState({
        project_name: '',
        description: '',
        project_of_group:'',
        expired_day:'',
        expired_time: ''
    });
    const [users, setUsers] = useState([]);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    const validateInput = () => {
        const { project_name, description, project_of_group, expired_day, expired_time } = projectData;
        if (!project_name || !description || !project_of_group || !expired_day || !expired_time) {
            setError('Please fill in all fields.');
            return false;
        }
        setError(null);
        return true;
    };

    const handleCreate = async () => {
        try {
            if (!validateInput()) return;

            const response = await fetch('http://localhost:8080/api/project/create-project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectData)
            });

            if (response.ok) {
                setCreateSuccess(true);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to create project');
            }

            setProjectData({
                project_name: '',
                description: '',
                project_of_group:'',
                expired_day:'',
                expired_time: ''
            });
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong. Please try again later.');
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/class/{classId}/group-list');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setUsers(userData); // Assuming userData is an array
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch user data.');
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (createSuccess) {
            window.alert('Project created successfully.');
            setCreateSuccess(false);
        }
    }, [createSuccess]);

    return (
        <div>
            {error && <div className="error">{error}</div>}
            <div className='container-create'>
                <p>Create Project!</p>
                <input type='text' placeholder='Project Name' className='input' name='project_name' value={projectData.project_name} onChange={handleChange}></input>
                <input type='text' placeholder='Description' className='input' name='description' value={projectData.description} onChange={handleChange}></input>
                <select className='input' name='project_of_group' value={projectData.project_of_group} onChange={handleChange}>
                    <option value=''>Select creator</option>
                    {users.map((user) => (
                        <option key={user.group_id} value={user.group_id}>{user.group_name}</option>
                    ))}
                </select>
                <input type='text' placeholder='Expired Day' className='input' name='expired_day' value={projectData.expired_day} onChange={handleChange}></input>
                <input type='text' placeholder='Expired Time' className='input' name='expired_time' value={projectData.expired_time} onChange={handleChange}></input>
                <button className='button-create' onClick={handleCreate}>Create</button>
            </div>
        </div>
    )
}

export default Project;
