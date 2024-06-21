import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BE_URL } from '../utils/Url_request';

const EditClass = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    subjectClassId: '',
    subjectName: '',
    schoolYear: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading
  const [errorMessage, setErrorMessage] = useState(''); // Thêm trạng thái lỗi

  useEffect(() => {
    const fetchClassData = async () => {
      setIsLoading(true);
      setErrorMessage(''); // Reset lỗi trước khi fetch data
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await fetch(`${BE_URL}/api-gv/class/${classId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (Object.keys(data).length > 0) { 
              setUpdateData({
                  subjectClassId: data.subjectClassId || '', 
                  subjectName: data.subjectName || '', 
                  schoolYear: data.schoolYear || '', 
              });
          } else {
              console.error('Cấu trúc dữ liệu không hợp lệ:', data);
              setErrorMessage('Cấu trúc dữ liệu không hợp lệ.'); // Hiển thị lỗi cho người dùng
          }
        } else {
          console.error('Failed to fetch class data:', response.statusText);
          setErrorMessage('Lỗi khi lấy dữ liệu lớp học.'); // Hiển thị lỗi cho người dùng
        }
      } catch (error) {
        console.error('Error fetching class data:', error);
        setErrorMessage('Lỗi khi kết nối đến máy chủ.'); // Hiển thị lỗi cho người dùng
      } finally {
        setIsLoading(false); // Xử lý trạng thái loading khi fetch data hoàn tất
      }
    };
    fetchClassData();
  }, [classId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setIsLoading(true);
    setErrorMessage(''); 
    try {
      const response = await fetch(`${BE_URL}/api-gv/class/update/${updateData.subjectClassId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(updateData),
      });
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to update class:', response.statusText); 
        setErrorMessage('Lỗi khi cập nhật lớp học.'); // Hiển thị lỗi cho người dùng
      }
    } catch (error) {
      console.error('Error updating class:', error);
      setErrorMessage('Lỗi khi cập nhật lớp học.'); // Hiển thị lỗi cho người dùng
    } finally {
      setIsLoading(false); // Xử lý trạng thái loading khi update data hoàn tất
    }
  };

  return (
    <div className="update-form">
      <h2>Chỉnh sửa lớp học</h2>
      {isLoading && <p>Đang tải...</p>} {/* Hiển thị trạng thái loading */}
      {errorMessage && <p className="error">{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="subjectName"
          value={updateData.subjectName}
          onChange={handleInputChange}
          placeholder="Tên môn học"
          required
        />
        <input
          type="text"
          name="schoolYear"
          value={updateData.schoolYear}
          onChange={handleInputChange}
          placeholder="Năm học"
          required
        />
        <button type="submit">Lưu</button>
        <Link to="/">Hủy</Link>
      </form>
    </div>
  );
};

export default EditClass;