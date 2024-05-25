import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/auth/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const CreateGroup = () => {

const createClassRef = useRef();
const [leader_id, setLeaderid] = useState('');
const [group_name, setGroupName] = useState('');
const [class_id, setClassId] = useState('');
const { classId } = useParams(); // Lấy classId từ URL
const navigate = useNavigate();
const [classList, setClassList] = useState([]);

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
      // window.location.reload(false)
      navigate(`/group-view/${classId}`);
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

  return (
    <div>
      <Navbar /> 

      {/* <div className='class-list-teach'>
              {classList.map((classItem) => (
                <li key={classItem.id} className='showclass-1'>
                  <div>
                    <div className='name_class'><Link to={`/class/${classItem.projectId}`}>{classItem.projectName}</Link></div>
                  </div>
                </li>
              ))}
      </div> */}
      <div ref={createClassRef} className='container-create-project'>
        <form onSubmit={handleSubmit} className='addGroup'>
          <input
            type='text'
            placeholder='Mã leader'
            className='input'
            value={leader_id}
            onChange={(e) => setLeaderid(e.target.value)}
          />
          <input
          type='text'
          placeholder='Tên nhóm'
          className='input'
          value={group_name}
          onChange={(e) => setGroupName(e.target.value)}
          />
          <button className='btn btn-primary' type='submit'>Create</button>
          
        </form>
      </div>
    </div>
  )
}

export default CreateGroup;