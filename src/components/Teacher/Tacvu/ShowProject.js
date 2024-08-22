import React, { useState, useEffect } from "react";
import { BE_URL } from "../../../utils/Url_request";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import css from "./css/showproject.css";

const GroupProjects = () => {
  const { groupId } = useParams();
<<<<<<< HEAD
  const [projectOfGroup, setProjectOfGroup] = useState(null); // Set default to null
=======
  const [projectOfGroup, setProjectOfGroup] = useState(null); 
>>>>>>> bceddffe7ace06cec518b7a3c9cba2137b8ab815
  
  const createdByName = localStorage.getItem("createdByName");
  useEffect(() => {
    const fetchProjectOfGroup = async () => {
      try {
        const response = await fetch(`${BE_URL}/api/getProjectOfGroup/${groupId}`);
        const data = await response.json();
<<<<<<< HEAD
        setProjectOfGroup(data); // Set the single object
=======
        setProjectOfGroup(data); 
>>>>>>> bceddffe7ace06cec518b7a3c9cba2137b8ab815
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectOfGroup();
  }, [groupId]);
  const formatDate = (datetime) => {
    const date = new Date(datetime);
<<<<<<< HEAD
    return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
=======
    return date.toLocaleDateString("en-GB"); 
>>>>>>> bceddffe7ace06cec518b7a3c9cba2137b8ab815
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
<<<<<<< HEAD
    return date.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }); // Format: HH:mm
=======
    return date.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }); 
>>>>>>> bceddffe7ace06cec518b7a3c9cba2137b8ab815
  };
  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="showproject">
        <h1>Đồ án của nhóm</h1>
        <div className="container-rieng row">
          <div className="right-column col-md-7 mb-4">
            <div className="table-responsive">
              <table className="table table-striped table-bordered custom-table">
                <thead>
                  <tr className="text-center align-middle">
                    <th>Tên đồ án</th>
                    <th>Mô tả</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Giáo viên</th>
                  </tr>
                </thead>
                <tbody>
<<<<<<< HEAD
                  {projectOfGroup && ( // Check if projectOfGroup is not null
=======
                  {projectOfGroup && ( 
>>>>>>> bceddffe7ace06cec518b7a3c9cba2137b8ab815
                    <tr key={projectOfGroup.projectId} className="text-center align-middle">
                      <td>{projectOfGroup.projectName}</td>
                      <td>{projectOfGroup.projectDescription}</td>
                      <td>{formatDate(projectOfGroup.createdAt)}</td>
                      <td>{formatDate(projectOfGroup.expiredDay)}</td>
                      <td>{createdByName}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupProjects;