import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { BE_URL } from '../../../utils/Url_request';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullname, setFullName] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !phone || !fullname) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    const usernamePattern = /^[a-zA-Z0-9._]+@gmail.com$/; 
    if (!usernamePattern.test(username)) {
      setError('Tên đăng nhập không được chứa ký tự đặc biệt.');
      return;
    }
    const phonePattern = /^\d+$/;
    if (!phonePattern.test(phone)) {
      setError('Số điện thoại chỉ được chứa các chữ số.');
      return;
    }
    if (password.length < 8) {
      setError('Mật khẩu ít nhât 8 ký tự.');
      return;
    }
    if (phone.length !== 10) {
      setError('Số điện thoại phải có 10 số.');
      return;
    }
    try {
      const response = await axios.post(`${BE_URL}/api/authenticate/register`, {
        username: username,
        password: password,
        fullname: fullname,
        phone: phone
      });
     
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        const userIdResponse = await axios.get(`${BE_URL}/api/account/token-detail`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userId = userIdResponse.data;  
        setUserId(userId);
        localStorage.setItem('userId', userId);    
        const { fullName } = userId;
        localStorage.setItem('fullName', fullName);
        console.log("chao", userId);   
        const {accountId} =userId; 
        localStorage.setItem('accountId', accountId); 
        const {type}=userId;
        localStorage.setItem('type',type);
        navigate('/');
      } else {
        setError('Đăng ký thất bại.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Email đã tồn tại.');
      } else {
        setError('Đã xảy ra lỗi khi đăng ký.');
      }
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Đăng ký</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Mật khẩu:</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Số điện thoại:</label>
                  <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Họ tên:</label>
                  <input type="text" className="form-control" value={fullname} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <button className="btn btn-primary" type="submit">Đăng ký</button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
              </form>
            </div>
            <p className="mt-3">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
