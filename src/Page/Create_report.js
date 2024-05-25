import React, { useState, useEffect, useRef } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Navbar from "../components/auth/Navbar"
import axios from 'axios';


const CreateReport = () => {
  // add report request
  const { groupId, classId } = useParams(); // Lấy classId từ URL
  const [subjectClass, setsubjectClass] = useState('');
  const [requestOfProject, setrequestOfProject] = useState('');
  const [expiredTime, setexpiredTime] = useState('');
  const [expiredDate, setexpiredDate] = useState('');
  const [expiredAction, setexpiredAction] = useState('');
  const [requestTile, setrequestTile] = useState('');
  const [requestDescription, setrequestDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const createClassRef = useRef();
  const [classList, setClassList] = useState([]);
  const navigate = useNavigate();

  const handleAddReportRequest = async (e) => {
    e.preventDefault();
    // Kiểm tra không được bỏ trống các trường
    if (!subjectClass || !requestOfProject || !expiredTime || !expiredDate || !requestTile || !requestDescription) {
      window.alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:8080/api/report-request`,
        {
          subjectClass: subjectClass,
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
        // window.location.reload(true);
        {classList.map((classItem) => ( 
          navigate(`/report-view/${classItem.subjectClassId}`)
          ))} 
      }
      
    } catch (error) {
      window.alert("Add fail !");
    }
    
  };

// lay danh sach lop userId by account 
useEffect(() => {
  const fetchClasses = async () => {
    try {
      const userId = localStorage.getItem('accountId'); // Lấy userId từ localStorage
      if (!userId) {
        console.error('userId not found in localStorage');
        return;
      }
      const response = await fetch(`http://localhost:8080/api/class/createdBy/${userId}`);
      const classData = await response.json();
      setClassList(classData);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };
  fetchClasses();
}, []);
 // /*show list student of class*/
 const [projectList, setProjectList] = useState([]);
 const [loading, setLoading] = useState(true);
 useEffect(() => {
   // Fetch the list of students
   fetch(`http://localhost:8080/api/group/${groupId}/projects`)
     .then(response => response.json())
     .then(data => {
      setProjectList(data);
       setLoading(false); // Set loading to false after data is fetched
     })
     .catch(error => console.error('Error fetching student list:', error));
 }, [groupId]);

  return (
    <div>
      <Navbar />
      <div ref={createClassRef} className='container-create-project'>
            <form onSubmit={handleAddReportRequest}>
              {/* <input
                type='text'
                placeholder='Báo cáo cho project nào ?'
                className='input'
                value={requestOfProject}
                onChange={(e) => setrequestOfProject(e.target.value)}
              /> */}
        
              <select onChange={(e) => setsubjectClass(e.target.value)} value={subjectClass}>
                <option value=''>Select Class</option>
                {classList.map((classItem) => (
                  <option key={classItem.subjectClassId} value={classItem.subjectClassId}>{classItem.subjectName}</option>
                ))}
              </select>
              <input
                type='text'
                placeholder='Thời gian hết hạn'
                className='input'
                value={expiredTime}
                onChange={(e) => setexpiredTime(e.target.value)}
              />
                     <select onChange={(e) => setrequestOfProject(e.target.value)} value={requestOfProject}>
                <option value=''>Select Project</option>
                {projectList.map((classItem) => (
                  <option key={classItem.projectId} value={classItem.projectId}>{classItem.projectName}</option>
                ))}
              </select>
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
  );
};
export default CreateReport;
