import React, { useState, useEffect, useRef } from 'react';
import './Login.css'; // Import file CSS cho Header
import { Link } from 'react-router-dom';
import menu from './img/menu.png'; // Import the image
import home from './img/home.png';
import setting from './img/setting.png';
import teach from './img/teach.png';
import add from './img/add.png';
import student from './img/student.png'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [projectText, setProjectText] = useState('Project'); // State variable for project text
  const [isCreate, setIsCreate] = useState(false);

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

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const groupSelection = classData.group_register_method === 'student' || classData.group_register_method === 'teacher' ? classData.group_register_method : 'random';
      const formattedDate = classData.create_at ? new Date(classData.create_at).toISOString().split('T')[0] : '';

      const response = await fetch('http://localhost:8080/api/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...classData, create_at: formattedDate, group_register_method: groupSelection })
      });

      const data = await response.json();
      console.log(data);

      setClassList([...classList, data]);

      setClassData({
        subject_name: '',
        create_by: '',
        create_at: '',
        school_year: '',
        number_of_group: '',
        member_per_group: '',
        group_register_method: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/class');
        const classData = await response.json();
        setClassList(classData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchClasses();
  }, [classList]); // Chạy lại effect khi classList thay đổi
  const handleLinkClick = (text) => {
    setProjectText(text); // Update project text when clicking on links
    setIsMenuOpen(true); // Close the menu when a link is clicked
  };

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  // Ref for the create class component
  const createClassRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createClassRef.current && !createClassRef.current.contains(event.target)) {
        setIsCreate(false);
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
        <div className="additional-components">
          <Link to='/' className='link' onClick={() => handleLinkClick('Home')}>
            <div className='menu_1'><img src={home} /> Home</div>
          </Link>
          <div className='menu_1'onClick={toggleTeaching}> <img src={teach} /> Teaching
          </div>
          {isTeachingOpen && (
          <div>
          
          <div className='class-list'>
          {classList.map((classItem) => (
              <li key={classItem.id}>
                <Link to={`/class/${classItem.subject_class_id}`}>{classItem.subject_name}</Link> {/* Sử dụng id của lớp */}
              </li>
            ))}
          </div>
        </div>
        )}
          <div className='menu_1'> <img src={student} /> Student</div>
          <div className='menu_1'> <img src={setting} /> Setting</div>
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
          <li><Link to='/register' style={{ textDecoration: 'none' }}>Đăng ký</Link></li>
          <li><Link to='/login' style={{ textDecoration: 'none' }}>Đăng nhập</Link></li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
