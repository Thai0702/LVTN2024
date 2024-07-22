import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BE_URL } from "../../../utils/Url_request";
import Navbar from "../Navbar";
import DetailClass from "../DetailClass";
import css from './css/createreport.css'


const CreateReport = () => {
  // add report request
  const { classId, groupId, projectId } = useParams();
  const [subjectClass, setsubjectClass] = useState("");
  const [requestOfProject, setrequestOfProject] = useState("");
  const [expiredTime, setexpiredTime] = useState("");
  const [expiredDate, setexpiredDate] = useState("");
  const [expiredAction, setexpiredAction] = useState("");
  const createClassRef = useRef();
  const [requestTile, setrequestTile] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [requestDescription, setrequestDescription] = useState("");
  const navigate = useNavigate();
  const handleAddReportRequest = async (e) => {
    e.preventDefault();
    // Kiểm tra không được bỏ trống các trường
    if (
      !requestOfProject ||
      !expiredTime ||
      !expiredDate ||
      !requestTile ||
      !requestDescription
    ) {
      window.alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BE_URL}/api-gv/create/request`,
        {
          subjectClass: classId,
          requestOfProject: requestOfProject,
          expiredTime: expiredTime,
          expiredDate: expiredDate,
          expiredAction: 2,
          requestTile: requestTile,
          requestDescription: requestDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token, // Thêm token vào header
          },
        }
      );
      if (response.status !== 200) {
        setsubjectClass("");
        setrequestOfProject("");
        setexpiredTime("");
        setexpiredDate("");
        // setexpiredAction('');
        setrequestTile("");
        setrequestDescription("");
        window.alert("Report created successfully !");
        navigate(`/stream/${classId}`);
        window.location.reload(false);
      }
    } catch (error) {
      window.alert("Add fail !");
    }
  };
  // get project of group
  // get list project of group
  const [listProject, setListProject] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fettListProject = async () => {
      try {
        const respone = await fetch(
          `${BE_URL}/api-gv/group/projects/${groupId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!respone.ok) {
          throw new Error("Network response not ok");
        }
        const data = await respone.json();
        setListProject(data);
      } catch (error) {
        console.log("error to fetching", error);
      }
    };
    fettListProject();
  });




  return (
    <div>
      <Navbar />
      <DetailClass />
      <div ref={createClassRef}>
        <div className="col-md-6">
          <div className="createreport">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleAddReportRequest}>
                  <div className="form-group">
                    <label>Chủ đề Report: </label>
                    <input
                      type="text"
                      placeholder="Chủ đề report"
                      className="form-control"
                      value={requestTile}
                      onChange={(e) => setrequestTile(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Ngày hết hạn: </label>
                    <input
                      type="date"
                      placeholder="Ngày hết hạn"
                      className="form-control"
                      value={expiredDate}
                      onChange={(e) => setexpiredDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Thời gian hết hạn: </label>
                    <input
                      type="time"
                      className="form-control"
                      placeholder="Thời gian hết hạn"
                      value={expiredTime}
                      onChange={(e) => setexpiredTime(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mô tả: </label>
                    <input
                      type="text"
                      placeholder="Mô tả"
                      className="form-control"
                      value={requestDescription}
                      onChange={(e) => setrequestDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Chọn Project: </label>
                    <select
                      className="form-control"
                      onChange={(e) => setrequestOfProject(e.target.value)}
                      value={requestOfProject}
                    >
                      <option value="">Select project</option>
                      {listProject.map((project) => (
                        <option
                          key={project.projectId}
                          value={project.projectId}
                        >
                          {project.projectName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {error && <div className="error">{error}</div>}
                  {successMessage && (
                    <div className="success">{successMessage}</div>
                  )}
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleAddReportRequest}
                  >
                    Thêm
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



  
};

export default CreateReport;
