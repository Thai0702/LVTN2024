import React, { useEffect, useState } from 'react'
import NavbarAdmin from './NavbarAdmin'
import { BE_URL } from '../../utils/Url_request';
import listgroup from './css/ListGroup.css'

const ListGroup = () => {
    const [listGroup, setListGroup] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const fettListGroup = async () => {
            try {
                const respone = await fetch(`${BE_URL}/api-admin/getAll/group`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!respone.ok) {
                    throw new Error("Network response not ok");
                }
                const data = await respone.json();
                setListGroup(data);
            }
            catch (error) {
                console.log("error to fetching", error);
            }

        };
        fettListGroup();
    },)
    return (
        <div>
            <NavbarAdmin />
            <div className='containergroup'>
            <div className='listg'>
                <p className='listgroup'>List Group</p>
                <ul>
                    {listGroup.map((listgroup) => (
                        <li key={listgroup.groupId}>
                            <span>Mã lớp : {listgroup.classId} - {listgroup.groupName}</span>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-warning me-md-2" type="edit">EDIT</button>
                                <button class="btn btn-danger" type="delete">DELETE</button>
                            </div>  
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    )
}

export default ListGroup
