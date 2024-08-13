import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import { useNavigate, useParams } from "react-router-dom";
import { BE_URL } from "../../../utils/Url_request";
import mehthodGroup from "./css/mehthodGroup.css";
import { fetchGroupListAPI, fetchStudentListAPI } from "../../../services/apiMethod";
const MethodAddGroup = () => {
  const { classId } = useParams();
  const subjectName = localStorage.getItem("subjectName");
  const description = localStorage.getItem("description");
  const schoolYear = localStorage.getItem("schoolYear");
  const numberOfGroup = localStorage.getItem("numberOfGroup");
  const memberPerGroup = localStorage.getItem("memberPerGroup");
  const groupRegisterMethod = localStorage.getItem("groupRegisterMethod");
  const token = localStorage.getItem("token");
  const [groupList, setGroupList] = useState([]);
  const nagavite = useNavigate();
  const [maxMemberOfGroup, setMaxMemberOfGroup] = useState(0);
  console.log("Maxxxx la:", maxMemberOfGroup);

  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchStudentList = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
        const data = await fetchStudentListAPI(classId, token);
        setStudentList(data);
    } catch (error) {

    } finally {
        setLoading(false);
    }
};
  useEffect(() => {
    fetchStudentList();
  }, [classId]);


  useEffect(() => {
    const fetchGroupList = async () => {
        try {
            const { groupList, maxMemberCount } = await fetchGroupListAPI(classId, token);
            setGroupList(groupList);
            setMaxMemberOfGroup(maxMemberCount);
        } catch (error) {

        }
    };

    fetchGroupList();
}, [classId, token]);


  const [updateData, setUpdateData] = useState({
    subjectName: subjectName,
    schoolYear: schoolYear,
    numberOfGroup: numberOfGroup,
    memberPerGroup: memberPerGroup,
    groupRegisterMethod: groupRegisterMethod,
    description: description,
  });
  const [classList, setClassList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (
      !updateData.numberOfGroup ||
      !updateData.memberPerGroup ||
      !updateData.groupRegisterMethod
    ) {
      alert("Vui lòng điền đủ thông tin !!");
      return;
    }
    if (
      studentList.length === 0 &&
      updateData.groupRegisterMethod === "RANDOM"
    ) {
      alert(
        "Vui lòng thêm danh sách sinh viên trước khi chọn phương thức RANDOM."
      );
      nagavite(`/people/${classId}`);
      return;
    }
    console.log("phuong thuc:", groupRegisterMethod);
    if (
      groupRegisterMethod === "RANDOM" &&
      updateData.groupRegisterMethod === "RANDOM"
    ) {
      alert("Không thể cập nhật với phương thức là " + groupRegisterMethod);
      return;
    }
    try {
      const response = await fetch(`${BE_URL}/api-gv/class/update/${classId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(updateData),
      });
      if (updateData.numberOfGroup <= 0 || updateData.memberPerGroup <= 0) {
        alert("Thành viên trong nhóm và số lượng nhóm phải lớn hơn 0");
        return;
      } else if (updateData.memberPerGroup < maxMemberOfGroup) {
        alert(
          "Số lượng thành viên không được nhỏ hơn số lượng thành viên hiện tại!!"
        );
        return;
      }
      if (response.ok) {
        setClassList((prevList) =>
          prevList.map((item) =>
            item.subjectClassId === classId ? updateData : item
          )
        );
        const { groupRegisterMethod } = updateData;
        localStorage.setItem("groupRegisterMethod", groupRegisterMethod);
        const { numberOfGroup } = updateData;
        localStorage.setItem("numberOfGroup", numberOfGroup);
        const { memberPerGroup } = updateData;
        localStorage.setItem("memberPerGroup", memberPerGroup);
        setUpdateData({
          numberOfGroup: numberOfGroup,
          memberPerGroup: memberPerGroup,
          groupRegisterMethod: groupRegisterMethod,
        });
        if (groupRegisterMethod === "RANDOM") {
          nagavite(`/people/${classId}`);
        } else {
          nagavite(`/group/${classId}`);
        }
      } else {
        console.error("Failed to update class");
      }
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleUpdate = (classItem) => {
    setUpdateData(classItem);
  };

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="methodaddgroup">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Phương thức chọn nhóm</h4>
                <br></br>
                <br></br>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Số lượng nhóm</label>
                    <input
                      className="form-control"
                      type="text"
                      name="numberOfGroup"
                      value={updateData.numberOfGroup}
                      onChange={handleInputChange}
                      placeholder="Số lượng nhóm"
                    />
                  </div>
                  <div className="form-group">
                    <label>Số lượng thành viên nhóm </label>
                    <input
                      className="form-control"
                      type="text"
                      name="memberPerGroup"
                      value={updateData.memberPerGroup}
                      onChange={handleInputChange}
                      placeholder="Số lượng thành viên trong nhóm"
                    />
                  </div>

                  <div className="form-group">
                    <label>Chọn phương thức </label>
                    <select
                      className="form-control"
                      name="groupRegisterMethod"
                      value={updateData.groupRegisterMethod}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled >Chọn phương thức</option>
                      <option value="Student">Sinh viên chọn nhóm</option>
                      <option value="Teacher">Giảng viên chọn nhóm</option>
                      {groupRegisterMethod !== "Student" &&
                        groupRegisterMethod !== "Teacher" &&
                        groupRegisterMethod !== "RANDOM" && (
                          <option value="RANDOM">Random</option>
                        )}
                    </select>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Lưu
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodAddGroup;
