import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

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
      const response = await axios.post('http://localhost:8080/api/authenticate/login', {
        username: username,
        password: password
      });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        console.log(token);
        const userIdResponse = await axios.get('http://localhost:8080/api/authenticate/userId', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("hello",userIdResponse);
  
        const userIdString = userIdResponse.data;
        const userId = userIdString.split(':')[1];   
        setUserId(userId);
        localStorage.setItem('userId', userId);  
        console.log("chao", userId);   
        navigate('/');
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
                <input type="email" className="form-control" value={username} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Mật khẩu:</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={handleLogin}>Đăng nhập</button>
              {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </div>
            <p className="mt-3">Không có tài khoản? <Link to="/register">Đăng ký ngay!</Link></p>
          </div>
        </div>
      </div>    
    </div>
  );
};

export default Login;
