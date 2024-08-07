import React, { useEffect, useState } from 'react'
import NavbarAdmin from './NavbarAdmin'
import { BE_URL } from '../../utils/Url_request';
import listclass from './css/ListClass.css'


const ListClass = () => {
    const [listClass, setListClass] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetClassList = async () => {
            try {
                const response = await fetch(`${BE_URL}/api-admin/class`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response not ok');

                }
                const data =await response.json();

                setListClass(data);

            }
            catch(error) {
                console.log("Error fetching Class list",error);

            }
        };
        fetClassList();
    })
    return (
        <div>
            <NavbarAdmin />
            <div className='containerclass'>
            <div className='listcl'>
              <p className='listclass'>List Class</p>
              <ul>
                {listClass.map((classlist) => (
                  <li key={classlist.subjectClassId}>
                    <span>{classlist.subjectName}-{classlist.schoolYear}</span>
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

export default ListClass
