import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { BE_URL } from '../../utils/Url_request';

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null); 
  const navigate = useNavigate();


  const handleLogin = async () => {
    if (!username || !password) {
      setError('Vui lòng nhập đủ thông tin !');
      return;
    }
    try {
      const response = await axios.post(`${BE_URL}/api/authenticate/login`, {
        username: username,
        password: password
      });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        console.log(token);
        const userIdResponse = await axios.get(`${BE_URL}/api/account/token-detail`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("hello",userIdResponse);
        const userId = userIdResponse.data;  
        setUserId(userId);
         
        console.log("chao", userId);   
        const { fullName } = userId;
        const {accountId} =userId;
        const {type}=userId; // Tách giá trị fullName từ userId
        console.log("fullName:", fullName); // In giá trị fullName vào console
        // Sử dụng giá trị fullName ở đây, ví dụ: hiển thị trên giao diện
        localStorage.setItem('accountId', accountId); 
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('type',type);
        console.log("chao type", type);
        if(type==='ADMIN')
          {
            navigate('/admin');
          }
          else{
            navigate('/');
          }
      } else {
        setError('Đăng nhập không thành công.');
      }
    } catch (error) {
      setError('Đăng nhập không thành công.');
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Đăng nhập</h2>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" value={username} onChange={(e) => setEmail(e.target.value)} placeholder='Nhập email của bạn'/>
              </div>
              <div className="form-group">
                <label>Mật khẩu:</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Nhập mật khẩu của bạn'/>
              </div>
              <button className="btn btn-primary" onClick={handleLogin}>Đăng nhập</button>
              {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </div>
            <p className="mt-3">Không có tài khoản? <Link to="/register"> Đăng ký ngay!</Link></p>
            <p className="mt-3"> <Link to="/forgot_pass">Forgot mật khẩu! </Link></p>
          </div>
        </div>
      </div>    
    </div>
  );
};

export default Login;
