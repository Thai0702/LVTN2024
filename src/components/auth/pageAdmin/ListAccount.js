import React, { useEffect } from 'react'
import { useState } from 'react'
import { useFetcher } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import NavbarAdmin from './NavbarAdmin';
import listaccount from './css/ListAccount.css'


const ListAccount = () => {
    const [listaccount, setListAcoount] = useState([]);
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
    return (
        <div>
            <NavbarAdmin />
            
            <div className='listac'>
                <p className='listaccount'>List Account</p>
                <ul>
                    {listaccount.map((account) => (
                        <li key={account.userId}>
                            <span>{account.fullName}-{account.email}</span>
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
