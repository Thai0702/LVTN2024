import React, { useState, useEffect } from 'react';
import Navbar from '../components/auth/Navbar';
import add from "../components/auth/img/add.png";
import { Link, useParams } from 'react-router-dom';


const DetailReport = () => {
const { groupId ,classId} = useParams(); // Lấy classId từ URL

const [isClassworkopen, setIsClasswork] = useState(false);
const [isCreateClassworkopen, setIsCreateClasswork] = useState(false);  

//lấy danh sách report of class id
const [reportList, setreportList] = useState([]);
useEffect(() => {
  // Fetch the list of report request
  fetch(`http://localhost:8080/api/report-request/${classId}`)
    .then(response => response.json())
    .then(data => {
      setreportList(data);
      setLoading(false); // Set loading to false after data is fetched
    })
    .catch(error => console.error('Error fetching report list:', error));
}, [classId]);


  const toggleCreateClasswork = () => {
    setIsCreateClasswork(!isCreateClassworkopen)
    setIsClasswork(false);
  };


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
        
        <div className='container-body'>
            <div className='create-work' onClick={toggleCreateClasswork}>
              <img src={add} alt='Create' />
              {/* {<p>Create</p>} */}
              <Link to="create-report">Create</Link>
            </div>
            <div className='works'>
              <ul>
                {reportList.map((report) => (
                  <li key={report.requestId}>
                    <span>{report.requestTile}</span>
                    <button className='btnDeleteSV'>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
    </div>
  )
};

export default DetailReport;
