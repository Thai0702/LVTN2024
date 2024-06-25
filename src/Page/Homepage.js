import React, { useState, useEffect } from 'react';
import Navbar from '../components/auth/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { BE_URL } from '../utils/Url_request';
import css from './css/showclass.css';
import home from './css/home.css';
const Home = () => {
  const [showMenu, setShowMenu] = useState(null);
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
    console.log("hello",token);
  }, []);

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    try {
      const response = await fetch(`${BE_URL}/api-gv/class/update/${updateData.subjectClassId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
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
  const [classListStudent, setClassListStudent] = useState([]);
  
  useEffect(() => {
    const fetchClasses = async () => {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('accountId');
      
      if (!userId) {
        console.error('userId not found in localStorage');
        return;
      }

      try {
        const response = await fetch(`${BE_URL}/api-gv/class/createdBy/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // Thêm token vào header
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const classData = await response.json();
        setClassList(classData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  // get list class of student 
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');

        if (!userId) {
          console.error('userId not found in localStorage');
          return;
        }

        const response = await fetch(`${BE_URL}/api/user/${userId}/joined-class`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const classData = await response.json();
        setClassListStudent(classData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleDelete = async (classId) => {
    const token = localStorage.getItem('token');
    try {
      // Kiểm tra xem lớp đã thêm nhóm hay chưa
      const response = await fetch(`${BE_URL}/api-gv/classId/group-list/${classId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      const dataGroup = await response.json();
      //kiem tra them sinh vien vào class
      const responseSV = await fetch(`${BE_URL}/api/class/student-list/${classId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      const dataSV = await responseSV.json(); 
      // Nếu lớp đã thêm nhóm, hiển thị thông báo và không xóa
      if (dataGroup.length > 0) {
        alert("Không thể xóa lớp này vì đã thêm nhóm.");
      }
      else if (dataSV.length > 0) {
        alert("Không thể xóa vì đã thêm sinh viên vào lớp");
      } else {
        // Nếu lớp chưa thêm nhóm, tiến hành xóa
        window.confirm("Bạn có chắc muốn xóa lớp này không?");
        await fetch(`${BE_URL}/api-gv/class/delete/${classId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
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
    navigate(`/editclass`, { state: { classItem } }); // Chuyển hướng đến trang chỉnh sửa với dữ liệu lớp học
  };
  const handleMenuToggle = (classId) => {
    setShowMenu(prevState => (prevState === classId ? null : classId));
  };
  return (
    <div>
      <Navbar />
      <div className='home-main'>
        <div className='show-class'>
          <ul className="class-list">
            {classList.map((classItem) => (
              <li key={classItem.id} className='showclass-1'>
                <div>
                  <div className='name_class'><Link to={`/class/${classItem.subjectClassId}`}>{classItem.subjectName}</Link></div>
                  <div className='menu-container'>
                      <span onClick={() => handleMenuToggle(classItem.subjectClassId)}>⋮</span>
                      {showMenu === classItem.subjectClassId && (
                        <div className='menu'>
                          <button onClick={() => handleDelete(classItem.subjectClassId)}>Xóa</button>
                          <button onClick={() => handleUpdate(classItem)}>Sửa</button>
                        </div>
                      )}
                    </div>
                  
                </div>
              </li>
            ))}
          </ul>
          <ul className="class-list">
            {classListStudent.map((classItem) => (
              <li key={classItem.id} className='showclass-1'>
                <div>
                  <div className='name_class'><Link to={`/class/${classItem.subjectClassId}`}>{classItem.subjectName}</Link></div>
                </div>    
              </li>  
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
