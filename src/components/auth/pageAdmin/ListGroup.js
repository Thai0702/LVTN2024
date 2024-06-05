import React, { useEffect, useState } from 'react'
import NavbarAdmin from './NavbarAdmin'
import { BE_URL } from '../../../utils/Url_request';

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
    })
    return (
        <div>
            <NavbarAdmin />
            <div className='works'>
                <p className='dsshow'>List Group</p>
                <ul>
                    {listGroup.map((listgroup) => (
                        <li key={listgroup.groupId}>
                            <span>Mã lớp : {listgroup.classId} - {listgroup.groupName}</span>
                            <div className=''>
                                <button  >Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default ListGroup
