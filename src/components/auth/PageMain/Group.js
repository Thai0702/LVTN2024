import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //import useNavigate từ react-router-dom

const Group = () => {
    const [class_id, setClassId] = useState('');
    const [group_name, setGroupName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/class/create-groups', {
        
                subject_class: class_id,
                group_name: group_name,
            });
        } catch (error) {
            setError('Lỗi đăng ký');
        }
    };

    return (
        <div className='container-create-project'>
            <form onSubmit={handleSubmit}>
            
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
                    Create
                </button>
            </form>
        </div>
    );
};

export default Group;
