import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullname, setFullName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/authenticate/register', {
        username: username,
        password: password,
        fullname: fullname,
        phone: phone
      });

      const { token } = response.data; // Lấy token từ phản hồi của server

      // Lưu token vào localStorage
      localStorage.setItem('token', token);

      // Chuyển hướng đến trang đăng nhập
      navigate("/");
    } catch (error) {
      setError('Đã có lỗi xảy ra');
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
