import React, { useState, useEffect } from "react";
import { BE_URL } from "../../../utils/Url_request";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import css from "./css/showproject.css";

const GroupProjects = () => {
  const { groupId } = useParams();
  const [projectOfGroup, setProjectOfGroup] = useState(null); 
  
  const createdByName = localStorage.getItem("createdByName");
  useEffect(() => {
    const fetchProjectOfGroup = async () => {
      try {
        const response = await fetch(`${BE_URL}/api/getProjectOfGroup/${groupId}`);
        const data = await response.json();
        setProjectOfGroup(data); 
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectOfGroup();
  }, [groupId]);
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString("en-GB"); 
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }); 
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
                  {projectOfGroup && ( 
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