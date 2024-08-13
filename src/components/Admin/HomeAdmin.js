import React from 'react'
import NavbarAdmin from './NavbarAdmin'
import './css/admin.css'; 
const HomeAdmin = () => {
  return (
    <div>
      <NavbarAdmin />
      <div className='contianAdmin'>
      <h1 className='title'>Welcom to Admin page</h1>
      </div>
      
    </div>
  )
}

export default HomeAdmin
