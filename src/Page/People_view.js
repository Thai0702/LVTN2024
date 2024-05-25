import Navbar from '../components/auth/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailPeople = () => {

const { classId } = useParams(); // Lấy classId từ URL
const [studentList, setStudentList] = useState([]);
const fileInputRef = useRef(null);
const [selectedClassId, setSelectedClassId] = useState(null);
const [classList, setClassList] = useState([]);
const handleFileUpload = async () => {
  const file = fileInputRef.current.files[0];
  if (file && selectedClassId) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post(`http://localhost:8080/api/account/class/${selectedClassId}/excel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.alert('File uploaded successfully!');
      // Load lại trang sau khi thêm thành công
      window.location.reload(false);
    } catch (error) {
      window.alert('File uploaded fail!');
    }
  } else {
    console.error('No file selected or class not selected');
    window.alert('No file selected or class not selected!');
  }
};

// /*show list student of class*/
const [loading, setLoading] = useState(true);
useEffect(() => {
  // Fetch the list of students
  fetch(`http://localhost:8080/api/class/${classId}/student-list`)
    .then(response => response.json())
    .then(data => {
      setStudentList(data);
      setLoading(false); // Set loading to false after data is fetched
    })
    .catch(error => console.error('Error fetching student list:', error));
}, [classId]);

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

  return (
    <div>
      <Navbar />
      <div className='container-body'>
            <div className='c'>
              <input type='file' ref={fileInputRef} />
              {/* <select onChange={(e) => setSelectedClassId(e.target.value)} value={classId}>
                <option value=''>Select Class</option>
                {classList.map((classItem) => (
                  <option key={classItem.subjectClassId} value={classItem.subjectClassId}>{classItem.subjectName}</option>
                ))}
              </select> */}
              <input type='text' value={classId} />
              <button onClick={handleFileUpload}>Add</button>

            </div>
            <div className='works'>
              <p className='dsshow'>List Students</p>
              <ul>
                {studentList.map((student) => (
                  <li key={student.classId}>
                    <span>{student.studentId}-{student.fullName}</span>
                    <button className='btnDeleteSV'>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
    </div>

  );
};

export default DetailPeople;
