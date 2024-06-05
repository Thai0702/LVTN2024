import React, { useEffect, useState } from 'react';
import NavbarAdmin from './NavbarAdmin';
import { BE_URL } from '../../../utils/Url_request';

const ListProject = () => {
    const [listProject, setListProject] = useState([]); // Sửa lỗi chính tả 'setListProject'
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        const fetchListProject = async () => {
            try {
                const response = await fetch(`${BE_URL}/api-test/get-all-projects`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                
                const data = await response.json(); // Sử dụng await để chờ phản hồi JSON
                setListProject(data);
            } catch (error) {
                console.log("Error fetching project list:", error);
            }
        };

        fetchListProject();
    }, []); // Thêm mảng phụ thuộc rỗng để useEffect chỉ chạy một lần

    return (
        <div>
            <NavbarAdmin />
            <div className='works'>
                <p className='dsshow'>List Project</p>
                <ul>
                    {Array.isArray(listProject) && listProject.length > 0 ? (
                        listProject.map((project) => (
                            <li key={project.projectId}>
                                <span>{project.projectName} - Của Group: {project.projectOfGroup}</span>
                                <div>
                                    <button>Delete</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No projects found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default ListProject;
