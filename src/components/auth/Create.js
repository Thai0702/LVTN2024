import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './main.css';
import { Link, useNavigate } from 'react-router-dom';
const Create = () => {
  const navigate = useNavigate();
  const [classData, setClassData] = useState({
    subjectName: '',
    schoolYear: '',
    numberOfGroup: '',
    memberPerGroup: '',
    groupRegisterMethod: ''
  });
  const [users, setUsers] = useState([]);
  const [classList, setClassList] = useState([]);

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const groupSelection = classData.groupRegisterMethod === 'STUDENT' || classData.groupRegisterMethod === 'TEARCH' ? classData.groupRegisterMethod : 'RANDOM11';


      // Lấy token từ localStorage
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8080/api/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token // Thêm token vào header
        },
        body: JSON.stringify({ ...classData, group_register_method: groupSelection })
      });

      const data = await response.json();
      console.log(data);

      setClassList([...classList, data]);
      window.alert("Add class success!")
      navigate('/');
      window.location.reload(false);
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/account');
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/class');
        const classData = await response.json();
        setClassList(classData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchClasses();
  }, [classList]); // Chạy lại effect khi classList thay đổi

  return (
    <div>
      <Navbar />
      <div className='container-create'>
        <p>Create class!</p>
        <input type='text' placeholder='Class name' className='input' name='subjectName' value={classData.subjectName} onChange={handleChange}></input>
        <input type='text' placeholder='Year' className='input' name='schoolYear' value={classData.schoolYear  } onChange={handleChange}></input>
        <input type='text' placeholder='Number group' className='input' name='numberOfGroup' value={classData.numberOfGroup} onChange={handleChange}></input>
        <input type='text' placeholder='Number person of group' className='input' name='memberPerGroup' value={classData.memberPerGroup} onChange={handleChange}></input>
        <select className='input' name='groupRegisterMethod' value={classData.groupRegisterMethod} onChange={handleChange}>
          <option value='STUDENT'>Sinh viên chọn nhóm</option>
          <option value='TEARCH'>Giảng viên chọn nhóm</option>
          <option value='RANDOM'>Random</option>
        </select>
        <button className='button-create' onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

export default Create;
