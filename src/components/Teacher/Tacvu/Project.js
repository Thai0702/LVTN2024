import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BE_URL } from "../../../utils/Url_request";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import "./css/project.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Project = () => {
  const navigate = useNavigate();
  const createClassRef = useRef();
  const { classId } = useParams();

  const [project_name, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [expired_day, setExpiredDay] = useState("");
  const [expired_time, setExpiredTime] = useState("");
  const [dateError, setDateError] = useState("");
  const groupRegisterMethod = localStorage.getItem("groupRegisterMethod");

  const handleAddProject = async (e) => {
    e.preventDefault();

    if (!project_name || !description || !expired_day || !expired_time) {
      window.alert("Vui lòng điền đủ thông tin.");
      return;
    }

 
    const currentDate = new Date();
    const selectedDate = new Date(`${expired_day}T${expired_time}`);

    if (selectedDate <= currentDate) {
      window.alert(
        "Ngày tháng năm không hợp lệ, vui lòng chọn ngày tháng năm khác."
      );
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BE_URL}/api-gv/project/create-project`,
        {
          classId: classId,
          projectName: project_name,
          projectDescription: description,
          expiredDay: expired_day,
          expiredTime: expired_time,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token, 
          },
        }
      );
      if (response.status === 200) {

        setProjectName("");
        setDescription("");
        setExpiredDay("");
        setExpiredTime("");
        window.alert("Tạo đồ án thành công!!!");

        navigate(`/projectListClass/${classId}`);
      }
    } catch (error) {
      window.alert("Thêm dự án thất bại!!!");
    }
  };

  const handleExpiredDayChange = (e) => {
    setExpiredDay(e.target.value);
    validateDateTime(e.target.value, expired_time);
  };

  const handleExpiredTimeChange = (e) => {
    setExpiredTime(e.target.value);
    validateDateTime(expired_day, e.target.value);
  };

  const validateDateTime = (day, time) => {
    const currentDate = new Date();
    const selectedDate = new Date(`${day}T${time}`);

    if (selectedDate <= currentDate) {

      setDateError("Ngày không được nhỏ hơn ngày hiện tại");
    } else {
      setDateError("");
    }
  };


  const [grouptList, setGroupList] = useState([]);
  useEffect(() => {

    const token = localStorage.getItem("token");
    fetch(`${BE_URL}/api-gv/classId/group-list/${classId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGroupList(data);
      })
      .catch((error) => console.error("Error fetching student list:", error));
  }, [classId]);


  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    const plainText = data.replace(/<[^>]+>/g, ""); 
    setDescription(plainText); 
  };
  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="taobaocao">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">TẠO ĐỒ ÁN</h2>
                  <div className="mb-3">
                    <label>
                      <strong>Tên đề tài:</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={project_name}
                      placeholder="Tên đồ án"
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Ngày hết hạn:</strong>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Ngày tạo"
                      value={expired_day}
                      onChange={handleExpiredDayChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Thời gian hết hạn:</strong>
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      placeholder="Thời gian hết hạn"
                      value={expired_time}
                      onChange={handleExpiredTimeChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mô tả: </label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={description}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  {dateError && (
                    <div className="alert alert-danger">{dateError}</div>
                  )}
                  <button
                    className="btn btn-primary add-project"
                    type="submit"
                    onClick={handleAddProject}
                  >
                    Thêm
                  </button>
                </div>
              </div>
              <Link to={`/projectListClass/${classId}`}>
                <button className="btn btn-secondary listproject">
                  Danh sách đồ án
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
