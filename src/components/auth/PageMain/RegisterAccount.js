import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

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
    // Kiểm tra các trường rỗng trước khi gửi yêu cầu đăng ký
    if (!username || !password || !phone || !fullname) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/authenticate/register', {
        username: username,
        password: password,
        fullname: fullname,
        phone: phone
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
        setError('Đăng ký không thành công.');
      }
    } catch (error) {
      setError('Đăng ký không thành công.');
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
