import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BE_URL } from '../../utils/Url_request';

const ForgotPass = () => {
    const [resetPass, setResetPass] = useState({
        username: '',
    });
    const navigate = useNavigate();

    const handInputChange = (e) => {
        const { name, value } = e.target;
        setResetPass({
            ...resetPass,
            [name]: value,
        });
    };

    const handleReset = async () => {
        if (!resetPass.username) {
            window.alert("Vui lòng điền vào email");
            return;
        }
        try {
            const response = await axios.post(`${BE_URL}/api/authenticate/forgot-password`, {
                username: resetPass.username,
            });

            if (response.status === 200) {
                window.alert("Mã OTP đã được gửi tới email của bạn");
                navigate('/reset_pass'); // Navigate to the OTP entry page
            } else {
                window.alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
        } catch (error) {
            window.alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <div>Forgot Password</div>
                <input
                    type='text'
                    placeholder='Email here'
                    name='username'
                    value={resetPass.username}
                    onChange={handInputChange}
                />
                <button onClick={handleReset}>Submit</button>
            </div>
        </div>
    );
};

export default ForgotPass;
