import React, { useState, useEffect } from 'react';
import Navbar from "../Home/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import css from "./css/showclass.css";
import home from './css/home.css';
import "./css/main.css"
const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {

      navigate('/login');
    }
    console.log("hello",token);
  }, []);

  const [classList, setClassList] = useState([]);
  const [classListStudent, setClassListStudent] = useState([]);
  
  useEffect(() => {
    const fetchClasses = async () => {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('accountId');
      
      if (!userId) {
        console.error('userId not found in localStorage');
        return;
      }

      try {
        const response = await fetch(`${BE_URL}/api-gv/class/createdBy/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const classData = await response.json();
        setClassList(classData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);


  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');

        if (!userId) {
          console.error('userId not found in localStorage');
          return;
        }

        const response = await fetch(`${BE_URL}/api/user/${userId}/joined-class`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const classData = await response.json();
        setClassListStudent(classData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleDelete = async (classId) => {
    const token = localStorage.getItem('token');
    try {
      

      const responseSV = await fetch(`${BE_URL}/api/class/student-list/${classId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      const dataSV = await responseSV.json(); 

      if (dataSV.length > 0) {
        alert("Không thể xóa vì đã thêm sinh viên vào lớp");
      } else {

        window.confirm("Bạn có chắc muốn xóa lớp này không?");
        await fetch(`${BE_URL}/api-gv/class/delete/${classId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });

        setClassList(prevList => prevList.filter(item => item.subjectClassId !== classId));
      }
    } catch (error) {
      console.error('Error deleting class:', error);
    }   
  };

  const handleUpdate = (classItem) => {
    navigate(`/editclass`, { state: { classItem, subjectName: classItem.subjectName } }); 
  };
  const handleMenuToggle = (classId) => {
    setShowMenu(prevState => (prevState === classId ? null : classId));
  };

//dấu 3 chấm
  const [showMenu, setShowMenu] = useState(null);
  useEffect(() => {
    const handleClickOutside = (event) => {

      if (showMenu && !event.target.closest('.menu-container, .menu')) {
        setShowMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);
  
  return (
    <div>
      <Navbar />
      <div className='home-main'>
        <div className='show-class'>
          <ul className="class-list">
            {classList.map((classItem) => (
              <li key={classItem.id} className='showclass-1'>
                <div>
                  <div className='name_class'><Link to={`/class/${classItem.subjectClassId}`}>{classItem.subjectName}</Link></div>
                  <div className='menu-container'>
                      <span onClick={() => handleMenuToggle(classItem.subjectClassId)} className="menu-icon">⋮</span>
                      {showMenu === classItem.subjectClassId && (
                        
                        <div className='menu'>
                          <button className="btn btn-primary" onClick={() => handleDelete(classItem.subjectClassId)}>Xóa</button>
                          <button className="btn btn-primary"onClick={() => handleUpdate(classItem)}>Sửa</button>
                        </div>
                        
                      )}
                  </div>
                    
                </div>
              </li>
            ))}
          </ul>
          <ul className="class-list">
            {classListStudent.map((classItem) => (
              <li key={classItem.id} className='showclass-1'>
                <div>
                  <div className='name_class'><Link to={`/class/${classItem.subjectClassId}`}>{classItem.subjectName}</Link></div>
                </div>    
              </li>  
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
