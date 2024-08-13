import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import { BE_URL } from "../../../utils/Url_request";
import { useParams } from "react-router-dom";
import css from "./css/listproject.css";
import { useNavigate } from "react-router-dom";
import del from "../../Admin/imgAdmin/delete.png";
import update from "../../Admin/imgAdmin/update.png";


const ListProjectOfClass = () => {
  const { classId } = useParams();
  const [listProject, setListProject] = useState([]);
  const subjectName = localStorage.getItem("subjectName");
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProjectList = async (classId, token) => {
    try {
      const response = await fetch(
        `${BE_URL}/api-gv/classId/project-list/${classId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error("Error fetching project list:", error);
      throw error;
    }
  };

  const loadProject = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const data = await fetchProjectList(classId, token);
      setListProject(data);
    } catch (error) {
      console.error("Error loading project list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classId) {
      loadProject();
    }
  }, [classId]);
  const handleDeleteProject = async (projectId) => {
    if (!projectId) {
      console.error("Project ID is missing or undefined");
      window.alert("Project ID is missing or undefined");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      window.alert("No token found");
      return;
    }

    const confirmed = window.confirm("Bạn có chắc muốn xóa dự án này không?");
    if (!confirmed) {
      return;
    }

    try {
      const responseDelete = await fetch(
        `${BE_URL}/api-gv/project/delete/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (responseDelete.ok) {
        setProjectList(
          projectList.filter((project) => project.projectId !== projectId)
        );
        window.alert("Xóa dự án thành công.");
        fetchProjectList();
      } else {
        const errorData = await responseDelete.json();
        console.error("Error deleting group:", errorData.message);
        window.alert("Xảy ra lỗi khi xóa nhóm: " + errorData.message);
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      window.alert("Không thể xóa.");
    }
  };
  //update
  const handleUpdate = (listproject) => {
    navigate(`/editproject/${classId}`, {
      state: { listproject, projectName: listproject.projectName },
    });
  };
  return (
    <div>
      <Navbar />
      <DetailClass />
      {listProject.length > 0 && (
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="container-listproject">
                <p className="listgroup">
                  Danh sách đồ án của lớp môn học {subjectName}
                </p>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered custom-table large-table">
                    <thead>
                      <tr className="text-center align-middle">
                        <th>STT</th>
                        <th>Tên Đề Tài</th>
                        <th>Mô tả</th>
                        <th>Thời gian hết hạn</th>
                        <th>Ngày kết thúc</th>
                        <th colSpan="2">Hành động</th>{" "}
                      </tr>
                    </thead>
                    <tbody>
                      {listProject.map((listproject, index) => (
                        <tr
                          key={listproject.projectId}
                          className="text-center align-middle"
                        >
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            {listproject.projectName}
                          </td>
                          <td className="text-center">
                            {listproject.projectDescription}
                          </td>
                          <td className="text-center">
                            {" "}
                            {listproject.expiredDay}
                          </td>
                          <td className="text-center">
                            {listproject.expiredTime}
                          </td>
                          <td className="text-center">
                            <img src={del} onClick={() =>
                                handleDeleteProject(listproject.projectId)
                              }/>
                          </td>
                          <td className="text-center">
                            <img src={update}  onClick={() => handleUpdate(listproject)}/>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProjectOfClass;
