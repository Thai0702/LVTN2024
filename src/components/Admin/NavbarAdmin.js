import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import home from './imgAdmin/home.png';
import menu from './imgAdmin/menu.png';
import account from './imgAdmin/account.png'
import setting from './imgAdmin/setting.png'
import arrow from './imgAdmin/arrow.png'
function NavbarAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [projectText, setProjectText] = useState('Hỗ trợ giảng viên'); // State variable for project text
  const [isSetting, setIsSetting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Trạng thái đăng nhập
  const [username, setUsername] = useState(''); // Tên người dùng
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUsername = localStorage.getItem('username');

    if (userLoggedIn === 'true' && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  };
  const togglesetting = () => {
    setIsSetting(!isSetting);
  }
  const fullName = localStorage.getItem('fullName');
  // Chạy lại effect khi classList thay đổi
  const handleLinkClick = (text) => {
    setProjectText(text);
    setIsMenuOpen(true);
  };


  return (
    <header className="header">

      <div className="logo" onClick={toggleMenu}>
        <img src={menu} /> {projectText} {/* Dynamic project text */}
      </div>


      {isMenuOpen && (
        <div className="additional-components">
          <Link to='/homAdmin' className='link' onClick={() => handleLinkClick('Home')}>
            <div className='menu_1'> <img src={home} /> Home</div>
          </Link>
          <Link className='link' onClick={() => handleLinkClick('Account')} to='/listAccount'>
            <div className='menu_1' ><img src={account} /> Account </div>
          </Link>
          {/* <Link className='link' onClick={() => handleLinkClick('Class')} to='/listClass'>
            <div className='menu_1'><img src={classAdmin} /> Class</div>
          </Link>
          <Link className='link' onClick={() => handleLinkClick('Group')} to='/listGroup'>
            <div className='menu_1'><img src={group} />Group</div>
          </Link>
          <Link className='link' onClick={() => handleLinkClick('Project')} to='/listProject'>
            <div className='menu_1'><img src={project} />Project</div>
          </Link>
          <Link className='link' onClick={() => handleLinkClick('Report')} to='/listReport'>
            <div className='menu_1'><img src={report} />Report</div>
          </Link> */}
          <Link className='link' onClick={() => handleLinkClick('Setting')}>
            <div className='menu_1' onClick={togglesetting}><img src={setting} />Setting</div>
          </Link>
          {isSetting && (
            <Link to={`/changepassAdmin`} className='link' onClick={() => handleLinkClick('Change password')}>
              <div className='class-list-teach'>
                <img src={arrow} /> Change password
              </div></Link>
          )}
        </div>
      )}
      <nav className="nav">
        <ul className="nav-list">
          {isLoggedIn ? (
            <>
              <li>
                <span>Hi !{fullName}</span>
              </li>
              <li>
                {/* <Link to='/login' onClick={handleLogout} style={{ textDecoration: 'none' }}>
                  Đăng xuất
                </Link> */}
                <Link to='/regiterAdmin' style={{ textDecoration: 'none' }}>
                  Đăng ký
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to='/login' style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default NavbarAdmin;
