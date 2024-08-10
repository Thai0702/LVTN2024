import React, { useState, useEffect } from 'react';
import Navbar from "../Home/Navbar";
import "./css/main.css";
import { Link, useNavigate } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import { createClass } from '../../../services/apiServiceClass';
// import axios from 'axios';
const Create = () => {
  const navigate = useNavigate();
  const [classData, setClassData] = useState({
    subjectName: '',
    schoolYear: '',
    description: '',
    // numberOfGroup: '',
    // memberPerGroup: '',
    // groupRegisterMethod: ''
  });
  const [users, setUsers] = useState([]);
  const [classList, setClassList] = useState([]);

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  // const handleCreate = async () => {
  //   for (const key in classData) {
  //     if (!classData[key]) {
  //       window.alert('Vui lòng điền đầy đủ thông tin.');
  //       return;
  //     }
  //   }
  //   try {
  //     // const groupSelection = classData.groupRegisterMethod === 'STUDENT' || classData.groupRegisterMethod === 'TEARCH' ? classData.groupRegisterMethod : 'RANDOM';


  //     // Lấy token từ localStorage
  //     const token = localStorage.getItem('token');

  //     const response = await fetch(`${BE_URL}/api-gv/class`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + token // Thêm token vào header
  //       },
  //       body: JSON.stringify({ ...classData })
  //     });

  //     const data = await response.json();
  //     console.log(data);

  //     setClassList([...classList, data]);
  //     window.alert("Tạo lớp môn học thành công!!!")
  //     navigate('/');
  //     window.location.reload(false);

  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const handleCreate = async () => {
    for (const key in classData) {
      if (!classData[key]) {
        window.alert('Vui lòng điền đầy đủ thông tin.');
        return;
      }
    }
    try {
      const data = await createClass(classData);
      setClassList([...classList, data]);
      window.alert("Tạo lớp môn học thành công!!!");
      navigate('/');
      window.location.reload(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BE_URL}/api-gv/account`);
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  // useEffect(() => {
  //   const fetchClasses = async () => {
  //     try {
  //       const response = await fetch(`${BE_URL}/api-gv/class`);
  //       const classData = await response.json();
  //       setClassList(classData);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchClasses();
  // }, [classList]); 

  return (
    <div>
      <Navbar />
      <div className="col-md-6">
        <div className="card">
          <h2>Tạo lớp môn học</h2>
          <div className="card-body">

            <div className="form-group">
              <label>Tên lớp môn học: </label>
              <input type='text'
                className="form-control" name='subjectName'
                value={classData.subjectName}
                onChange={handleChange}></input>
            </div>
            <div className="form-group">
              <label>Học kỳ - năm học: </label>
              <input type='text'
                className="form-control" name='schoolYear'
                value={classData.schoolYear} onChange={handleChange}></input>
            </div>
            <div className="form-group">
              <label>Mô tả: </label>
              <textarea
                className="form-control" name='description'
                value={classData.description} onChange={handleChange}></textarea>
            </div>
            <button className="btn btn-primary" onClick={handleCreate}>Tạo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
