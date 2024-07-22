import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass'
import project from '../PageMain/css/project.css'
const Project = () => {
    const navigate = useNavigate();
    const createClassRef = useRef();
    const { classId } = useParams();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    /*add project */
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
                `${BE_URL}/api-gv/project/create-project`,
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
                navigate(`/group/${classId}`);
            }
        } catch (error) {
            window.alert("Add fail !");
        }
    };
    // hiển thị group của lớp
    const [grouptList, setGroupList] = useState([]);
    useEffect(() => {
        // Fetch the list of students
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/api-gv/classId/group-list/${classId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                setGroupList(data);
            })

            .catch(error => console.error('Error fetching student list:', error));
    }, [classId]);



    return (
        <div>
          <Navbar />
          <DetailClass />
          <div ref={createClassRef} className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 col-md-6">
                <div className='taobaocao'>
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">TẠO DỰ ÁN</h2>
                      <div className="mb-3">
                        <input
                          type='text'
                          className="form-control"
                          value={project_name}
                          placeholder='Tên đồ án'
                          onChange={(e) => setProjectName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type='text'
                          className="form-control"
                          placeholder='Mô tả'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type='date'
                          className="form-control"
                          placeholder='Ngày tạo'
                          value={expired_day}
                          onChange={(e) => setExpiredDay(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type='time'
                          className="form-control"
                          placeholder='Thời gian hết hạn'
                          value={expired_time}
                          onChange={(e) => setExpiredTime(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <select
                          className="form-control"
                          onChange={(e) => setProjectOfGroup(e.target.value)}
                          value={project_of_group}
                        >
                          <option value="">Chọn nhóm</option>
                          {grouptList.map((group) => (
                            <option key={group.groupId} value={group.groupId}>
                              {group.groupName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button className="btn btn-primary" type='submit' onClick={handleAddProject}>
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
      

    
}

export default Project;
