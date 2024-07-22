import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BE_URL } from "../../../utils/Url_request";
import Navbar from "../Navbar";
import DetailClass from "../DetailClass";
import css from "./css/Stream.css";
import axios from "axios";
const Stream = () => {
  const { classId } = useParams(); // Lấy classId từ URL
  // hiển thị hi tiết lớp môn học
  const [loading, setLoading] = useState(true);
  const [classDetail, setClassDetail] = useState(null);
  const [error, setError] = useState("");
  const fullName = localStorage.getItem("fullName");
  const type = localStorage.getItem("type");
  useEffect(() => {
    const fetchClassDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      if (!classId) {
        setError("Class ID is required");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BE_URL}/api-gv/class/get/${classId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token, // Add token to header
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const classDetailData = await response.json();
        setClassDetail(classDetailData);
        console.log("chao:", classDetailData);
        const { memberPerGroup } = classDetailData;
        localStorage.setItem("memberPerGroup", memberPerGroup);
        const { groupRegisterMethod } = classDetailData;
        localStorage.setItem("groupRegisterMethod", groupRegisterMethod);
        const { subjectName } = classDetailData;
        localStorage.setItem("subjectName", subjectName);
        const { schoolYear } = classDetailData;
        localStorage.setItem("schoolYear", schoolYear);
        console.log("số lượng thành viên nhóm:", memberPerGroup);
        const { numberOfGroup } = classDetailData;
        localStorage.setItem("numberOfGroup", numberOfGroup);
        console.log("số lượng nhóm:", numberOfGroup);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch class detail");
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetail();
  }, [classId]);

  //   hiển thị danh sách report
  //lấy danh sách report of class id
  const [reportList, setreportList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchReportList = async () => {
      try {
        const response = await fetch(
          `${BE_URL}/api-gv/report-request/${classId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setreportList(data);
      } catch (error) {
        console.error("Error fetching report list:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or an error occurs
      }
    };
    fetchReportList();
  }, [classId]);
  // delete report
  const [listReport, setListReport] = useState([]);

  const handleDeleteReport = async (requestId) => {
    if (!requestId) {
      console.error("request ID is missing or undefined");
      window.alert("request ID is missing or undefined");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      window.alert("No token found");
      return;
    }

    const confirmed = window.confirm("Bạn có chắc muốn xóa request này không?");
    if (!confirmed) {
      // Do not delete if user does not confirm
      return;
    }

    try {
      const responseDelete = await fetch(
        `${BE_URL}/api-gv/report-request/delete/${requestId}`,
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
        setListReport((prevListReport) =>
          prevListReport.filter((project) => project.requestId !== requestId)
        );
        window.alert("Xóa project thành công.");
        window.location.reload(true);
      } else {
        const errorData = await responseDelete.json();
        console.error(
          "Error deleting project:",
          errorData.message || responseDelete.statusText
        );
        window.alert(
          "Xảy ra lỗi khi xóa project: " +
            (errorData.message || responseDelete.statusText)
        );
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      window.alert("Xảy ra lỗi khi xóa request.");
    }
  };
  // update
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    requestOfProject: "",
    expiredTime: "",
    expiredDate: "",
    requestTile: "",
    requestDescription: "",
  });
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    for (const key in updateData) {
      if (!updateData[key]) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }
    }
    e.preventDefault();
    try {
      const response = await fetch(
        `${BE_URL}/api-gv/report-request/update/${updateData.requestId}`,
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
        setListReport((prevList) =>
          prevList.map((item) =>
            item.subjectClassId === updateData.subjectClassId
              ? updateData
              : item
          )
        );
        setUpdateData({
          requestOfProject: "",
          expiredTime: "",
          expiredDate: "",
          requestTile: "",
          requestDescription: "",
        });
        setShowUpdateForm(false);
        // Ẩn form cập nhật sau khi cập nhật thành công
        window.alert("Sửa thành công !!");
        window.location.reload(true);
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
  const handleUpdate = (reportItem) => {
    setUpdateData(reportItem);
    setShowUpdateForm(true); // Hiển thị form cập nhật khi nhấp vào "Cập nhật"
  };
  // add sinh vien bang ma sinh vien
////lấy danh sách report of class id
const [reportSv, setreportSv] = useState([]);
useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchReporSv = async () => {
        try {
            const response = await fetch(`${BE_URL}/report-requests`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setreportSv(data);
        } catch (error) {
            console.error('Error fetching report SV:', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched or an error occurs
        }
    };
    fetchReporSv();
}, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  if (!classDetail) {
    return <p>No class detail available</p>;
  }

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="container-stream">
        <div className="body-1">
          <p>{classDetail.subjectName}</p>
        </div>
        <div className="body-2">
          {type === "GV" && (
            <div className="body-code">
              <p>Code class</p>
              <p>{classDetail.inviteCode}</p>
            </div>
          )}
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered custom-table">
                    <thead>
                      <tr>
                        <th className="text-center">Chủ đề</th>
                        <th className="text-center">Ngày và giờ hết hạn</th>
                        <th className="text-center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {type === "GV" ? (
                        reportList.map((report) => (
                          <tr key={report.requestId}>
                            <td className="text-center">{report.requestTile}</td>
                            <td className="text-center">{report.expiredDate} / {report.expiredTime}</td>
                            <td className="text-center">
                              <div className="d-flex justify-content-center">
                                <Link to={`/upload/${classId}/${report.requestId}`} className="btn btn-primary me-2" style={{ width: '120px' }}>
                                  Xem chi tiết
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDeleteReport(report.requestId)} style={{ width: '120px' }}>
                                  DELETE
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        reportSv.map((reportsv) => (
                          <tr key={reportsv.requestId}>
                            <td className="text-center">{reportsv.requestTile}</td>
                            <td className="text-center">{reportsv.expiredDate} / {reportsv.expiredTime}</td>
                            <td className="text-center">
                              <Link to={`/upload/${classId}/${reportsv.requestId}`} className="btn btn-primary" style={{ width: '120px' }}>
                                Xem chi tiết
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default Stream;
