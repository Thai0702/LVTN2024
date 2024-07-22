import React, { useState, useEffect } from "react";
import { BE_URL } from "../../../utils/Url_request";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import DetailClass from "../DetailClass";
import css from "./css/showmember.css";

const GroupList = () => {
  const { classId, groupId, projectId } = useParams();
  const [members, setMembers] = useState([]);
  const [maxMembers, setMaxMembers] = useState(0);
  const [currentMembers, setCurrentMembers] = useState(0);
  const navigate = useNavigate();
  const type = localStorage.getItem("type");
  const groupRegisterMethod = localStorage.getItem("groupRegisterMethod");
  const memberPerGroup = parseInt(localStorage.getItem("memberPerGroup"), 10);
  const [canCreateReport, setCanCreateReport] = useState(true); // State to determine if report can be created
  console.log("so luong thanh vien cua nhom:", memberPerGroup);
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      console.error("No token found");
      return;
    }
    fetch(`${BE_URL}/api/class/${classId}/group/${groupId}/students`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
        setCurrentMembers(data.length);
        setMaxMembers(memberPerGroup);
      })
      .catch((error) => console.error("Error fetching members:", error));
  }, [classId, groupId, memberPerGroup]);

  const joinGroup = async () => {
    if (currentMembers > maxMembers) {
      window.alert("Nhóm đã đủ thành viên");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(
        `${BE_URL}/api/class/${classId}/group/${groupId}/join-group`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        window.alert("Tham gia nhóm thành công!");
        window.location.reload(false);
      } else if (response.status === 400) {
        const errorData = await response.json();
        if (
          errorData.message ===
          "Student already exists in a group for this class"
        ) {
          window.alert("Sinh viên đã có trong nhóm.");
        } else if (errorData.message === "GROUP FULL") {
          window.alert("Nhóm đã đủ thành viên.");
        } else {
          window.alert("Tham gia nhóm thất bại: " + errorData.message);
        }
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        window.alert("Tham gia nhóm thất bại: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("Tham gia nhóm thất bại !!");
    }
  };

  // get list project of group
  const [listProject, setListProject] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchListProject = async () => {
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
        // Update canCreateReport state based on whether listProject is empty or not
        setCanCreateReport(data.length > 0);
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };
    fetchListProject();
  }, [groupId]);
  const handleCreateReport = () => {
    if (!canCreateReport) {
      window.alert("Vui lòng tạo ít nhất một project trước khi tạo báo cáo.");
      navigate(`/project/${classId}`);
    } else {
      navigate(`/createReport/${classId}/${groupId}`);
    }
    // Handle create report logic
  };
  // delete project og group
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

    const confirmed = window.confirm("Bạn có chắc muốn xóa project này không?");
    if (!confirmed) {
      // Do not delete if user does not confirm
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
        // Remove project from list if deletion is successful
        setListProject(
          listProject.filter((project) => project.projectId !== projectId)
        );
        window.alert("Xóa project thành công.");
      } else {
        const errorData = await responseDelete.json();
        console.error("Error deleting project:", errorData.message);
        window.alert("Xảy ra lỗi khi xóa project: " + errorData.message);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      window.alert("Xảy ra lỗi khi xóa project.");
    }
  };
  // upload project
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    projectName: "",
    projectOfGroup: groupId,
    projectDescription: "",
    expiredDay: "",
    expiredTime: "",
  });
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
        // Cập nhật trực tiếp danh sách lớp sau khi cập nhật thành công
        setListProject((prevList) =>
          prevList.map((item) =>
            item.subjectClassId === updateData.projectId ? updateData : item
          )
        );
        setUpdateData({
          projectName: "",
          projectOfGroup: groupId,
          projectDescription: "",
          expiredDay: "",
          expiredTime: "",
        });
        setShowUpdateForm(false); // Ẩn form cập nhật sau khi cập nhật thành công
      } else {
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };
  const handleUpdate = (classItem) => {
    setUpdateData(classItem);
    setShowUpdateForm(true); // Hiển thị form cập nhật khi nhấp vào "Cập nhật"
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // delete student out group
  const handleDeleteSVOutGroup = async (id) => {
    const token = localStorage.getItem("token");
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa thành viên này không?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const url = `${BE_URL}/api-gv/delete/group/${groupId}/members/${id}`;
      const responseDelete = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (responseDelete.ok) {
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.accountId !== id)
        );
        setCurrentMembers((prev) => prev - 1);
        window.alert("Bạn đã xóa sinh viên với mã " + id);
      } else {
        console.error("Failed to delete student");
        window.alert("Xóa sinh viên không thành công!");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      window.alert("Đã xảy ra lỗi khi xóa sinh viên!");
    }
  };

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="showmember">
        <h1>Group Member</h1>
        <div className="container-chung">
          <div className="">
            {type !== "GV" &&
              groupRegisterMethod !== "RANDOM" &&
              groupRegisterMethod !== "Tearch" && (
                <div className="tbc">
                  <button onClick={joinGroup} class="btn btn-outline">
                    Tham Gia Nhóm
                  </button>
                </div>
              )}
          </div>
          {type !== "SV" && (
            <div className="tbc">
              <Link to={`/createReport/${classId}/${groupId}`}>
                {" "}
                <button class="btn btn-outline">Tạo Báo Cáo</button>
              </Link>
            </div>
          )}
        </div>

        <div className="container-rieng row">
          <div className="left-column col-md-5 mb-4">
            <p className="listmember">List Member Group</p>
            <div
              className="table-responsive "
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <table className="table table-striped table-bordered custom-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên sinh viên</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={member.groupId}>
                      <td>{index + 1}</td>
                      <td>{member.memberName}</td>
                      <td className="text-center">
                        {type !== "SV" &&
                          // groupRegisterMethod !== "RANDOM" &&
                          groupRegisterMethod !== "Tearch" && (
                            <button
                              onClick={() =>
                                handleDeleteSVOutGroup(member.accountId)
                              }
                              className="btn btn-outline-danger btn-sm "
                            >
                              Remove
                            </button>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="right-column col-md-7 mb-4">
            <p className="project">Project Of Group</p>
            <div className="table-responsive">
              <table className="table table-striped table-bordered custom-table">
                <thead>
                  <tr>
                    <th>Tên đồ án</th>
                    <th>Ngày hết hạn</th>
                    <th>Thời gian hết hạn</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {listProject.map((project) => (
                    <tr key={project.projectId}>
                      <td>{project.projectName}</td>
                      <td>{project.expiredDay}</td>
                      <td>{project.expiredTime}</td>
                      <td>
                        <div className="d-flex justify-content-start">
                          <button
                            onClick={() =>
                              handleDeleteProject(project.projectId)
                            }
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
                        {showUpdateForm &&
                          updateData.projectId === project.projectId && (
                            <div className="update-form-project mt-2">
                              <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                  <label htmlFor="projectName">
                                    Tên đồ án:{" "}
                                  </label>
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
                                  <label htmlFor="projectDescription">
                                    Mô tả:{" "}
                                  </label>
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
                                  <label htmlFor="expiredDay">
                                    Ngày hết hạn:{" "}
                                  </label>
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
                                  <label htmlFor="expiredTime">
                                    Thời gian hết:{" "}
                                  </label>
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
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
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
        </div>
      </div>
    </div>
  );
};

export default GroupList;
