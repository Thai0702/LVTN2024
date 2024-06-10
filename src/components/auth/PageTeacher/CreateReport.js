import React, { useState, useEffect, useRef } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { BE_URL } from '../../../utils/Url_request';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass'
const CreateReport = () => {
 // add report request
 const {classId,groupId,projectId}=useParams();
 const [subjectClass, setsubjectClass] = useState('');
 const [requestOfProject, setrequestOfProject] = useState('');
 const [expiredTime, setexpiredTime] = useState('');
 const [expiredDate, setexpiredDate] = useState('');
 const [expiredAction, setexpiredAction] = useState('');
 const createClassRef = useRef();
 const [requestTile, setrequestTile] = useState('');
 const [error, setError] = useState('');
 const [successMessage, setSuccessMessage] = useState('');
 const [requestDescription, setrequestDescription] = useState('');
 const navigate = useNavigate();
 const handleAddReportRequest = async (e) => {
   e.preventDefault();
   // Kiểm tra không được bỏ trống các trường
   if (!requestOfProject || !expiredTime || !expiredDate || !requestTile || !requestDescription) {
     window.alert('Vui lòng điền đầy đủ thông tin.');
     return;
   }
   try {
     const token = localStorage.getItem('token');
     const response = await axios.post(
       `${BE_URL}/api-gv/report-request`,
       {
         subjectClass: classId,
         requestOfProject: requestOfProject,
         expiredTime: expiredTime,
         expiredDate: expiredDate,
         expiredAction: 2,
         requestTile: requestTile,
         requestDescription: requestDescription
       },
       {
         headers: {
           'Content-Type': 'application/json',
           Authorization: 'Bearer ' + token // Thêm token vào header
         }
       }
     );
     if (response.status !== 200) {
       setsubjectClass('');
       setrequestOfProject('');
       setexpiredTime('');
       setexpiredDate('');
       // setexpiredAction('');
       setrequestTile('');
       setrequestDescription('');
       window.alert("Report created successfully !");
       navigate(`/stream/${classId}`)
       window.location.reload(false);
     }
   } catch (error) {
     window.alert("Add fail !");
   }
 };
 // get project of group
 // get list project of group
 const [listProject, setListProject] = useState([]);
 useEffect(() => {
   const token = localStorage.getItem('token');
   const fettListProject = async () => {
     try {
       const respone = await fetch(`${BE_URL}/api-gv/group/projects/${groupId}`, {
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
       setListProject(data);
     }
     catch (error) {
       console.log("error to fetching", error);
     }

   };
   fettListProject();
 },)
  return (
    <div>
      <Navbar/>
      <DetailClass/>
      <div ref={createClassRef} className='container-create-project'>
            <form onSubmit={handleAddReportRequest}>
              <select onChange={(e) => setrequestOfProject(e.target.value)} value={requestOfProject}>
                <option value=''>Select project</option>
                {listProject.map((project) => (
                  <option key={project.projectId} value={project.projectId}>{project.projectName}</option>
                ))}
              </select>
              <input
                type='time'
                placeholder='Thời gian hết hạn'
                className='input'
                value={expiredTime}
                onChange={(e) => setexpiredTime(e.target.value)}
              />
              <input
                type='date'
                placeholder='Ngày hết hạn'
                className='input'
                value={expiredDate}
                onChange={(e) => setexpiredDate(e.target.value)}
              />
              <input
                type='text'
                placeholder='Chủ đề report'
                className='input'
                value={requestTile}
                onChange={(e) => setrequestTile(e.target.value)}
              />
              <input
                type='text'
                placeholder='Mô tả'
                className='input'
                value={requestDescription}
                onChange={(e) => setrequestDescription(e.target.value)}
              />
              {error && <div className="error">{error}</div>}
              {successMessage && <div className="success">{successMessage}</div>}
              <button className='btn btn-primary' type='submit' onClick={handleAddReportRequest}>
                Add Report
              </button>
            </form>
          </div>
    </div>
  )
}

export default CreateReport
