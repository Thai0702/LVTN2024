import React, { useEffect, useRef, useState } from 'react';
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
    const [saveStatus, setSaveStatus] = useState({});


    const saveTimeouts = useRef({});

    const fetchStudentListWithGrades = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token is missing");
            setSubmitMessage("Authorization token is missing.");
            return;
        }
        try {

            const studentResponse = await fetch(
                `${BE_URL}/api/class/${classId}/group/${groupId}/students`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!studentResponse.ok) {
                throw new Error("Network response was not ok");
            }
            const studentData = await studentResponse.json();


            const gradesResponse = await fetch(
                `${BE_URL}/api/class/${classId}/group/${groupId}/students/grades/${requestId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!gradesResponse.ok) {
                throw new Error("Failed to fetch grades");
            }
            const gradesData = await gradesResponse.json();

            const studentListWithGrades = studentData.map(student => {
                const studentGrade = gradesData.find(
                    grade => grade.memberId === student.accountId
                );
                return {
                    ...student,
                    grade: studentGrade ? studentGrade.grade : 0 
                };
            });

            setStudentList(studentListWithGrades);
            const initialGrades = {};
            studentListWithGrades.forEach((student) => {
                initialGrades[student.accountId] = student.grade || 0;
            });
            setGrades(initialGrades);
        } catch (error) {
          console.error("Error fetching student list or grades:", error);
            setSubmitMessage("Failed to fetch student list or grades.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentListWithGrades();
    }, [classId, groupId]);


    const handleGradeChange = (studentId, newGrade) => {
        setGrades((prevGrades) => ({
            ...prevGrades,
            [studentId]: newGrade
        }));

        setSaveStatus((prevStatus) => ({
            ...prevStatus,
            [studentId]: "Pending save..."
        }));

        if (saveTimeouts.current[studentId]) {
            clearTimeout(saveTimeouts.current[studentId]);
        }

        saveTimeouts.current[studentId] = setTimeout(() => {
            submitGrade(studentId, newGrade);
        }, 3000);
    };

    const submitGrade = async (studentId, newGrade) => {
        const token = localStorage.getItem("token");
        const gradeData = {
            memberId: studentId,
            grade: newGrade || 0,
            requestId: requestId
        };
        try {
            const response = await fetch(
                `${BE_URL}/api/class/${classId}/group/${groupId}/students/grades`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify([gradeData]) 
                }
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Server error:", errorResponse);
                setSubmitMessage("Failed to submit grade. " + (errorResponse.message || "Please check the server logs for more details."));
                setSaveStatus((prevStatus) => ({
                    ...prevStatus,
                    [studentId]: "Save failed"
                }));
                return;
            }

            setSaveStatus((prevStatus) => ({
                ...prevStatus,
                [studentId]: "Saved"
            }));

        } catch (error) {
            console.error("Error submitting grade:", error);
            setSubmitMessage("Failed to submit grade due to a network error.");
            setSaveStatus((prevStatus) => ({
                ...prevStatus,
                [studentId]: "Save failed"
            }));
        }
    };

    return (
        <div>
            <Navbar />
            <DetailClass />
            <div className="score">
                <div className="">
                <p className="listmember">Danh sách bảng điểm báo cáo của nhóm</p>
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
                                        <th>Trạng thái</th>
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
                                                    step="0.5" 
                                                    value={grades[member.accountId] || 0} 
                                                    onChange={(e) =>
                                                        handleGradeChange(
                                                            member.accountId,
                                                            parseFloat(e.target.value)
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td>
                                                {saveStatus[member.accountId] || "Saved"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Score;