import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin'
import { BE_URL } from '../../../utils/Url_request';

const ChangPassAdmin = () => {
    const [changepass, setChangePass] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChangePass({
            ...changepass,
            [name]: value,
        });
    };

    const changePass = async () => {
        if (!changepass.oldPassword || !changepass.newPassword || !changepass.confirmNewPassword) {
            window.alert("Vui lòng điền đủ thông tin");
            return;
        }

        if (changepass.newPassword !== changepass.confirmNewPassword) {
            window.alert("Mật khẩu mới và xác nhận mật khẩu không khớp");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BE_URL}/api/authenticate/change-password`, 
                {
                    oldPassword: changepass.oldPassword,
                    newPassword: changepass.newPassword,
                    confirmNewPassword: changepass.confirmNewPassword
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token // Thêm token vào header
                    }
                }
            );
            console.log(response.data);
            window.alert("Changed successfully!");
            navigate('/homAdmin');
        } catch (error) {
            if (error.response && error.response.data) {
                window.alert(`Error: ${error.response.data}`);
            } else {
                window.alert("An error occurred while changing the password");
            }
            console.error("error", error);
        }
    };

  return (
    <div>
      <NavbarAdmin/>
      <p>Thay đôi mật khẩu</p>
            <input 
                type='password'
                placeholder='Old Password'
                name='oldPassword'
                onChange={handleInputChange}
                value={changepass.oldPassword}
            />
            <input 
                type='password'
                placeholder='New Password'
                name='newPassword'
                onChange={handleInputChange}
                value={changepass.newPassword}
            />
            <input 
                type='password'
                placeholder='Confirm Password'
                name='confirmNewPassword'
                onChange={handleInputChange}
                value={changepass.confirmNewPassword}
            />
            <button onClick={changePass}>Change</button>
    </div>
  )
}

export default ChangPassAdmin
