import React, { useRef, useState, useEffect } from "react";
import { BE_URL } from "../../../utils/Url_request";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";

const AddGroup = () => {
  const { classId } = useParams();
  const createClassRef = useRef();
  const navigate = useNavigate();
  const numberOfGroup = parseInt(localStorage.getItem("numberOfGroup"), 10);

  const [groupData, setGroupData] = useState({
    classId: classId,
    groupName: "",
    projectId: null,
  });

  const [currentGroupCount, setCurrentGroupCount] = useState(1);
  const [groupList, setGroupList] = useState([]);
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

  useEffect(() => {
    const fetchGroupCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${BE_URL}/api-gv/classId/group-list/${classId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCurrentGroupCount(data.length);
        } else {
          console.error("Failed to fetch group list");
        }
      } catch (error) {
        console.error("Error fetching group list:", error);
      }
    };

    fetchGroupCount();
  }, [classId]);

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!groupData.groupName) {
      window.alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BE_URL}/api/class/create-a-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ ...groupData }),
      });

      if (response.ok) {
        alert("Thêm nhóm thành công!");
        if (currentGroupCount + 1 >= numberOfGroup) {
          navigate(`/project/${classId}`);
        }
      } else {
        window.alert("Thêm nhóm thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteGroup = async (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa nhóm này không?");
    if (!confirmed) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const url = `${BE_URL}/api/group/${id}`;
      const responseDelete = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (responseDelete.ok) {
        alert("Xóa nhóm thành công!");
        setCurrentGroupCount(currentGroupCount - 1);
      } else {
        console.error("Failed to delete group");
        alert("Đã xảy ra lỗi khi xóa nhóm!");
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      alert("Đã xảy ra lỗi khi xóa nhóm!");
    }
  };

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div ref={createClassRef}>
        <div className="col-md-6">
          <div className="adgroup">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Tạo nhóm</h2>
                <div className="form-group">
                  <label>Tên nhóm: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="groupName"
                    value={groupData.groupName}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleCreateGroup}>
                  Tạo nhóm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddGroup;