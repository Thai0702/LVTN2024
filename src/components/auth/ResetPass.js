import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BE_URL } from '../../utils/Url_request';

const ResetPass = () => {
    const [changePass, setChangePass] = useState({
        username: '',
        otp: '',
        newPassword: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChangePass({
            ...changePass,
            [name]: value,
        });
    };

    const handleChangePass = async () => {
        if (!changePass.username || !changePass.otp || !changePass.newPassword) {
            window.alert("Vui lòng điền đủ thông tin");
            return;
        }
        try {
            console.log("Sending request with data:", changePass); // Log the data being sent
            const response = await axios.post(`${BE_URL}/api/authenticate/reset-password`, {
                username: changePass.username,
                otp: changePass.otp,
                newPassword: changePass.newPassword,
            });
            if (response.status === 200) {
                window.alert("Thay đổi mật khẩu thành công");
                navigate('/login'); // Navigate to the login page
            } else {
                window.alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code outside the range of 2xx
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
                if (error.response.status === 403) {
                    window.alert("Yêu cầu bị từ chối. Vui lòng kiểm tra thông tin và thử lại.");
                } else {
                    window.alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Request data:", error.request);
                window.alert("Không nhận được phản hồi từ máy chủ. Vui lòng thử lại sau.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
                window.alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
            console.error("Error config:", error.config);
        }
    };

    return (
        <div>
            <input
                type='text'
                placeholder='Email here'
                name='username'
                value={changePass.username}
                onChange={handleInputChange}
            />
            <input
                type='text'
                placeholder='Otp'
                name='otp'
                value={changePass.otp}
                onChange={handleInputChange}
            />
            <input
                type='password'
                placeholder='New Password'
                name='newPassword'
                value={changePass.newPassword}
                onChange={handleInputChange}
            />
            <button onClick={handleChangePass}>Reset Password</button>
        </div>
    );
};

export default ResetPass;
