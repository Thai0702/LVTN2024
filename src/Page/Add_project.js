import React, { useRef, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/auth/Navbar';

const AddProject  = () => {

    const [grouptList, setGroupList] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const createClassRef = useRef();
    const [project_name, setProjectName] = useState('');
    const [project_of_group, setProjectOfGroup] = useState('');
    const [description, setDescription] = useState('');
    const [expired_day, setExpiredDay] = useState('');
    const [expired_time, setExpiredTime] = useState('');
    const handleAddProject = async (e) => {
        e.preventDefault();
        // Kiểm tra không được bỏ trống các trường
        if (!project_name || !project_of_group || !description || !expired_day || !expired_time) {
          window.alert('Vui lòng điền đủ thông tin.');
          return;
        }
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(
            `http://localhost:8080/api/project/create-project`,
            {
              projectName: project_name,
              projectOfGroup: project_of_group,
              projectDescription: description,
              expiredDay: expired_day,
              // expiredTime: formatTime(expired_time)
              expiredTime: expired_time
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token // Thêm token vào header
              }
            }
          );
          if (response.status === 200) {
            // Đặt lại các trường nhập
            setProjectName('');
            setProjectOfGroup('');
            setDescription('');
            setExpiredDay('');
            setExpiredTime('');
            window.alert("Project created successfully !");
          }
        } catch (error) {
          window.alert("Add fail !");
        }
      };

    return (
        <div>
            <Navbar />
            <div ref={createClassRef} className='container-create-project'>
            <form onSubmit={handleAddProject}>
              <input
                type='text'
                placeholder='Tên đồ án'
                className='input'
                value={project_name}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <select onChange={(e) => setProjectOfGroup(e.target.value)} value={project_of_group}>
                <option value=''>Select Group</option>
                {grouptList.map((group) => (
                  <option key={group.group_id} value={group.group_id}>
                    {group.groupId}
                  </option>
                ))}
              </select>
              <input
                type='text'
                placeholder='Mô tả'
                className='input'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type='date'
                placeholder='CreateDay'
                className='input'
                value={expired_day}
                onChange={(e) => setExpiredDay(e.target.value)}
              />
              <input
                type='time'
                placeholder='Thời gian hết hạn'
                className='input'
                value={expired_time}
                onChange={(e) => setExpiredTime(e.target.value)}
              />
              {error && <div className="error">{error}</div>}
              {successMessage && <div className="success">{successMessage}</div>}
              <button className='btn btn-primary' type='submit' onClick={handleAddProject}>
                Add project
              </button>
            </form>
          </div>
        </div>
    )
}

export default AddProject;