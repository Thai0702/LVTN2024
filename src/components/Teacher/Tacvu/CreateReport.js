import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BE_URL } from "../../../utils/Url_request";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import "./css/createreport.css"; 
import {
  addReportRequest,
  fetchListProject,
} from "../../../services/apiReport";

const CreateReport = () => {
  const { classId, groupId } = useParams();
  const [requestOfProject, setrequestOfProject] = useState("");
  const [expiredTime, setexpiredTime] = useState("");
  const [expiredDate, setexpiredDate] = useState("");
  const [requestTile, setrequestTile] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [requestDescription, setrequestDescription] = useState("");
  const [listProject, setListProject] = useState([]);
  const [dateError, setDateError] = useState("");
  const [subjectClass, setsubjectClass] = useState("");
  const navigate = useNavigate();

  const handleAddReportRequest = async (e) => {
    e.preventDefault();
    if (!expiredTime || !expiredDate || !requestTile || !requestDescription) {
      window.alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BE_URL}/api-gv/create/request`,
        {
          subjectClass: classId,
          expiredTime: expiredTime,
          expiredDate: expiredDate,
          expiredAction: 2,
          requestTile: requestTile,
          requestOfGroup: groupId,
          requestDescription: requestDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token, 
          },
        }
      );
      if (response.status !== 200) {
        setsubjectClass("");
        setexpiredTime("");
        setexpiredDate("");
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


  const handleExpiredDateChange = (e) => {
    setexpiredDate(e.target.value);
    validateDateTime(e.target.value, expiredTime);
  };

  const handleExpiredTimeChange = (e) => {
    setexpiredTime(e.target.value);
    validateDateTime(expiredDate, e.target.value);
  };

  const validateDateTime = (date, time) => {
    const currentDate = new Date();
    const selectedDate = new Date(`${date}T${time}`);

    if (selectedDate <= currentDate) {
      setDateError(
        "Ngày và giờ hết hạn không được nhỏ hơn ngày và giờ hiện tại."
      );
    } else {
      setDateError("");
    }
  };

  const project = listProject.length > 0 ? listProject[0] : null;

  useEffect(() => {
    const token = localStorage.getItem("token");

    const loadProjects = async () => {
      try {
        const data = await fetchListProject(groupId, token);
        setListProject(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    if (groupId) {
      loadProjects();
    }
  }, [groupId]);

  useEffect(() => {
    if (project) {
      setrequestOfProject(project.projectId);
    }
  }, [project, setrequestOfProject]);

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="createreport">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleAddReportRequest}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Chủ đề báo cáo: </label>
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
                            onChange={handleExpiredDateChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Thời gian hết hạn: </label>
                          <input
                            type="time"
                            className="form-control"
                            placeholder="Thời gian hết hạn"
                            value={expiredTime}
                            onChange={handleExpiredTimeChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Mô tả: </label>
                          <input
                            type="text"
                            placeholder="Mô tả"
                            className="form-control"
                            value={requestDescription}
                            onChange={(e) =>
                              setrequestDescription(e.target.value)
                            }
                          />
                        </div>
                        
                      </div>
                    </div>
                    {dateError && (
                      <div className="alert alert-danger">{dateError}</div>
                    )}
                    {error && <div className="error">{error}</div>}
                    {successMessage && (
                      <div className="success">{successMessage}</div>
                    )}
                    <button
                      className="btn btn-primary mt-3"
                      type="submit"
                      disabled={!!dateError}
                    >
                      Gửi
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReport;
