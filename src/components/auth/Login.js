import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user_email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!user_email || !user_password) {
      setError('Vui lòng nhập đủ thông tin !');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/account', {
        user_email: user_email,
        user_password: user_password
      });
      
      if (response.status === 200) {
        navigate("/", { replace: true });
      } else {
        setError('Không hợp lê.');
      }
    } catch (error) {
      setError('Không hợp lệ');
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
                <input type="email" className="form-control" value={user_email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Mật khẩu:</label>
                <input type="password" className="form-control" value={user_password} onChange={(e) => setPassword(e.target.value)} />
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
