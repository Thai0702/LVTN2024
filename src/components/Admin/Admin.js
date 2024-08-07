import React, { useState, useEffect } from 'react';
import "./css/admin.css";
import NavbarAdmin from "./NavbarAdmin"
import { useParams } from 'react-router-dom';

const Admin = () => {

    return (
        <div>
            <NavbarAdmin />
        </div>
    );
};

export default Admin;
