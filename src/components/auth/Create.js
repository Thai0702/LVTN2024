import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './main.css';

const Create = () => {
  const [classData, setClassData] = useState({
    subject_name: '',
    create_by:'',
    school_year: '',
    number_of_group: '',
    member_per_group: '',
    group_register_method: ''
  });

  const [users, setUsers] = useState([]);
  const [classList, setClassList] = useState([]);

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const groupSelection = classData.group_register_method === 'student' || classData.group_register_method === 'teacher' ? classData.group_register_method : 'random';
      const formattedDate = classData.create_at ? new Date(classData.create_at).toISOString().split('T')[0] : '';

      const response = await fetch('http://localhost:8080/api/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...classData, create_at: formattedDate, group_register_method: groupSelection })
      });

      const data = await response.json();
      console.log(data);

      setClassList([...classList, data]);

      setClassData({
        subject_name: '',
        created_by:'',
        school_year: '',
        number_of_group: '',
        member_per_group: '',
        group_register_method: ''
      });
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
        <input type='text' placeholder='Class name' className='input' name='subject_name' value={classData.subject_name} onChange={handleChange}></input>
        {/* <select className='input' name='created_by' value={classData.created_by} onChange={handleChange}>
          <option value=''>Select creator</option>
          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>{user.user_email}</option>
          ))}
        </select> */}
        <input type='text' placeholder='Year' className='input' name='school_year' value={classData.school_year} onChange={handleChange}></input>
        <input type='text' placeholder='Number group' className='input' name='number_of_group' value={classData.number_of_group} onChange={handleChange}></input>
        <input type='text' placeholder='Create by' className='input' name='created_by' value={classData.created_by} onChange={handleChange}></input>
        <input type='text' placeholder='Number person of group' className='input' name='member_per_group' value={classData.member_per_group} onChange={handleChange}></input>
        <select className='input' name='group_register_method' value={classData.group_register_method} onChange={handleChange}>
          <option value='student'>Sinh viên tự chọn nhóm</option>
          <option value='teacher'>Giảng viên chọn nhóm</option>
          <option value='random'>Random nhóm</option>
        </select>
        <button className='button-create' onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

export default Create;
