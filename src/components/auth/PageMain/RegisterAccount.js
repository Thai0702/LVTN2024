import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [user_email, setUserEmail] = useState('');
  const [user_password, setUserPassword] = useState('');
  const [user_type, setUserType] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [full_name, setFullName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user_email || !user_password || !user_type || !phone_number || !full_name) {
      setError('Vui lòng điền đủ thông tin');
      return;
    }
    //http://localhost:3000/
    //http://localhost:8080/api/account
    try {
      const response = await axios.post('http://localhost:8080/api/account', {
        user_email: user_email,
        user_password: user_password,
        user_type: user_type,
        phone_number: phone_number,
        full_name: full_name
      });
  
      if (response.status === 200) {
        navigate("/login", { replace: true }); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      } else {
        setError('Lỗi đăng ký ');
      }
    } catch (error) {
      setError('Lỗi đăng ký');
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
                  <input type="email" className="form-control" value={user_email} onChange={(e) => setUserEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Mật khẩu:</label>
                  <input type="password" className="form-control" value={user_password} onChange={(e) => setUserPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Người dùng:</label>
                  <input type="text" className="form-control" value={user_type} onChange={(e) => setUserType(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Số điện thoại:</label>
                  <input type="text" className="form-control" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Họ tên:</label>
                  <input type="text" className="form-control" value={full_name} onChange={(e) => setFullName(e.target.value)} />
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
