import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from "react-router-dom";
import Navbar from '../components/auth/Navbar';

const ShowstudentGroup = () => {
  const { classId } = useParams();
  const [studentDetail, setStudentDetail] = useState(null);
  const navigate = useNavigate();

  /*show detail of class */
  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/class/${classId}/student-group-sorted`
        );
        const classDetailData = await response.json();
        setStudentDetail(classDetailData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchClassDetail();
  }, [classId]);
  if (!studentDetail) {
    return <p>Loading...</p>;
  }
  return (
    <div>
        <Navbar/>
      <div className="container-body"></div>
      <div className="works">
        <p className="dsshow">List Students Group </p>
        <ul>
          {studentDetail.map((student) => (
            <li key={student.groupId}>
              <span>
                {student.groupId}-{student.groupName}-{student.studentId}-{student.memberName}
              </span>
              {/* <div className="btnPeople">
                <button >
                  Delete
                </button>
              </div> */}
            </li>
          ))}
        </ul>
        {/* <button onClick={() => navigate(`/class/${classId}`)}>Back to Group</button> */}
        <button onClick={() => navigate(`/report-view/${classId}`)}>Back to Group</button>
      </div>
    </div>
  );
};

export default ShowstudentGroup;
