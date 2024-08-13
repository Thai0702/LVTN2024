import React, { useState, useEffect } from "react";
import { BE_URL } from "../../../utils/Url_request";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import css from "./css/showmember.css";
import { fetchGroupMembers, fetchListProject, joinGroup } from "../../../services/apiShowmember";

const GroupList = () => {
  const { classId, groupId, projectId } = useParams();
  const [members, setMembers] = useState([]);
  const [maxMembers, setMaxMembers] = useState(0);
  const [currentMembers, setCurrentMembers] = useState(0);
  const navigate = useNavigate();
  const type = localStorage.getItem("type");
  const groupRegisterMethod = localStorage.getItem("groupRegisterMethod");
  const memberPerGroup = parseInt(localStorage.getItem("memberPerGroup"), 10);
  const [canCreateReport, setCanCreateReport] = useState(true); 
  console.log("so luong thanh vien cua nhom:", memberPerGroup);


  const [scores, setScores] = useState({}); 

  
  
  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const data = await fetchGroupMembers(classId, groupId, token);
            setMembers(data);
            setCurrentMembers(data.length);
            setMaxMembers(memberPerGroup);


            const initialScores = data.reduce((acc, member) => {
                acc[member.accountId] = member.score || ""; 
                return acc;
            }, {});
            setScores(initialScores);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    fetchData();
}, [classId, groupId, memberPerGroup]);



  const handleScoreChange = (studentId, score) => {

    setScores((prevScores) => ({
      ...prevScores,
      [studentId]: score,
    }));

const userToken = localStorage.getItem("token");
if (userToken) {
  fetch(`${BE_URL}/api/class/${classId}/group/${groupId}/students/${studentId}/score`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ score }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Score updated successfully");
      } else {
        console.error("Failed to update score");
      }
    })
    .catch((error) => console.error("Error updating score:", error));
}
};

  const handleJoinGroup = async () => {
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
        const response = await joinGroup(classId, groupId, token);

        if (response.status === 200) {
            window.alert("Tham gia nhóm thành công!");
            window.location.reload(false);
        } else if (response.status === 400) {
            const errorData = response.data;
            if (errorData.message === "Student already exists in a group for this class") {
                window.alert("Sinh viên đã có trong nhóm.");
            } else if (errorData.message === "GROUP FULL") {
                window.alert("Nhóm đã đủ thành viên.");
            } else {
                window.alert("Tham gia nhóm thất bại: " + errorData.message);
            }
        } else {
            const errorData = response.data;
            console.error("Error:", errorData.message);
            window.alert("Tham gia nhóm thất bại: " + errorData.message);
        }
    } catch (error) {
        console.error("Error:", error);
        window.alert("Tham gia nhóm thất bại !!");
    }
};
  
  


  const [listProject, setListProject] = useState([]);
  

  useEffect(() => {
    const getProjects = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }
        try {
            const data = await fetchListProject(groupId, token);
            setListProject(data);
            setCanCreateReport(data.length > 0);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    getProjects();
}, [groupId]);



  const handleCreateReport = () => {
    if (!canCreateReport) {
      window.alert("Vui lòng tạo ít nhất một project trước khi tạo báo cáo.");
      navigate(`/project/${classId}`);
    } else {
      navigate(`/createReport/${classId}/${groupId}`);
    }

  };

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

        setListProject((prevList) =>
          prevList.map((item) =>
            item.subjectClassId === updateData.projectId ? updateData : item
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
  const handleUpdate = (classItem) => {
    setUpdateData(classItem);
    setShowUpdateForm(true); 
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        

        <h2>Danh sách thành viên nhóm</h2>
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
            <p className="listmember">Thành viên của nhóm</p>
            <div
              className="table-responsive "
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <table className="table table-striped table-bordered custom-table">
                <thead>
                  <tr className="text-center align-middle">
                    <th>STT</th>
                    <th>Tên sinh viên</th>
                    <th>Mã số sinh viên</th>
                    <th>Hành động</th>

                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={member.groupId}>
                      <td>{index + 1}</td>
                      <td>{member.memberName}</td>
                      <td>{member.studentId}</td>
                      <td className="text-center">
                        {type !== "SV" &&

                          groupRegisterMethod !== "Tearch" && (
                            <button
                              onClick={() =>
                                handleDeleteSVOutGroup(member.accountId)
                              }
                              className="btn btn-outline-danger btn-sm me-5"
                            >
                              Xóa
                            </button>
                          )}
                        <Link to={`/showproject/${classId}/${groupId}`}>
                          <button className="btn btn-outline-success btn-sm">
                            Xem đồ án
                          </button>
                        </Link>
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
