import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassDetailPage = () => {
  const [groupSize, setGroupSize] = useState('');
  const [randomGroup, setRandomGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/class/2/student-list`);
        const studentList = response.data;
        setStudents(studentList);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sinh viên:', error);
      }
    };
    fetchStudents();
  }, []); // Thêm classId vào dependency array để fetch lại danh sách sinh viên khi classId thay đổi

  const generateRandomGroup = () => {
    if (!groupSize || isNaN(groupSize) || groupSize <= 0) {
      setError('Vui lòng nhập một số nguyên dương.');
      return;
    }
  
    if (groupSize > students.length) {
      setError('Không đủ sinh viên để tạo nhóm.');
      return;
    }
  
    const randomGroupMembers = [];
    const shuffledStudents = [...students].sort(() => 0.5 - Math.random());
  
    // Dùng Set để lưu các ID sinh viên đã được chọn
    const selectedStudentIds = new Set();
  
    // Chọn ngẫu nhiên các sinh viên cho nhóm
    for (let i = 0; i < groupSize; i++) {
      let randomIndex = Math.floor(Math.random() * shuffledStudents.length);
      let student = shuffledStudents[randomIndex];
  
      // Kiểm tra xem sinh viên đã được chọn trước đó chưa
      while (selectedStudentIds.has(student.id)) {
        randomIndex = Math.floor(Math.random() * shuffledStudents.length);
        student = shuffledStudents[randomIndex];
      }
  
      // Thêm sinh viên vào danh sách thành viên của nhóm
      randomGroupMembers.push(student.id);
  
      // Đánh dấu sinh viên đã được chọn
      selectedStudentIds.add(student.id);
    }
  
    const randomGroup = {
      groupName: `Group ${Math.floor(Math.random() * 1000)}`,
      members: randomGroupMembers
    };
  
    setRandomGroup(randomGroup);
    setError('');
  };
  

  const saveRandomGroup = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/class/random-group', randomGroup);
      if (response.status === 200) {
        setSuccessMessage('Đã lưu nhóm ngẫu nhiên thành công.');
      }
    } catch (error) {
      console.error('Lỗi khi lưu nhóm ngẫu nhiên:', error);
    }
  };

  return (
    <div>
      <h2>Random Group</h2>
      <div>
        <label htmlFor="groupSize">Nhập số lượng thành viên cho nhóm:</label>
        <input
          type="number"
          id="groupSize"
          value={groupSize}
          onChange={(e) => setGroupSize(e.target.value)}
        />
        <button onClick={generateRandomGroup}>Tạo Nhóm Ngẫu Nhiên</button>
      </div>
      {randomGroup && (
        <div>
          <h3>Nhóm Ngẫu Nhiên:</h3>
          <p>Tên Nhóm: {randomGroup.groupName}</p>
          <p>Thành Viên:</p>
          <ul>
            {randomGroup.members.map((memberId, index) => {
              const student = students.find(student => student.id === memberId);
              if (student) {
                return (
                  <li key={index}>
                    <div>
                      <strong>student id:</strong> {student.studentId}
                    </div>
                    <div>
                      <strong>class id:</strong> {student.classId}
                    </div>                         
                  </li>
                );
              } else {
                return <li key={index}>Sinh viên không tồn tại</li>;
              }
            })}
          </ul>
          <button onClick={saveRandomGroup}>Lưu Nhóm Ngẫu Nhiên</button>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
    </div>
  );
};

export default ClassDetailPage;
