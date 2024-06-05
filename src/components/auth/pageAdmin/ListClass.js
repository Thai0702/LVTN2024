import React, { useEffect, useState } from 'react'
import NavbarAdmin from './NavbarAdmin'
import { BE_URL } from '../../../utils/Url_request';

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
            <div className='works'>
              <p className='dsshow'>List Class</p>
              <ul>
                {listClass.map((classlist) => (
                  <li key={classlist.subjectClassId}>
                    <span>{classlist.subjectName}-{classlist.schoolYear}</span>
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

export default ListClass
