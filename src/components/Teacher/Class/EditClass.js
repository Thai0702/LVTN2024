import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BE_URL } from "../../../utils/Url_request";
import Navbar from "../Home/Navbar";

const EditClass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classItem = location.state.classItem; // Dữ liệu lớp học được truyền qua state

  const [updateData, setUpdateData] = useState(classItem);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const response = await fetch(
        `${BE_URL}/api-gv/class/update/${updateData.subjectClassId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(updateData),
        }
      );
      if (response.ok) {
        navigate("/"); // Chuyển hướng về trang Home sau khi cập nhật thành công
      } else {
        console.error("Failed to update class");
      }
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="editclass">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Sửa</h2>
                <div className="form-group">
                  <label>Tên môn học:</label>
                  <input
                    type="text"
                    name="subjectName"
                    value={updateData.subjectName}
                    onChange={handleInputChange}
                    placeholder="Tên môn học"
                  />
                </div>
                <div className="form-group">
                  <label>Năm học:</label>
                  <input
                    type="text"
                    name="schoolYear"
                    value={updateData.schoolYear}
                    onChange={handleInputChange}
                    placeholder="Năm học"
                  />
                </div>
                <div className="form-group">
                  <label>Mô tả:</label>
                  <textarea
                    type="text"
                    name="description"
                    value={updateData.description}
                    onChange={handleInputChange}
                    placeholder="Mô tả"
                  />
                </div>
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Lưu</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div >
    //     <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       name="subjectName"
    //       value={updateData.subjectName}
    //       onChange={handleInputChange}
    //       placeholder="Tên môn học"
    //     />
    //     <input
    //       type="text"
    //       name="schoolYear"
    //       value={updateData.schoolYear}
    //       onChange={handleInputChange}
    //       placeholder="Năm học"
    //     />
    //     <input
    //       type="text"
    //       name="numberOfGroup"
    //       value={updateData.numberOfGroup || ''}
    //       onChange={handleInputChange}
    //       placeholder="Số nhóm"
    //     />
    //     <input
    //       type="text"
    //       name="memberPerGroup"
    //       value={updateData.memberPerGroup || ''}
    //       onChange={handleInputChange}
    //       placeholder="Số thành viên mỗi nhóm"
    //     />
    //     <button type="submit">Lưu</button>
    //   </form>
    // </div>
  );
};

export default EditClass;
