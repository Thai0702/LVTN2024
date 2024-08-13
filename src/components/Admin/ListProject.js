import React, { useEffect, useState } from 'react';
import NavbarAdmin from './NavbarAdmin';
import { BE_URL } from '../../utils/Url_request';
import listproject from './css/ListProject.css'

const ListProject = () => {
    const [listProject, setListProject] = useState([]); 
    
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
                
                const data = await response.json(); 
                setListProject(data);
            } catch (error) {
                console.log("Error fetching project list:", error);
            }
        };

        fetchListProject();
    }, []);

    return (
        <div>
            <NavbarAdmin />
            <div className='containerproject'>
            <div className='listpro'>
                <p className='listproject'>List Project</p>
                <ul>
                    {Array.isArray(listProject) && listProject.length > 0 ? (
                        listProject.map((project) => (
                            <li key={project.projectId}>
                                <span>{project.projectName} - Của Group: {project.projectOfGroup}</span>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-warning me-md-2" type="edit">EDIT</button>
                                    <button class="btn btn-danger" type="delete">DELETE</button>
                                </div>  
                            </li>
                        ))
                    ) : (
                        <p>No projects found.</p>
                    )}
                </ul>
            </div>
            </div>
        </div>
    );
}

export default ListProject;
