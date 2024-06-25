import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './main.css';
import { Link, useNavigate } from 'react-router-dom';
import { BE_URL } from '../../utils/Url_request';
import axios from 'axios';
const Create = () => {
  const navigate = useNavigate();
  const [classData, setClassData] = useState({
    subjectName: '',
    schoolYear: '',
    // numberOfGroup: '',
    // memberPerGroup: '',
    // groupRegisterMethod: ''
  });
  const [users, setUsers] = useState([]);
  const [classList, setClassList] = useState([]);

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    for (const key in classData) {
      if (!classData[key]) {
        window.alert('Vui lòng điền đầy đủ thông tin.');
        return;
      }
      // Kiểm tra các trường numberOfGroup và memberPerGroup
      // if (isNaN(parseInt(classData.numberOfGroup)) || parseInt(classData.numberOfGroup) <= 0) {
      //   window.alert('Số lượng nhóm lớn hơn 0.');
      //   return;
      // }
      // if (isNaN(parseInt(classData.memberPerGroup)) || parseInt(classData.memberPerGroup) <= 0) {
      //   window.alert('Số thành viên mỗi nhóm lớn hơn 0.');
      //   return;
      // }
      // if (key === 'numberOfGroup' || key === 'memberPerGroup') {
      //   if (isNaN(classData[key])) {
      //     window.alert('Số lượng nhóm và số thành viên mỗi nhóm phải là số.');
      //     return;
      //   }
      // }
    }
    try {
      const groupSelection = classData.groupRegisterMethod === 'STUDENT' || classData.groupRegisterMethod === 'TEARCH' ? classData.groupRegisterMethod : 'RANDOM';


      // Lấy token từ localStorage
      const token = localStorage.getItem('token');

      const response = await fetch(`${BE_URL}/api-gv/class`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token // Thêm token vào header
        },
        body: JSON.stringify({ ...classData})
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
        const response = await fetch(`${BE_URL}/api-gv/account`);
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
        const response = await fetch(`${BE_URL}/api-gv/class`);
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
        <input type='text' placeholder='Tên lớp môn học' className='input' name='subjectName' value={classData.subjectName} onChange={handleChange}></input>
        {/* <input type='text' placeholder='Tên giảng viên' className='input' name='fullNameCreate' value={classData.fullNameCreate} onChange={handleChange}></input> */}
        <input type='text' placeholder='Năm học' className='input' name='schoolYear' value={classData.schoolYear} onChange={handleChange}></input>
        {/* <input type='text' placeholder='Số lượng nhóm trong lớp' className='input' name='numberOfGroup' value={classData.numberOfGroup} onChange={handleChange}></input>
        <input type='text' placeholder='Số lượng thành viên nhóm' className='input' name='memberPerGroup' value={classData.memberPerGroup} onChange={handleChange}></input>
        <select className='input' name='groupRegisterMethod' value={classData.groupRegisterMethod} onChange={handleChange}>
          <option value=''>Chọn phương thức tạo nhóm</option>
          <option value='Student'>Sinh viên chọn nhóm</option>
          <option value='Tearch'>Giảng viên chọn nhóm</option>
          <option value='RANDOM'>Random</option>
        </select> */}
        <button className='button-create' onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

export default Create;
