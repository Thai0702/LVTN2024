import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import { BE_URL } from "../../../utils/Url_request";
import "./css/group.css";
import del from "../../Admin/imgAdmin/delete.png";
import update from "../../Admin/imgAdmin/update.png";
import detail from "../../Admin/imgAdmin/detail.png";

const Group = () => {
  const { classId } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const numberOfGroup = localStorage.getItem("numberOfGroup");
  const [groupList, setGroupList] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const type = localStorage.getItem("type");
  const [updateData, setUpdateData] = useState({
    classId: classId,
    groupName: "",
  });


  const fetchStudentList = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BE_URL}/api-gv/classId/group-list/${classId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setGroupList(data);
    } catch (error) {
      console.error("Error fetching group list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentList();
  }, [classId]);


  const handleDeleteGroup = async (groupId) => {
    if (!groupId) {
      console.error("Group ID is missing or undefined");
      window.alert("Group ID is missing or undefined");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      window.alert("No token found");
      return;
    }
    const confirmed = window.confirm("Bạn có chắc muốn xóa nhóm này không?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${BE_URL}/api/group/delete/${groupId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setGroupList(groupList.filter((group) => group.groupId !== groupId));
        window.alert("Xóa nhóm thành công.");
      } else {
        const errorData = await response.json();
        console.error("Error deleting group:", errorData.message);
        window.alert(`Xảy ra lỗi khi xóa nhóm: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      window.alert("Không thể xóa.");
    }
  };

 
  const handleUpdate = (groupItem) => {
    setUpdateData(groupItem);
    setShowUpdateForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  

    if (updateData.groupName.trim() === "") {
      alert("Vui lòng điền tên nhóm.");
      return;
    }
    try {
      const response = await fetch(`${BE_URL}/api/group/update/${updateData.groupId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
  
      if (response.ok) {
        setGroupList((prevList) =>
          prevList.map((item) =>
            item.groupId === updateData.groupId ? updateData : item
          )
        );
        setUpdateData({
          groupId: null,
          projectId: null,
          classId: classId,
          groupName: "",
        });
        setShowUpdateForm(false);
        window.alert("Cập nhật thành công!");
        fetchStudentList();
      } else {
        const errorData = await response.json();
        console.error("Failed to update group:", errorData.message);
        window.alert(`Lỗi khi cập nhật nhóm: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddGroupClick = () => {
    if (
      numberOfGroup === "null" ||
      numberOfGroup === null ||
      isNaN(numberOfGroup) ||
      numberOfGroup === 0
    ) {
      alert("Vui lòng chọn số lượng nhóm");
      navigate(`/methodGroup/${classId}`);
    } else if (groupList.length >= numberOfGroup) {
      alert("Số lượng nhóm đã đạt giới hạn");
      navigate(`/project/${classId}`);
    } else {
      navigate(`/addGroup/${classId}`);
    }
  };

  const isDisabled = groupList.length >= numberOfGroup;


  const [listProject, setListProject] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BE_URL}/api-gv/classId/project-list/${classId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setListProject(data))
      .catch((error) => console.error("Error fetching project list:", error));
  }, [classId]);

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="container-fluid">
        <div className="row">

          <div className="col-12">
            <div className="container-group">
              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <div style={{ position: "fixed", top: "170px", right: "50px" }}>
                    {type === "GV" && (
                      <button
                        className="btn btn-primary add-group-text"
                        onClick={handleAddGroupClick}
                        disabled={isDisabled}
                      >
                        Thêm nhóm
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {groupList.length > 0 && (
                <div className="mt-4 custom-width">
                  <p className="listgroup">Danh sách nhóm</p>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered custom-table">
                      <thead>
                        <tr className="text-center align-middle">
                          <th className="text-center">STT</th>
                          <th className="text-center">Tên nhóm</th>
                          <th className="text-center">Tên đề tài</th>
                          <th className="text-center" colSpan="3">
                            Hành động
                          </th>{" "}
                        </tr>
                      </thead>
                      <tbody>
                        {groupList.map((listgroup, index) => (
                          <tr key={listgroup.groupId} className="text-center align-middle">
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{listgroup.groupName}</td>
                            <td className="text-center">
                              {listgroup.projectId === null ? 'Chưa có đề tài' : listgroup.projectName}
                            </td>
                            <td className="text-center">
                                  <Link
                                    to={`/showmemberGroup/${listgroup.classId}/${listgroup.groupId}`}
                                  >
                                    <img src={detail}/>
                                  </Link>
                                  
                                </td>
                                <td className="text-center">
                                  <img src={del} onClick={() => handleDeleteGroup(listgroup.groupId)}/>
                                </td>
                                <td className="text-center">
                                  <img src={update} onClick={() => handleUpdate(listgroup)}/>
                                  {showUpdateForm && updateData.groupId === listgroup.groupId && (
                                <div className="update-form mt-3">
                                  <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                      <select
                                        className="form-control"
                                        name="projectId"
                                        onChange={handleInputChange}
                                        value={updateData.projectId || ""}
                                      >
                                        <option value="">Chọn đề tài</option>
                                        {listProject.map((project) => (
                                          <option key={project.projectId} value={project.projectId}>
                                            {project.projectName}
                                          </option>                                         
                                          
                                        ))}
                                      </select>
                                    </div>
                                    <div className="mb-3">
                                      <input
                                        type="text"
                                        name="groupName"
                                        value={updateData.groupName}
                                        onChange={handleInputChange}
                                        placeholder="Tên nhóm"
                                        className="form-control"
                                      />
                                    </div>
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                      style={{ marginLeft: '0cm' }}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Group;