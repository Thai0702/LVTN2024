import React, { useState, useEffect } from 'react';
import Navbar from '../components/auth/Navbar';
import { Link, useParams } from 'react-router-dom';
import add from "../components/auth/img/add.png"
import axios from 'axios';

const CreateGroup = () => {

/*Add group*/
const {classId} = useParams(); // Lấy classId từ URL
const [groupName, setgroupName] = useState('');
const [class_id, setClassId] = useState('');
const [group_name, setGroupName] = useState('');
const [leader_id, setLeaderid] = useState('');
const [error, setError] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [groupId, setGroupId] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  // Kiểm tra xem các trường đã được nhập đầy đủ chưa
  if (!leader_id || !group_name) {
    window.alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }
  // Kiểm tra leader_id và class_id phải là số
  if (isNaN(leader_id) || isNaN(class_id)) {
    window.alert('Leader ID và Class ID phải là số.');
    return;
  }
  try {
    const response = await axios.post(`http://localhost:8080/api/class/create-a-group`, {
      leaderId: leader_id,
      classId: classId,
      groupName: group_name,
    });
    // Kiểm tra xem yêu cầu đã thành công hay không
    if (response.status !== 200) {
      // Đặt lại các trường nhập
      setLeaderid('');
     // setClassId('');
      setGroupName('');
      // Đặt thông báo thành công
      window.alert("Add group success")
      window.location.reload(false)
    } else {
      // Xử lý thông báo lỗi nếu có
      window.alert('Có lỗi xảy ra khi tạo nhóm. Vui lòng thử lại sau.');
      setLeaderid('');
     // setClassId('');
      setGroupName('');
    }
  } catch (error) {
    // Xử lý thông báo lỗi trả về từ máy chủ
    window.alert('Có lỗi xảy ra khi tạo nhóm. Vui lòng thử lại sau.');
    setLeaderid('');
   // setClassId('');
    setGroupName('');
  }
};

// delete group of class
const handleDeleteGroup = async (id) => {
  const confirmed = window.confirm("Bạn có chắc muốn xóa nhóm này không?");
  if (!confirmed) {
    return;
  }
  try {
    const url = `http://localhost:8080/api/group/${id}`;
    const responseDelete = await fetch(url, {
      method: 'DELETE'
    });

    if (responseDelete.ok) {
      window.alert("Xóa nhóm thành công!");
      window.location.reload(true);
    } else {
      console.error('Failed to delete group');
      alert("Đã xảy ra lỗi khi xóa nhóm!");
    }
  } catch (error) {
    console.error('Error deleting group:', error);
    alert("Đã xảy ra lỗi khi xóa nhóm!");
  }
};

// const toggleCreateGroup = () => {
//   setIsCreateGroup(!isCreateGroup);
//   setIsGroup(false);
// };

/*show list group of class */
const [grouptList, setGroupList] = useState([]);
useEffect(() => {
  // Fetch the list of students
  fetch(`http://localhost:8080/api/class/${classId}/group-list`)
    .then(response => response.json())
    .then(data => {
      setGroupList(data);
    })
    .catch(error => console.error('Error fetching student list:', error));
}, [classId]);

  return (
    <div>
      <Navbar />
      <div className='container-body'>
            <div className='create-work'>
              <img src={add} alt='Create' />
              {/* <p>Add group</p> */}
              <Link to={`/group-view/${classId}/add-group`}>Add Group</Link>
            </div>
            <div className='works'>
              <p className='dsshow'>List Group</p>
              {grouptList.map((group) => (
                <li key={group.groupId} > 
                 <span >{group.groupName}</span>
                {/* <Link to={`/report-view/${group.groupId}`}>{group.groupName}</Link>   */}
                  <button className='btnDeleteSV' onClick={() => handleDeleteGroup(group.groupId)}>Delete</button>
                  <button className='btnCreateProject'><Link to={`/report-view/${group.groupId}` }style={{ textDecoration: 'none', color: 'white' }}>Create Project</Link></button>
                </li>
              ))}
            </div>
          </div>
    </div>
  )
}

export default CreateGroup;