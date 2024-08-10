import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import { BE_URL } from "../../../utils/Url_request";
import "./css/group.css";
import { deleteGroup } from "../../../services/apiGroup";


const Group = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const numberOfGroup = localStorage.getItem("numberOfGroup");
  console.log("chao so luong", numberOfGroup);
  const [groupList, setGroupList] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const type = localStorage.getItem("type");
  const [updateData, setUpdateData] = useState({
    leaderId: "",
    classId: classId,
    groupName: "",
  });

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
      .catch((error) => console.error("Error fetching group list:", error));
  }, [classId]);


//xoa group
  // const handleDeleteGroup = async (groupId) => {
  //   if (!groupId) {
  //     console.error("Group ID is missing or undefined");
  //     window.alert("Group ID is missing or undefined");
  //     return;
  //   }
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.error("No token found");
  //     window.alert("No token found");
  //     return;
  //   }

  //   const confirmed = window.confirm("Bạn có chắc muốn xóa nhóm này không?");
  //   if (!confirmed) {
  //     return;
  //   }

  //   try {
  //     const responseDelete = await fetch(
  //       `${BE_URL}/api/group/delete/${groupId}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );

  //     if (responseDelete.ok) {
  //       setGroupList(groupList.filter((group) => group.groupId !== groupId));
  //       window.alert("Xóa nhóm thành công.");
  //     } else {
  //       const errorData = await responseDelete.json();
  //       console.error("Error deleting group:", errorData.message);
  //       window.alert("Xảy ra lỗi khi xóa nhóm: " + errorData.message);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting group:", error);
  //     window.alert("Không thể xóa.");
  //   }
  // };
  const handleDeleteGroup = async (groupId) => {
    if (!groupId) {
      console.error('Group ID is missing or undefined');
      window.alert('Group ID is missing or undefined');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      window.alert('No token found');
      return;
    }

    const confirmed = window.confirm('Bạn có chắc muốn xóa nhóm này không?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteGroup(groupId, token);
      setGroupList(groupList.filter(group => group.groupId !== groupId));
      window.alert('Xóa nhóm thành công.');
    } catch (error) {
      console.error('Error deleting group:', error);
      window.alert('Xảy ra lỗi khi xóa nhóm: ' + error.message);
    }
  };



  const handleUpdate = (groupItem) => {
    setUpdateData(groupItem);
    setShowUpdateForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    for (const key in updateData) {
      if (!updateData[key]) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }
    }

    try {
      const response = await fetch(
        `${BE_URL}/api/group/update/${updateData.groupId}`,
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
        setGroupList((prevList) =>
          prevList.map((item) =>
            item.groupId === updateData.groupId ? updateData : item
          )
        );
        setUpdateData({
          leaderId: "",
          classId: classId,
          groupName: "",
        });
        setShowUpdateForm(false);
        window.alert("Update success!");
      } else {
        console.error("Failed to update group");
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

  const nn = groupList.length;
  console.log("chao sô lượng nhom", nn);
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
      navigate(`/project/${classId}`)
      return;
    } else if (numberOfGroup === 0) {
    } else {
      navigate(`/addGroup/${classId}`);
    }
  };
  const isDisabled = groupList.length >= numberOfGroup;


 


  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="container-fluid">
        <div className="row">
          {" "}
          {/* Hàng cho list group */}
          <div className="col-12">
            <div className="container-group">
              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <div
                    style={{ position: "fixed", top: "170px", right: "50px" }}
                  >
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
                <div className=" mt-4 custom-width">
                  <p className="listgroup">Danh sách nhóm</p>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered custom-table">
                      <thead>
                        <tr>
                          <th className="text-center">STT</th>
                          <th className="text-center">Mã lớp</th>
                          <th className="text-center">Tên nhóm</th>
                          <th className="text-center">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupList.map((listgroup, index) => (
                          <tr key={listgroup.groupId}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{listgroup.classId}</td>
                            <td className="text-center">
                              {listgroup.groupName}
                              {/* <Link
                              className="link"
                              to={`/showmemberGroup/${listgroup.classId}/${listgroup.groupId}`}
                            >
                              {listgroup.groupName}
                            </Link> */}
                            </td>
                            <td className="text-center">
                              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                <Link
                                  to={`/showmemberGroup/${listgroup.classId}/${listgroup.groupId}`}
                                  className="btn btn-info"
                                >
                                  XEM CHI TIẾT
                                </Link>
                                <button
                                  onClick={() =>
                                    handleDeleteGroup(listgroup.groupId)
                                  }
                                  className="btn btn-danger"
                                  type="delete"
                                >
                                  XÓA
                                </button>
                                <button
                                  onClick={() => handleUpdate(listgroup)}
                                  className="btn btn-update"
                                  type="update"
                                  style={{
                                    backgroundColor: "gray",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 20px",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                  }}
                                >
                                  CẬP NHẬT
                                </button>
                              </div>
                              {showUpdateForm &&
                                updateData.groupId === listgroup.groupId && (
                                  <div className="update-form mt-3">
                                    <form onSubmit={handleSubmit}>
                                      <div className="mb-3">
                                        <input
                                          type="text"
                                          name="leaderId"
                                          value={updateData.leaderId}
                                          onChange={handleInputChange}
                                          placeholder="Mã leader"
                                          className="form-control"
                                        />
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
