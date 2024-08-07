import React, { useEffect, useState } from 'react';
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import { BE_URL } from '../../../utils/Url_request';
import { useParams } from 'react-router-dom';
import { debounce } from 'lodash'; 
import "./css/score.css";

const Score = () => {
  const { classId, groupId, requestId } = useParams();
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  const fetchStudentList = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      setSubmitMessage("Authorization token is missing.");
      return;
    }

    try {
      const response = await fetch(
        `${BE_URL}/api/class/${classId}/group/${groupId}/students`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStudentList(data);

      // Khởi tạo grades từ server
      const initialGrades = {};
      data.forEach((student) => {
        initialGrades[student.accountId] = student.grade || 0;
      });
      setGrades(initialGrades);

    } catch (error) {
      console.error("Error fetching student list:", error);
      setSubmitMessage("Failed to fetch student list.");
    } finally {
      setLoading(false);
    }
  };

  const handleGradeChange = (studentId, newGrade) => {
    setGrades((prevGrades) => {
      return { ...prevGrades, [studentId]: newGrade };
    });
  };

  const saveGrades = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      setSubmitMessage("Authorization token is missing.");
      return;
    }

    const gradesData = studentList.map((student) => ({
      memberId: student.accountId,
      grade: grades[student.accountId] || 0,
      requestId: requestId
    }));

    try {
      const response = await fetch(
        `${BE_URL}/api/class/${classId}/group/${groupId}/students/grades`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(gradesData)
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server error:", errorResponse);
        // Xử lý lỗi khi lưu điểm
        return;
      }

      console.log("Grades saved successfully!"); 
      // fetchStudentList(); // Gọi lại API để cập nhật danh sách sinh viên
    } catch (error) {
      console.error("Error saving grades:", error);
      // Xử lý lỗi khi lưu điểm
    }
  };

  useEffect(() => {
    const debouncedSaveGrades = debounce(saveGrades, 500);
    debouncedSaveGrades();
    return () => {
      debouncedSaveGrades.cancel();
    };
  }, [grades]); 

  useEffect(() => {
    fetchStudentList();
  }, [classId, groupId, requestId]); 

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="score">
        <div className="">
          <p className="listmember">List Member Group</p>
          <div className="table-responsive">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-striped table-bordered custom-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã sinh viên</th>
                    <th>Tên sinh viên</th>
                    <th>Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((member, index) => (
                    <tr key={member.accountId}>
                      <td>{index + 1}</td>
                      <td>{member.studentId}</td>
                      <td>{member.memberName}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={grades[member.accountId] || 0}
                          onChange={(e) => handleGradeChange(member.accountId, parseFloat(e.target.value))}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {submitMessage && <p className="mt-2">{submitMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Score;