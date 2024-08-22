import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { Link, useNavigate, useParams } from "react-router-dom";
import { BE_URL } from "../../../utils/Url_request";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import peoplecss from "./css/people.css";
import { fetchStudentList, deleteStudent, uploadFile, addStudent } from "../../../services/apiPeople";
import bin from "../../Admin/imgAdmin/bin.png";

const People = () => {
  const { classId } = useParams();
  const fileInputRef = useRef(null);
  // /*show list student of class*/
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const type = localStorage.getItem("type");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);

  //them danh sach sinh vien
  // const fetchStudentList = async () => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = await fetch(
  //       `${BE_URL}/api/class/student-list/${classId}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     setStudentList(data);
  //   } catch (error) {
  //     console.error("Error fetching student list:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchStudentList();
  // }, [classId]);

  const token = localStorage.getItem("token");
  const loadStudentList = async () => {
      setLoading(true);
      try {
          const data = await fetchStudentList(classId, token);
          setStudentList(data);
      } catch (error) {
          console.error("Error loading student list:", error);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      if (classId) {
          loadStudentList();
      }
  }, [classId]);


 
//xoa sinh vien

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
        setLoading(true);
        try {
            await uploadFile(classId, token, file);
            window.alert("Dữ liệu đã được tải lên thành công!!!");
            navigate(`/methodGroup/${classId}`);
            // Load lại trang sau khi thêm thành công
            window.location.reload(false);
        } catch (error) {
            window.alert("Dữ liệu đã được tải lên thất bại!!!");
        } finally {
            setLoading(false);
        }
    } else {
        console.error("Chưa chọn tệp hoặc chưa chọn lớp!!!");
        window.alert("Chưa chọn tệp hoặc chưa chọn lớp!!!");
    }
};
  // const handleFileUpload = async () => {
  //   const token = localStorage.getItem("token");
  //   const file = fileInputRef.current.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     setLoading(true);
  //     try {
  //       await axios.post(`${BE_URL}/api-gv/class/excel/${classId}`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       window.alert("Dữ liệu đã được tải lên thành công!!!");
  //       navigate(`/methodGroup/${classId}`)
  //       // Load lại trang sau khi thêm thành công
  //       window.location.reload(false);
  //     } catch (error) {
  //       window.alert("Dữ liệu đã được tải lên thất bại!!!");
  //     }finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     console.error("Chưa chọn tệp hoặc chưa chọn lớp!!!");
  //     window.alert("Chưa chọn tệp hoặc chưa chọn lớp!!!");
  //   }
  // };


//them SV bang ma
const handleAddStudent = async (e) => {
  e.preventDefault();
  if (!studentId) {
      window.alert("Vui lòng điền đủ thông tin.");
      return;
  }

  setLoading(true);
  try {
      const token = localStorage.getItem("token");
      const response = await addStudent(classId, studentId, token);
      if (response.status === 200) {
          setStudentId("");
          window.alert("Thêm sinh viên thành công!!!");
          fetchStudentList(); // Gọi hàm để cập nhật danh sách sinh viên
      }
  } catch (error) {
      window.alert("Thêm sinh viên thất bại!!!");
  } finally {
      setLoading(false);
  }
};
  // const handleAddStudent = async (e) => {
  //   e.preventDefault();
  //   if (!studentId) {
  //     window.alert("Vui lòng điền đủ thông tin.");
  //     return;
  //   }
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post(
  //       `${BE_URL}/api-gv/add-student/class/${classId}`,
  //       { studentId },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setStudentId("");
  //       window.alert("Thêm sinh viên thành công!!!");
  //       fetchStudentList(); // Fetch the updated list of students
  //     }
  //   } catch (error) {
  //     window.alert("Thêm sinh viên thất bại!!!");
  //     setStudentId("");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="container-people">
      
        {type==="GV"&&(
          <div className="container-p mt-3 custom-width">
            
          <div className="row g-3 align-items-center">
            <div className="col-12 col-sm-4">
              <input type="file" ref={fileInputRef} className="form-control" />
            </div>
            <div className="col-12 col-sm-1 d-flex justify-content-center me-5">
              <button onClick={handleFileUpload} className="btn btn-primary w-100">THÊM</button>
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
        )}
        {studentList.length > 0 &&
          (
            <div className="listpe">
              <p className="listpeople">Danh sách sinh viên</p>
              <div className="table-responsive">
                <table className="table table-striped table-bordered custom-table">
                  <thead>
                    <tr className="text-center align-middle">
                      <th>STT</th>
                      <th>Mã lớp</th>
                      <th>Tên lớp</th>
                      <th>Tên sinh viên</th>
                      <th>Mã sinh viên</th>
                      {type === "GV" && <th className="text-center" colSpan="3">
                            Hành động
                          </th>}
                    </tr>
                  </thead>
                  <tbody>
                    {studentList.map((student, index) => (
                      <tr key={student.classId} className="text-center align-middle">
                        <td>{index + 1}</td>
                        <td>{student.classId}</td>
                        <td>{student.subjectName}</td>
                        <td>{student.fullName}</td>
                        <td>{student.studentId}</td>
                        {type === "GV" && (
                          <td>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                              <img src={bin} onClick={() => handleDeleteSV(student.accountId)}/>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }

      </div>
    </div>
  );
};

export default People;
