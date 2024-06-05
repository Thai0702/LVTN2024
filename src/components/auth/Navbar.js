import React, { useState, useEffect, useRef } from 'react';
import './Login.css'; // Import file CSS cho Header
import { Link } from 'react-router-dom';
import menu from './img/menu.png'; // Import the image
import home from './img/home.png';
import axios from 'axios';
import setting from './img/setting.png';
import teach from './img/teach.png';
import { useParams } from 'react-router-dom';
import add from './img/add.png';
import student from './img/student.png'
import { useNavigate } from 'react-router-dom';
import { BE_URL } from '../../utils/Url_request';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [projectText, setProjectText] = useState('Project'); // State variable for project text
  const [isCreate, setIsCreate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Trạng thái đăng nhập
  const [username, setUsername] = useState(''); // Tên người dùng
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUsername = localStorage.getItem('username');

    if (userLoggedIn === 'true' && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);
  const handleLogout = () => {
    // Xóa token và tên người dùng từ localStorage
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername('');
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  };
  const [classData, setClassData] = useState({
    subject_name: '',
    create_by: '',
    create_at: '',
    school_year: '',
    number_of_group: '',
    member_per_group: '',
    group_register_method: ''
  });
  const [users, setUsers] = useState([]);
  const [classList, setClassList] = useState([]);

  const [classListStudent, setClassListStudent] = useState([]);

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/account');
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);
  // lay userId by account 
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
            'Authorization': 'Bearer ' + token // Thêm token vào header
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
  const fullName = localStorage.getItem('fullName');
  //get all class of 
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
  // Chạy lại effect khi classList thay đổi
  const handleLinkClick = (text) => {
    setProjectText(text);
    setIsMenuOpen(true);
  };

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  // Ref for the create class component
  const createClassRef = useRef();
  /*click hide of element*/
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createClassRef.current && !createClassRef.current.contains(event.target)) {
        setIsCreate(false);
        setClassListStudent(false);
        setIsTeachingOpen(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [isTeachingOpen, setIsTeachingOpen] = useState(false);

  const toggleTeaching = () => {
    setIsTeachingOpen(!isTeachingOpen);
  };
  const [isStudentOpen, setIsStudentOpen] = useState(false);
  const toggleStedent = () => {
    setIsStudentOpen(!isStudentOpen);
  };
  //chọn đối tượng class
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
  };

  return (
    <header className="header">

      <div className="logo" onClick={toggleMenu}>
        <img src={menu} alt="Menu" /> {projectText} {/* Dynamic project text */}
      </div>


      {isMenuOpen && (
        <div  className="additional-components">
          <Link to='/' className='link' onClick={() => handleLinkClick('Home')}>
            <div className='menu_1'><img src={home} /> Home</div>
          </Link>
          <Link className='link' onClick={() => handleLinkClick('Teaching')}>
            <div className='menu_1' onClick={toggleTeaching}> <img src={teach} /> Class Created </div>
          </Link>
          {isTeachingOpen && (
            <div className='class-list-teach'>
              {classList.map((classItem) => (
                <li key={classItem.id}>
                  <Link to={`/class/${classItem.subjectClassId}`} style={{ textDecoration: 'none', color: 'black' }}>{classItem.subjectName}</Link> {/* Sử dụng id của lớp */}
                </li>
              ))}
            </div>
          )}
          <Link className='link' onClick={() => handleLinkClick('Student')}>
            <div className='menu_1' onClick={toggleStedent}> <img src={student} /> Class Joined</div>
          </Link>
          {isStudentOpen && (
            <div  className='class-list-teach'>
              {classListStudent.map((classItem) => (
                <li key={classItem.id}>
                  <Link to={`/class/${classItem.subjectClassId}`} style={{ textDecoration: 'none', color: 'black' }}>{classItem.subjectName}</Link> {/* Sử dụng id của lớp */}
                </li>
              ))}
            </div>)}
          <Link className='link' onClick={() => handleLinkClick('Setting')} to={`/change_pass`}>
            <div className='menu_1'> <img src={setting} /> Change Pass</div>
          </Link>
        </div>
      )}
      <nav className="nav">
        <img src={add} height='40px' onClick={toggleCreate} />
        {isCreate && (
          <div ref={createClassRef} className="create-class-component">
            <p> <Link to='/join' style={{ textDecoration: 'none' }}>Join class</Link><br></br></p>
            <p><Link to='/create' style={{ textDecoration: 'none' }}>Create class</Link></p>
          </div>
        )}
        <ul className="nav-list">
          {isLoggedIn ? (
            <>
              <li>
                <span>Hi ! {fullName}</span>
              </li>
              <li>
                <Link to='/login' onClick={handleLogout} style={{ textDecoration: 'none' }}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to='/login' style={{ textDecoration: 'none' }}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
