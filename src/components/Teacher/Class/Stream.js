import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BE_URL } from "../../../utils/Url_request";
import Navbar from "../Home/Navbar";
import DetailClass from "./DetailClass";
import css from "./css/Stream.css";
import axios from "axios";
import {
  deleteReportRequest,
  fetchClassDetail,
  fetchReportList,
} from "../../../services/apiStream";
import Sidebar from "../Home/Sidebar";
import del from "../../Admin/imgAdmin/delete.png";
import update from "../../Admin/imgAdmin/update.png";
import detail from "../../Admin/imgAdmin/detail.png";


const Stream = () => {
  const { classId } = useParams(); 
  // hiển thị hi tiết lớp môn học
  const [loading, setLoading] = useState(true);
  const [classDetail, setClassDetail] = useState(null);
  const [error, setError] = useState("");
  const fullName = localStorage.getItem("fullName");
  const type = localStorage.getItem("type");
  
  useEffect(() => {
    fetchClassDetail(classId, setClassDetail, setLoading, setError);
  }, [classId]);


  const [reportList, setreportList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const loadReportList = async () => {
      try {
        const data = await fetchReportList(classId, token);
        setreportList(data);
      } catch (error) {
        console.error("Error loading report list:", error);
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      loadReportList();
    }
  }, [classId]);



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
      return;
    }

    try {
      const responseDelete = await deleteReportRequest(requestId, token);

      if (responseDelete.status === 200) {
        setListReport((prevListReport) =>
          prevListReport.filter((project) => project.requestId !== requestId)
        );
        window.alert("Xóa request thành công.");
        window.location.reload(true);
      } else {
        console.error("Error deleting request:", responseDelete.statusText);
        window.alert("Xảy ra lỗi khi xóa request.");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      window.alert("Xảy ra lỗi khi xóa request.");
    }
  };

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // update
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

        window.alert("Sửa thành công !!");
        window.location.reload(true);
      } else {
        console.error("Failed to update class");
      }
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  const [reportSv, setreportSv] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchReporSv = async () => {
      try {
        const response = await fetch(`${BE_URL}/report-requests`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setreportSv(data);
      } catch (error) {
        console.error("Error fetching report SV:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchReporSv();
  }, []);
  const navigate = useNavigate();
 

  const handleUpdate = (listreport) => {
    navigate(`/editreport/${classId}`, {
      state: { listreport, requestTile: listreport.requestTile },
    });
  };
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
        <li>
          <a
            href="https://docs.google.com/document/d/1ENdOZI8vmVZyLxHy9QZVZvJBqCzvefKw/edit?usp=drive_link&ouid=
        105753820574402795694&rtpof=true&sd=true"
          >
            Tài liệu hướng dẫn sử dụng
          </a>
        </li>
        <li>
          <a
            href="https://docs.google.com/spreadsheets/d/1eqbVrt93ZJmFtpkQ68cvG3jLpFPykVG6/edit?usp=
      drive_link&ouid=105753820574402795694&rtpof=true&sd=true"
          >
            Mẫu file Excel danh sách sinh viên
          </a>
        </li>
        <h4 className="name">
          Giáo viên hướng dẫn : {classDetail.createdByName}
        </h4>
        <div
          className="body-stream"
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <span>
            <strong>Tên lớp môn học:</strong> {classDetail.subjectName}
          </span>

          <span>
            <strong>Năm học:</strong> {classDetail.schoolYear}
          </span>
          <span>
            <strong>Mô tả:</strong> {classDetail.description}
          </span>
        </div>

        <div className="body-2">
          {type === "GV" && (
            <div className="body-code">
              <p>Mã lớp</p>
              <p>{classDetail.inviteCode}</p>
            </div>
          )}
          {reportList.length > 0 && (
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered custom-table">
                      <thead>
                        <tr>
                          <th className="text-center">Chủ đề</th>
                          <th className="text-center">Ngày và giờ hết hạn</th>
                          <th className="text-center" colSpan="3">
                           Hành động
                          </th>{" "}
                        </tr>
                      </thead>
                      <tbody>
                        {type === "GV"
                          ? reportList.map((report) => (
                              <tr key={report.requestId}>
                                <td className="text-center align-middle">
                                  {report.requestTile}
                                </td>
                                <td className="text-center align-middle">
                                  {report.expiredDate} / {report.expiredTime}
                                </td>
                                {/* Separate cells for each action */}
                                <td className="text-center">
                                  <Link
                                    to={`/upload/${classId}/${report.requestId}`}
                                  >
                                    <img src={detail}/>
                                  </Link>
                                  
                                </td>
                                <td className="text-center">
                                  <img src={del} onClick={() =>
                                      handleDeleteReport(report.requestId)
                                    }/>
                                </td>
                                <td className="text-center">
                                  <img src={update} onClick={() => handleUpdate(report)}/>
                                </td>
                              </tr>
                            ))
                          : reportSv.map((reportsv) => (
                              <tr key={reportsv.requestId}>
                                <td className="text-center">
                                  {reportsv.requestTile}
                                </td>
                                <td className="text-center">
                                  {reportsv.expiredDate} /{" "}
                                  {reportsv.expiredTime}
                                </td>
                                <td className="text-center">
                                  <Link
                                    to={`/upload/${classId}/${reportsv.requestId}`}
                                  >
                                    <img src={detail} />
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Stream;
