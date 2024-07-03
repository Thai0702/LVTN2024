import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useFetcher } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import NavbarAdmin from './NavbarAdmin';
import listaccount from './css/ListAccount.css'
import axios from 'axios';


const ListAccount = () => {
    const [listaccount, setListAcoount] = useState([]);
    const fileInputRef = useRef(null);
    // const [loading, setLoading] = useState(false);
    //lấy danh sách report of class id
    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchAccounttList = async () => {
            try {
                const response = await fetch(`${BE_URL}/api-admin/account`, {
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
                setListAcoount(data);
            } catch (error) {
                console.error('Error fetching account list:', error);
            }
        };
        fetchAccounttList();
    },);
    // upload file
    // upload file 
    const handleFileUpload = async () => {
        const token = localStorage.getItem('token');
        const file = fileInputRef.current.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                await axios.post(`${BE_URL}/api-admin/class/excel`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    }
                });
                window.alert('File uploaded successfully!');
                // Load lại trang sau khi thêm thành công
                window.location.reload(false);
            } catch (error) {
                window.alert('File uploaded fail!');
            }
        } else {
            console.error('No file selected or class not selected');
            window.alert('No file selected or class not selected!');
        }
    };

    return (
        <div>
            <NavbarAdmin />
            <div className='listac'>
                <p className='listaccount'>List Account</p>
                <input type='file' ref={fileInputRef} />
                <button type="button" class="btn btn-secondary"  onClick={handleFileUpload}>Add</button>
                <ul>
                    {listaccount.map((account, index) => (
                        <li key={account.userId}>
                            <span>{index + 1}. Tên : {account.fullName}  -  Email : {account.email}</span>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-warning me-md-2" type="edit">EDIT</button>
                                <button class="btn btn-danger" type="delete">DELETE</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListAccount
