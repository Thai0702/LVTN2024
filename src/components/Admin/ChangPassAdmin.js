import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import { BE_URL } from '../../utils/Url_request';
import './css/ChangePass.css';

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
                        'Authorization': 'Bearer ' + token 
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
            <NavbarAdmin />
            <div className='container-changepass'>
                <div className='tdmk'>
                <p>Thay đổi mật khẩu</p>
                <div className="form-group">
                    <label>Nhập mật khẩu cũ:</label>
                    <input 
                        type='password'
                        placeholder='Old Password'
                        name='oldPassword'
                        onChange={handleInputChange}
                        value={changepass.oldPassword}
                    />
                </div>
                <div className="form-group">
                    <label>Nhập mật khẩu mới:</label>
                    <input 
                        type='password'
                        placeholder='New Password'
                        name='newPassword'
                        onChange={handleInputChange}
                        value={changepass.newPassword}
                    />
                </div>
                <div className="form-group">
                    <label>Nhập lại mật khẩu:</label>
                    <input 
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmNewPassword'
                        onChange={handleInputChange}
                        value={changepass.confirmNewPassword}
                    />
                </div>
                <button onClick={changePass}>Change</button>
            </div>
            </div>
        </div>
    );
}

export default ChangPassAdmin;
