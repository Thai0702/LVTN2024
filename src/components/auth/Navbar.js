import React, { useState, useEffect, useRef } from 'react';
import './Login'; // Import file CSS cho Header
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
          <div className='menu_1'> <img src={teach} /> Teaching</div>
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
