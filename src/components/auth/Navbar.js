import React, { useState } from 'react';
import './Login'; // Import file CSS cho Header
import { Link } from 'react-router-dom';
import menu from './img/menu.png'; // Import the image
import home from './img/home.png'; 
import setting from './img/setting.png'; 
import teach from './img/teach.png'; 
import add from './img/add.png'
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isCreate ,setIsCreate] =useState(false);
  const toggleCreate =()=>{
    setIsCreate(!isCreate);
  }

  return (
    <header className="header">
     <Link to='/' className='link'> <div className="logo" > {/* Toggle menu on click */}
        <img src={menu} alt="Menu" onClick={toggleMenu}/> Project
      </div></Link>
   
   {isMenuOpen && (
        <div className="additional-components">
          {/* Your additional components go here */}
         <Link to='/' className='link'> <div className='menu_1'><img src={home} /> Home</div></Link>
         <Link to='/teach' className='link'><div className='menu_1'> <img src={teach}/>Teaching</div></Link>
         <Link to='/setting' className='link'> <div className='menu_1'> <img src={setting}/>Setting</div></Link>
        </div>
      )}
      <nav className="nav">
        <img src={add} height='40px' onClick={toggleCreate}/>
        {isCreate && (
        <div className="create-class-component">
          {/* Your additional components go here */}
         <p> <Link to='/join' style={{ textDecoration: 'none' }}>Join class</Link><br></br></p>
          <p><Link to='/create'style={{ textDecoration: 'none' }}>Create class</Link></p>
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
