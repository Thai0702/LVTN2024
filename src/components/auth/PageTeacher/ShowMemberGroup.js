import React, { useState, useEffect } from 'react';
import { BE_URL } from '../../../utils/Url_request';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass'
import '../Login.css'; 

const GroupList = () => {
  const { classId, groupId,projectId } = useParams();
  const [members, setMembers] = useState([]);
  const [maxMembers, setMaxMembers] = useState(0);
  const [currentMembers, setCurrentMembers] = useState(0);
  const navigate = useNavigate();
  const type=localStorage.getItem('type');
  const memberPerGroup = parseInt(localStorage.getItem('memberPerGroup'), 10);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      console.error('No token found');
      return;
    }

    fetch(`${BE_URL}/api/class/${classId}/group/${groupId}/students`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setMembers(data);
        setCurrentMembers(data.length);
        setMaxMembers(memberPerGroup);
      })
      .catch(error => console.error('Error fetching members:', error));
  }, [classId, groupId, memberPerGroup]);

  const joinGroup = async () => {
    if (currentMembers >= maxMembers) {
      window.alert("Nhóm đã đủ thành viên");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const response = await fetch(`${BE_URL}/api/class/group/add-member/${classId}/${groupId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.status === 200) {
        window.alert("Join nhóm thành công !");
        window.location.reload(false);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        window.alert("Join thất bại: " + errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      window.alert("Vui lòng kiểm tra ! Lỗi khi join.");
    }
  };

  // get list project of group
  const [listProject, setListProject] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fettListProject = async () => {
      try {
        const respone = await fetch(`${BE_URL}/api-gv/group/projects/${groupId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });
        if (!respone.ok) {
          throw new Error("Network response not ok");
        }
        const data = await respone.json();
        setListProject(data);
      }
      catch (error) {
        console.log("error to fetching", error);
      }

    };
    fettListProject();
  },)
  // delete project og group
  const handleDeleteProject = async (projectId) => {
    if (!projectId) {
      console.error('Project ID is missing or undefined');
      window.alert('Project ID is missing or undefined');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      window.alert('No token found');
      return;
    }

    const confirmed = window.confirm("Bạn có chắc muốn xóa project này không?");
    if (!confirmed) {
      // Do not delete if user does not confirm
      return;
    }

    try {
      const responseDelete = await fetch(`${BE_URL}/api-gv/project/delete/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      if (responseDelete.ok) {
        // Remove project from list if deletion is successful
        setListProject(listProject.filter(project => project.projectId !== projectId));
        window.alert('Xóa project thành công.');
      } else {
        const errorData = await responseDelete.json();
        console.error('Error deleting project:', errorData.message);
        window.alert('Xảy ra lỗi khi xóa project: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      window.alert('Xảy ra lỗi khi xóa project.');
    }
  };
  // upload project
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    projectName: '',
    projectOfGroup: groupId,
    projectDescription: '',
    expiredDay: '',
    expiredTime: ''
  });
  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    try {
      const response = await fetch(`${BE_URL}/api-gv/project/update/${updateData.projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(updateData),
      });
      if (response.ok) {
        // Cập nhật trực tiếp danh sách lớp sau khi cập nhật thành công
        setListProject(prevList =>
          prevList.map(item =>
            item.subjectClassId === updateData.projectId ? updateData : item
          )
        );
        setUpdateData({
          projectName: '',
          projectOfGroup: groupId,
          projectDescription: '',
          expiredDay: '',
          expiredTime: ''
        });
        setShowUpdateForm(false); // Ẩn form cập nhật sau khi cập nhật thành công
      } else {
        console.error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };
  const handleUpdate = (classItem) => {
    setUpdateData(classItem);
    setShowUpdateForm(true); // Hiển thị form cập nhật khi nhấp vào "Cập nhật"
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  return (
    <div>
      <Navbar/>
      <DetailClass/>
      <h1>Group Member</h1>
      <button onClick={joinGroup}>Tham Gia Nhóm</button>
      
      <Link className='link' to={`/createReport/${classId}/${groupId}`}> <button>Tạo Báo Cáo</button></Link>
    
      <div className='works'>
        <p className='dsshow'>List Member Group</p>
        <ul>
          {members.map(member => (
            <li key={member.groupId}>{member.memberName}</li>
          ))}
        </ul>

        <ul>
          <p className='dsshow'>Project Of Group</p>
          {listProject.map(project => (
            <li key={project.projectId}>
              <p>Tên đồ án: {project.projectName}<br /> Ngày hết hạn: {project.expiredDay}<br />Thời gian hết hạn:{project.expiredTime}
              </p>
              <div className=''>
                <button onClick={() => handleDeleteProject(project.projectId)} >Delete</button>
                <button onClick={() => handleUpdate(project)} >Update</button>
              </div>
              {showUpdateForm && updateData.projectId === project.projectId && (
                <div className="update-form">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="projectName"
                      value={updateData.projectName}
                      onChange={handleInputChange}
                      placeholder="Tên đồ án"
                    />
                    <input
                      type="text"
                      name="projectDescription"
                      value={updateData.projectDescription}
                      onChange={handleInputChange}
                      placeholder="Mô tả"
                    />
                    <input
                      type="date"
                      name="expiredDay"
                      value={updateData.expiredDay}
                      onChange={handleInputChange}
                      placeholder="Ngày hết hạn"
                    />
                    <input
                      type="time"
                      name="expiredTime"
                      value={updateData.expiredTime}
                      onChange={handleInputChange}
                      placeholder="Thời gian hết hạn"
                    />
                    <button type="submit">Lưu</button>
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupList;
