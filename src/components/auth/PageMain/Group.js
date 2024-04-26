import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Group = () => {
        const [classData, setClassData] = useState({
            class_id: '',
        
            group_name: '',
            leader_id: ''
        });
        const [class_id, setClassId] = useState('');
        const [group_name, setGroupName] = useState('');
        const [leader_id, setLeaderid] = useState('');
        const [error, setError] = useState('');
        const [successMessage, setSuccessMessage] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post(`http://localhost:8080/api/class/create-a-group`, {
                    leaderId: leader_id,
                    classId: class_id,
                    groupName: group_name,
                });
                if (response.status != 200) {
                    // Đặt lại các trường nhập
                    setLeaderid('');
                    setClassId('');
                    setGroupName('');
                    // Đặt thông báo thành công
                    setSuccessMessage('Group created successfully.');
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
                        placeholder='Leader ID'
                        className='input'
                        value={leader_id}
                        onChange={(e) => setLeaderid(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Class ID'
                        className='input'
                        value={class_id}
                        onChange={(e) => setClassId(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Group Name'
                        className='input'
                        value={group_name}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <button className='btn btn-primary' type='submit'>
                        Add group
                    </button>
                </form>
            </div>
        );
};

export default Group;
