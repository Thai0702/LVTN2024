import React, { useState, useEffect } from 'react';
import './admin.css';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const Admin = () => {
    const [accounts, setAccounts] = useState([]);
    const { classId } = useParams(); // Lấy classId từ URL
    const [updateData, setUpdateData] = useState({
        user_id: '',
        user_email: '',
        user_password: '',
        user_type: '',
        full_name: ''
    });
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = () => {
        fetch('http://localhost:8080/api/account')
            .then(response => response.json())
            .then(data => setAccounts(data))
            .catch(error => console.error('Error fetching accounts:', error));
    };

    const handleUpdate = (account) => {
        setUpdateData(account);
        setShowUpdateForm(true); // Show the update form when clicking "Update"
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/account/${updateData.userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
        .then(response => {
            if(response.ok) {
                fetchAccounts();
                setUpdateData({
                    user_id: '',
                    user_email: '',
                    user_password: '',
                    user_type: '',
                    full_name: ''
                });
                setShowUpdateForm(false); // Hide the update form after successful update
            } else {
                console.error('Failed to update account');
            }
        })
        .catch(error => console.error('Error updating account:', error));
    };

    const handleDelete = async (id) => {
        try {
            const responseDelete = await fetch(`http://localhost:8080/api/account/${id}`, {
                method: 'DELETE'
            });
    
            if (responseDelete.ok) {
                setAccounts(accounts.filter(account => account.userId !== id));
            } else {
                console.error('Failed to delete account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };
    
    return (
        <div>
            <Navbar />
            <div className='container-admin'>
                <div className='admin-1'>
                    Manager Account
                </div>
                <div className='admin-2'>
                    {accounts.map(account => (
                        <div key={account.userId} className='show-account'>
                            <span style={{ color: 'black' }}>{account.email}</span>
                            <div>
                                <button className='show-admin' onClick={() => handleDelete(account.userId)}>Delete</button>
                                <button className='show-admin' onClick={() => handleUpdate(account)}>Update</button>
                                {showUpdateForm && updateData.userId === account.userId && (
                                    <div className="update-form">
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type="text"
                                                name="email"
                                                value={updateData.email}
                                                onChange={handleInputChange}
                                                placeholder="Email"
                                            />
                                            <input
                                                type="text"
                                                name="password"
                                                value={updateData.password}
                                                onChange={handleInputChange}
                                                placeholder="Password"
                                            />
                                            <input
                                                type="text"
                                                name="type"
                                                value={updateData.type}
                                                onChange={handleInputChange}
                                                placeholder="User Type"
                                            />
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={updateData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="fullName"
                                            />
                                            <button type="submit">Save</button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;
