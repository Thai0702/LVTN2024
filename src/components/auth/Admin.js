import React, { useState, useEffect } from 'react';
import './admin.css';
import NavbarAdmin from './NavbarAdmin.js'
import { useParams } from 'react-router-dom';
import Account from '../Admin/Account.js';

const Admin = () => {
    
    return (
        <div>
            <NavbarAdmin />
           <Account/>          
        </div>
    );
};

export default Admin;
