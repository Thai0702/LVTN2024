import React, { useState, useEffect } from 'react';
import Navbar from '../components/auth/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    subjectClassId: '',
    subjectName: '',
    schoolYear: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Nếu không có token, chuyển hướng đến trang đăng nhập
      navigate('/login');
    }
    console.log("hello",token)
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/class/${updateData.subjectClassId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      if (response.ok) {
        // Cập nhật trực tiếp danh sách lớp sau khi cập nhật thành công
        setClassList(prevList =>
          prevList.map(item =>
            item.subjectClassId === updateData.subjectClassId ? updateData : item
          )
        );
        setUpdateData({
          subjectClassId: '',
          subjectName: '',
          schoolYear: '',
        });
        setShowUpdateForm(false); // Ẩn form cập nhật sau khi cập nhật thành công
      } else {
        console.error('Failed to update class');
      }
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  const [classList, setClassList] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
        if (!userId) {
          console.error('userId not found in localStorage');
          return;
        }
        
        const response = await fetch(`http://localhost:8080/api/class/createdBy/${userId}`);
        const classData = await response.json();
        setClassList(classData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
  
    fetchClasses();
  }, []);

  const handleDelete = async (classId) => {
      try {
        // Kiểm tra xem lớp đã thêm nhóm hay chưa
        const response = await fetch(`http://localhost:8080/api/class/${classId}/group-list`);
        const dataGroup = await response.json();
        //kiem tra them sinh vien vào class
        const responseSV = await fetch(`http://localhost:8080/api/class/${classId}/student-list`);
        const dataSV = await responseSV.json(); 
        // Nếu lớp đã thêm nhóm, hiển thị thông báo và không xóa
        if (dataGroup.length > 0) {
          alert("Không thể xóa lớp này vì đã thêm nhóm.");
        }
        else if(dataSV.length>0)
        {
          alert("Không thể xóa vid đã thêm sinh viên vào lớp")
        } 
        else {
          // Nếu lớp chưa thêm nhóm, tiến hành xóa
          window.confirm("Bạn có chắc muốn xóa lớp này không?");
          await fetch(`http://localhost:8080/api/class/${classId}`, {
            method: 'DELETE',
          });
          // Cập nhật lại danh sách lớp sau khi xóa thành công
          setClassList(prevList => prevList.filter(item => item.subjectClassId !== classId));
        }
      } catch (error) {
        console.error('Error deleting class:', error);
      }
    
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = (classItem) => {
    setUpdateData(classItem);
    setShowUpdateForm(true); // Hiển thị form cập nhật khi nhấp vào "Cập nhật"
  };

  return (
    <div>
      <Navbar />
      <div className='home-main'>
        <div className='show-class'>
          <ul className="class-list">
            {classList.map((classItem) => (
              <li key={classItem.subjectClassId} className='showclass-1'>
                <div>
                  <div className='name_class'><Link to={`/class/${classItem.subjectClassId}`}>{classItem.subjectName}</Link></div>
                  <div className='button-del'>
                    <p className='btnxoasua'>
                      <button onClick={() => handleDelete(classItem.subjectClassId)}>Xóa</button>
                      <button onClick={() => handleUpdate(classItem)}>Sửa</button>
                    </p>
                  </div>
                </div>
                {showUpdateForm && updateData.subjectClassId === classItem.subjectClassId && (
                    <div className="update-form">
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          name="subjectName"
                          value={updateData.subjectName}
                          onChange={handleInputChange}
                          placeholder="Tên môn học"
                        />
                        <input
                          type="text"
                          name="schoolYear"
                          value={updateData.schoolYear}
                          onChange={handleInputChange}
                          placeholder="Năm học"
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
    </div>
  );
};

export default Home;