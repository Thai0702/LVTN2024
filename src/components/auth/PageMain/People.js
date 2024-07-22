import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { Link, useNavigate, useParams } from "react-router-dom";
import { BE_URL } from "../../../utils/Url_request";
import Navbar from "../Navbar";
import DetailClass from "../DetailClass";
import peoplecss from "./css/people.css";

const People = () => {
  const { classId } = useParams();
  const fileInputRef = useRef(null);
  // /*show list student of class*/
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const type = localStorage.getItem("type");
  const navigate = useNavigate();
  const fetchStudentList = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${BE_URL}/api/class/student-list/${classId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setStudentList(data);
    } catch (error) {
      console.error("Error fetching student list:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudentList();
  }, [classId]);

  const handleDeleteSV = async (id) => {
    const token = localStorage.getItem("token");
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa sinh viên này không?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const url = `${BE_URL}/api-gv/class/delete/student-list/${classId}/${id}`;
      const responseDelete = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (responseDelete.ok) {
        setStudentList(
          studentList.filter((student) => student.studentId !== id)
        );
        window.alert("Bạn đã xóa sinh viên với mã " + id);
        fetchStudentList();
      } else {
        console.error("Failed to delete student");
        window.alert("Xóa sinh viên không thành công!");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      window.alert("Đã xảy ra lỗi khi xóa sinh viên!");
    }
  };
  // upload file
  const handleFileUpload = async () => {
    const token = localStorage.getItem("token");
    const file = fileInputRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await axios.post(`${BE_URL}/api-gv/class/excel/${classId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        });
        window.alert("File uploaded successfully!");
        // Load lại trang sau khi thêm thành công
        window.location.reload(false);
      } catch (error) {
        window.alert("File uploaded fail!");
      }
    } else {
      console.error("No file selected or class not selected");
      window.alert("No file selected or class not selected!");
    }
  };
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!studentId) {
      window.alert("Vui lòng điền đủ thông tin.");
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BE_URL}/api-gv/add-student/class/${classId}`,
        { studentId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        setStudentId("");
        window.alert("Student added successfully!");
        fetchStudentList(); // Fetch the updated list of students
      }
    } catch (error) {
      window.alert("Add failed!");
      setStudentId("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="container-people">
        {/* <div className='import-people'>
                    <input type='file' ref={fileInputRef} />
                    <button onClick={handleFileUpload}>Add</button>
                    <input
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        type='text'
                        placeholder='Nhập MSSV...'
                        style={{ marginLeft: '160px', marginRight: '-50px' }}
                    />                    <button onClick={handleAddStudent}>THÊM</button>
                </div> */}
        <div className="container-p mt-3 custom-width">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-sm-4">
              <input type="file" ref={fileInputRef} className="form-control" />
            </div>
            <div className="col-12 col-sm-1 d-flex justify-content-center me-5">
              <button onClick={handleFileUpload} className="btn btn-primary w-100">Add</button>
            </div>
            <div className="col-12 col-sm-5 d-flex ms-5">
              <input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                type="text"
                placeholder="Nhập MSSV..."
                className="form-control"
              />
              <button onClick={handleAddStudent}className="btn btn-secondary ms-2">THÊM</button>
            </div>
          </div>
        </div>
        <div className="listpe">
        <p className="listpeople">Danh sách sinh viên</p>
        <div className="table-responsive">
          <table className="table table-striped table-bordered custom-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã lớp</th>
                <th>Tên sinh viên</th>
                <th>Mã sinh viên</th>
                {type === "GV" && <th>Hành động</th>}
              </tr>
            </thead>
            <tbody>
              {studentList.map((student, index) => (
                <tr key={student.classId}>
                  <td>{index + 1}</td>
                  <td>{student.classId}</td>
                  <td>{student.fullName}</td>
                  <td>{student.studentId}</td>
                  {type === "GV" && (
                    <td>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => handleDeleteSV(student.accountId)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default People;
