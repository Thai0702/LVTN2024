import axios from 'axios';
import React, { useState } from 'react';
import { BE_URL } from '../../../utils/Url_request';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Home/Navbar";


const ChangePass = () => {
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
            navigate('/');
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
            <Navbar />
            <div className="col-md-10">
                <div className='changepass'>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Đổi mật khẩu</h2>
                        <div className="form-group">
                            <label>Nhập lại mật khẩu cũ </label>
                            <input
                                type='password'
                                className="form-control"
                                name='oldPassword'
                                onChange={handleInputChange}
                                value={changepass.oldPassword}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu mới </label>
                            <input
                                type='password'
                                className="form-control"
                                name='newPassword'
                                onChange={handleInputChange}
                                value={changepass.newPassword}
                            />
                        </div>
                        <div className="form-group">
                        <label>Nhập lại mật khẩu mới </label>
                            <input
                                type='password'
                                name='confirmNewPassword'
                                className="form-control"
                                onChange={handleInputChange}
                                value={changepass.confirmNewPassword}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={changePass}>Xác nhận</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePass;
