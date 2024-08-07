// src/components/Project/GroupProjects.js

import React, { useState, useEffect } from "react";
import { BE_URL } from "../../../utils/Url_request";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import css from "./css/showproject.css"

const GroupProjects = () => {
  const { classId, groupId } = useParams();
  const [listProject, setListProject] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    projectName: "",
    projectOfGroup: groupId,
    projectDescription: "",
    expiredDay: "",
    expiredTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteProject = async (projectId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const confirmed = window.confirm("Bạn có chắc muốn xóa project này không?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${BE_URL}/api-gv/project/delete/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        setListProject(
          listProject.filter((project) => project.projectId !== projectId)
        );
        window.alert("Xóa project thành công.");
      } else {
        const errorData = await response.json();
        console.error("Error deleting project:", errorData.message);
        window.alert("Xảy ra lỗi khi xóa project: " + errorData.message);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      window.alert("Xảy ra lỗi khi xóa project.");
    }
  };

  const handleUpdate = (project) => {
    setUpdateData(project);
    setShowUpdateForm(true);
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const response = await fetch(
        `${BE_URL}/api-gv/project/update/${updateData.projectId}`,
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
        setListProject((prevList) =>
          prevList.map((item) =>
            item.projectId === updateData.projectId ? updateData : item
          )
        );
        setShowUpdateForm(false);
        fetchListProject();
      } else {
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const fetchListProject = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${BE_URL}/api-gv/group/projects/${groupId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      const data = await response.json();
      setListProject(data);
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchListProject();
  }, []);

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="showproject">
      <h1>Đồ án của nhóm</h1>
      <div className="container-rieng row">
        {listProject.length > 0 && (
          <div className="right-column col-md-7 mb-4">
            <div className="table-responsive">
              <table className="table table-striped table-bordered custom-table">
                <thead>
                  <tr>
                    <th>Tên đồ án</th>
                    <th>Mô tả</th>
                    <th>Ngày hết hạn</th>
                    <th>Thời gian hết hạn</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {listProject.map((project) => (
                    <tr key={project.projectId}>
                      <td>{project.projectName}</td>
                      <td>{project.projectDescription}</td>
                      <td>{project.expiredDay}</td>
                      <td>{project.expiredTime}</td>
                      <td>
                        <div className="d-flex justify-content-start">
                          <button
                            onClick={() => handleDeleteProject(project.projectId)}
                            className="btn btn-danger btn-sm me-2"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleUpdate(project)}
                            className="btn btn-success btn-sm"
                          >
                            Update
                          </button>
                        </div>
                        {showUpdateForm && updateData.projectId === project.projectId && (
                          <div className="update-form-project mt-2">
                            <form onSubmit={handleSubmit}>
                              <div className="mb-3">
                                <label htmlFor="projectName">Tên đồ án: </label>
                                <input
                                  id="projectName"
                                  type="text"
                                  name="projectName"
                                  value={updateData.projectName}
                                  onChange={handleInputChange}
                                  placeholder="Tên đồ án"
                                  className="form-control"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="projectDescription">Mô tả: </label>
                                <input
                                  id="projectDescription"
                                  type="text"
                                  name="projectDescription"
                                  value={updateData.projectDescription}
                                  onChange={handleInputChange}
                                  placeholder="Mô tả"
                                  className="form-control"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="expiredDay">Ngày hết hạn: </label>
                                <input
                                  id="expiredDay"
                                  type="date"
                                  name="expiredDay"
                                  value={updateData.expiredDay}
                                  onChange={handleInputChange}
                                  placeholder="Ngày hết hạn"
                                  className="form-control"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="expiredTime">Thời gian hết hạn: </label>
                                <input
                                  id="expiredTime"
                                  type="time"
                                  name="expiredTime"
                                  value={updateData.expiredTime}
                                  onChange={handleInputChange}
                                  placeholder="Thời gian hết hạn"
                                  className="form-control"
                                />
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Lưu
                              </button>
                            </form>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default GroupProjects;
