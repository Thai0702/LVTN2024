import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchStudentsAPI, generateRandomGroup } from '../../../services/apiRandom';

const ClassDetailPage = () => {
  const [groupSize, setGroupSize] = useState('');
  const [groupName, setGroupName] = useState('');
  const [randomGroup, setRandomGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const classId = 3;
  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/class/3/student-list`);
  //       const studentList = response.data;
  //       setStudents(studentList);
  //     } catch (error) {
  //       console.error('Lỗi khi lấy danh sách sinh viên:', error);
  //     }
  //   };
  //   fetchStudents();
  // }, [3]);
  useEffect(() => {
    const fetchStudents = async () => {
        try {
            const studentList = await fetchStudentsAPI(classId);
            setStudents(studentList);
        } catch (error) {
            // Lỗi đã được xử lý trong API
        }
    };

    fetchStudents();
}, [classId]);


    // const generateRandomGroup = () => {
    //   if (!groupSize || isNaN(groupSize) || groupSize <= 0) {
    //     setError('Vui lòng nhập một số nguyên dương.');
    //     return;
    //   }
      
    //   if (groupSize > students.length) {
    //     setError('Không đủ sinh viên để tạo nhóm.');
    //     return;
    //   }
    
    //   const tempStudents = [...students]; // Tạo một bản sao của danh sách sinh viên
    //   const randomGroupMembers = [];
      
    //   for (let i = 0; i < groupSize; i++) {
    //     const randomIndex = Math.floor(Math.random() * tempStudents.length);
    //     const selectedStudent = tempStudents.splice(randomIndex, 1)[0]; // Loại bỏ sinh viên đã chọn khỏi danh sách tạm thời
    //     randomGroupMembers.push(selectedStudent.studentId);
    //   }   
    //   console.log(randomGroupMembers)
    //   const finalGroupName = groupName.trim() || `Group ${Math.floor(Math.random() * 6) + 1}`;
    
    //   const randomGroup = {
    //     groupName: finalGroupName,
    //     members: randomGroupMembers
    //   };
    
    //   setRandomGroup(randomGroup);
    //   setError('');
    // };
    const handleGenerateGroup = () => {
      try {
          const group = generateRandomGroup(students, groupSize, groupName);
          setRandomGroup(group);
          setError("");
      } catch (err) {
          setError(err.message);
      }
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
      </div>
      <div>
        <label htmlFor="groupName">Nhập tên nhóm:</label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      <button onClick={generateRandomGroup}>Tạo Nhóm Ngẫu Nhiên</button>
      {groupSize && <p>Số lượng thành viên trong nhóm sẽ được tạo: {groupSize}</p>}
      {randomGroup && (
        <div>
          <h3>Nhóm Ngẫu Nhiên:</h3>
          <p>Tên Nhóm: {randomGroup.groupName}</p>
          <p>Thành Viên:</p>
          <ul>
            {randomGroup.members.map((studentId, index) => (
              <li key={index}>{studentId}</li>
            ))}
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