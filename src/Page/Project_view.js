import Navbar from "../components/auth/Navbar";
import React, { useState } from 'react';
import add from '../components/auth/img/add.png'
import { Link, useParams } from "react-router-dom";

const DetailProject = () => {

  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const {classId} = useParams(); // Lấy classId từ URL

  const toggleCreateProject = () => {
    setIsCreateProject(!isCreateProject);
    setIsProject(false);
  };

  return (
    <div>
      <Navbar />
      <div className='container-body' >
            <div className='create-work' onClick={toggleCreateProject}>
              <img src={add} alt='Create' />
              {/* <p>Add Project</p> */}
              <Link to={`/project-view/${classId}/add-project`}>Add Project</Link>
            </div>
            {/* <div className='works'>
              show all Project here
            </div> */}
          </div>
          
    </div>
  )
}

export default DetailProject;