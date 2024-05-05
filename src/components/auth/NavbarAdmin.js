import React, { useState, useEffect, useRef } from 'react';
import './Login.css'; // Import file CSS cho Header
import Account from '../Admin/Account';
function Navbar() {
  const [isAccount, setIsAccount] = useState(true);


  const toggleAccout = () => {
    setIsAccount(!isAccount);
  };
  return (
    <header className="header">

      <div className="additional-components">
        <div className='menu_1' onClick={toggleAccout}> Management Account
        </div>
        {isAccount && (
          <div>
          </div>
        )}
        <div className='menu_1'> Management Class</div>
        <div className='menu_1'>Management Student</div>
        <div className='menu_1'> Management Group</div>
      </div>
      {/* <nav className="nav">
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
      </nav> */}
    </header>
  );
}
export default Navbar;
