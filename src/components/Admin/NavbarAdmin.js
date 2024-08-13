import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import home from './imgAdmin/home.png';
import menu from './imgAdmin/menu.png';
import account from './imgAdmin/account.png'
import setting from './imgAdmin/setting.png'
import arrow from './imgAdmin/arrow.png'
import dot from './imgAdmin/dot.png'
import change from './imgAdmin/change.png'


function NavbarAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [projectText, setProjectText] = useState('Hỗ trợ giảng viên'); 
  const [isSetting, setIsSetting] = useState(false);
  const [isAccount, setIsAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [username, setUsername] = useState(''); 
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUsername = localStorage.getItem('username');

    if (userLoggedIn === 'true' && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(isMenuOpen);
  };
  const toggleAccount = () => {
    setIsAccount(!isAccount);

  };
  const togglesetting = () => {
    setIsSetting(!isSetting);
  }
  const fullName = localStorage.getItem('fullName');

  const handleLinkClick = (text) => {
    setProjectText(text);
    setIsMenuOpen(true);
  };


  return (
    <header className="header">

      <div className="logo" onClick={toggleMenu}>
        <img src={menu} /> {projectText} 
      </div>


      {isMenuOpen && (
        <div className="additional-components">
          <Link to='/homAdmin' className='link' onClick={() => handleLinkClick('Home')}>
            <div className='menu_1'> <img src={home} /> Home</div>
          </Link>
          <Link className='link'>
            <div className='menu_1' onClick={toggleAccount}><img src={account} /> Account </div>
          </Link>
          {isAccount && (
            <>
              <Link to="/accountTearch" className="link">
                <div className="class-list-teach">
                  <img src={dot} alt="Arrow" />
                  Account Tearch
                </div>
              </Link>
              <Link to="/accountStudent" className="link">
                <div className="class-list-teach">
                  <img src={dot} alt="Arrow" />
                  Account Student
                </div>
              </Link>
            </>
          )}
          <Link className='link' onClick={() => handleLinkClick('Setting')}>
            <div className='menu_1' onClick={togglesetting}><img src={setting} />Setting</div>
          </Link>
          {isSetting && (
            <Link to={`/changepassAdmin`} className='link' onClick={() => handleLinkClick('Change password')}>
              <div className='class-list-teach'>
                <img src={change} /> Change password
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