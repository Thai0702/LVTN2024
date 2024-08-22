import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';

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
            console.log("Sending request with data:", changePass); 
            const response = await axios.post(`${BE_URL}/api/authenticate/reset-password`, {
                username: changePass.username,
                otp: changePass.otp,
                newPassword: changePass.newPassword,
            });
            if (response.status === 200) {
                window.alert("Thay đổi mật khẩu thành công");
                navigate('/login'); 
            } else {
                window.alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
        } catch (error) {
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
                if (error.response.status === 403) {
                    window.alert("Yêu cầu bị từ chối. Vui lòng kiểm tra thông tin và thử lại.");
                } else {
                    window.alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
                }
            } else if (error.request) {

                console.error("Request data:", error.request);
                window.alert("Không nhận được phản hồi từ máy chủ. Vui lòng thử lại sau.");
            } else {

                console.error("Error message:", error.message);
                window.alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
            console.error("Error config:", error.config);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Đổi mật khẩu !</h3>
                        <div className="form-group">
                            <label>Email xác nhận :</label>
                            <input
                                type='text'
                                className="form-control"
                                name='username'
                                value={changePass.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nhập OTP:</label>
                            <input
                                type='text'
                                name='otp'
                                className="form-control"
                                value={changePass.otp}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu mới:</label>
                            <input
                                type='password'
                                className="form-control"
                                name='newPassword'
                                value={changePass.newPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleChangePass}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPass;
