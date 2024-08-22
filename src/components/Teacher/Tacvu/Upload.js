import Navbar from "../Home/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import DetailClass from "../Class/DetailClass";
import "./css/upload.css";
import cancel from "../../img/cancel.png";
import logo_drive from "../../img/logo_drive.png";
import bin from "../../Admin/imgAdmin/bin.png";
import {
  deleteAllSubmitReportsByRequestId,
  deleteSubmitReportsBySubmitId,
  getAllFeedbackBySubmitId,
  getAllSubmitReportsByRequestId,
  saveFeedback,
} from "../../../services/apiService";
import { useEffect, useState } from "react";
import { BE_URL } from "../../../utils/Url_request";
import axios from "axios";

const GoogleDriverPicker = () => {
  const { requestId, classId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [message, setMessage] = useState("");
  const accountId = localStorage.getItem("accountId");
  const [loading, setLoading] = useState(true);
  const [reportDetail, setReportDetail] = useState(null);
  const [error, setError] = useState("");
  const type = localStorage.getItem("type");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isClick, setClick] = useState(false);
  const navigate = useNavigate();
  const toggleSubmit = () => {
    setClick(!isClick);
    setIsSubmit(!isSubmit);
  };

  const [isExpired, setIsExpired] = useState(false); 

  useEffect(() => {
    const fetchReportDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BE_URL}/api/report-request/${requestId}`,
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
        setReportDetail(data);


        const currentTime = new Date();
        const expirationTime = new Date(
          `${data.expiredDate}T${data.expiredTime}`
        );
        if (currentTime > expirationTime) {
          setIsExpired(true);
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch report detail");
      } finally {
        setLoading(false);
      }
    };

    fetchReportDetail();
  }, [requestId]);

  const [reports, setReports] = useState([]);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getAllSubmitReportsByRequestId(requestId);
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [requestId]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const handleDeleteAllSubmit = async (id) => {
    const confirmed = window.confirm("Bạn có muốn hủy bài nộp này không?");
    if (!confirmed) {
      return;
    }
    try {
      const data = await deleteAllSubmitReportsByRequestId(requestId);
      setReports([]);
      window.alert("Hủy bài nộp thành công!");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi hủy bài nộp! ", error);
      window.alert("Đã xảy ra lỗi khi hủy bài nộp!");
    }
  };

  const handleDeleteSubmit = async (submitId) => {
    try {
      await deleteSubmitReportsBySubmitId(submitId);
      const newReports = await getAllSubmitReportsByRequestId(requestId);
      setReports(newReports);
      return;
    } catch (error) {
      console.error("Đã xảy ra lỗi khi hủy bài nộp! ", error);
      window.alert("Đã xảy ra lỗi khi hủy bài nộp!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("submitBy", accountId);
    formData.append("reportOfRequest", requestId);
    formData.append("reportTitle", reportTitle);
    formData.append("reportDescription", reportDescription);
    attachments.forEach((file) => {
      formData.append("attachment", file);
    });
    try {
      const response = await axios.post(
        `${BE_URL}/api/report/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Submit success!!");
        setIsSubmitted(true);
        setReportTitle("");
        setReportDescription("");
        setAttachments([]);
        document.getElementById("fileInput").value = null;
        const newReports = await getAllSubmitReportsByRequestId(requestId);
        setReports(newReports);
        toggleSubmit(false);
      } else {
        setMessage("There was an error submitting the report.");
      }
    } catch (error) {
      console.error("There was an error uploading the file!", error);
      alert("Vui lòng gửi lại !");
    }
  };

  const [feedbackData, setFeedabckData] = useState({
    feedbackOfRequestId: requestId,
    contentFeedback: "",
    score: null,
  });

  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BE_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ ...feedbackData }),
      });

      if (response.ok) {
        const newFeedback = await getAllFeedbackBySubmitId(requestId);
        setFeedback(newFeedback);
        setFeedabckData({
          feedbackOfRequestId: requestId,
          contentFeedback: "",
          score: 0,
        });
      } else {
        window.alert("feedback failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getAllFeedbackBySubmitId(requestId);
        setFeedback(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [requestId]);

  const handleChange = (e) => {
    setFeedabckData({ ...feedbackData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!reportDetail) {
    return <p>No report detail available</p>;
  }

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="container-upload">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7 col-12 mb-2">
              <div className="showRequest table-responsive">
                <table className="table table-bordered custom-table">
                  <tbody>
                    <tr>
                      <th className="col-3">Tiêu đề:</th>
                      <td>{reportDetail.requestTile}</td>
                    </tr>
                    <tr>
                      <th>Ngày giờ hết hạn:</th>
                      <td>
                        {reportDetail.expiredDate} / {reportDetail.expiredTime}
                      </td>
                    </tr>
                    <tr>
                      <th>Mô tả:</th>
                      <td>{reportDetail.requestDescription}</td>
                    </tr>
                  </tbody>
                </table>
                {isExpired && (
                  <p className="text-danger">Đã quá thời gian quy định!</p>
                )}
              </div>
              <div className="containSubmit mt-5">
                <div className="submitRequest">
                  <div className="card-upload-1">
                    {reports.length > 0 && (
                      <div className="aaa">
                        <table className="table table-bordered custom-table">
                          <thead>
                            <tr>
                              <th className="text-center" colSpan="2">Bài báo cáo của nhóm</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reports.map((report) => (
                              <tr key={report.id}>
                                <td>
                                  {report.attachment_URL
                                    .split(", ")
                                    .map((url, index) => {
                                      const fileName = url.split("id=").pop();
                                      return (
                                        <div
                                          key={index}
                                          className="report-item d-flex align-items-center mb-"
                                        >
                                          <img
                                            className="drive me-2"
                                            src={logo_drive}
                                            alt="Drive logo"
                                          />
                                          <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="me-auto"
                                          >
                                            {report.reportTitle}
                                          </a>
                                        </div>
                                      );
                                    })}
                                </td>
                                <td className="text-center align-middle">
                                  <span
                                    onClick={() =>
                                      handleDeleteSubmit(report.submitId)
                                    }
                                  >
                                    <img
                                      src={bin}
                                      alt="Cancel icon"
                                      style={{ cursor: "pointer" }}
                                    />
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {type === "SV" && (
                      <div className="row mt-3">
                        <div className="col-12 d-flex justify-content-between flex-column flex-md-row">
                          {!isClick && !isExpired && (
                            <Link
                              to={`/submit/${classId}/${requestId}`}
                              className="d-flex no-underline mb-2 mb-md-0"
                            >
                              <button className="btn btn-primary btn-bc w-100 mb-2 mb-md-0">
                                Thêm báo cáo
                              </button>
                            </Link>
                          )}

                          {reports.length > 0 && (
                            <button
                              className="btn btn-danger btn-hn"
                              onClick={handleDeleteAllSubmit}
                            >
                              Hủy nộp
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5 col-12">
              <div className="feedback">
                <div className="card card-upload-2">
                  <div className="card-body">
                    <h4 className="card-title">Nhận xét bài báo cáo nhóm !!</h4>
                    {feedback.length > 0 && (
                      <div className="mb-3">
                        {feedback.map((feedback) => (
                          <div key={feedback.id}>
                            {feedback.email.split("@")[0]}:{" "}
                            {feedback.contentFeedback}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mb-3">
                      <textarea
                        type="text"
                        className="form-control"
                        name="contentFeedback"
                        value={feedbackData.contentFeedback}
                        onChange={handleChange}
                        placeholder="Nhận xét"
                        rows="3"
                      />
                    </div>
                    <button
                      className="btn btn-danger w-100 mb-3"
                      onClick={handleFeedback}
                    >
                      Gửi
                    </button>
                    {type === "GV" && (
                      <div className="mb-3">
                      {reports.length > 0 && (
                        <Link
                          to={`/score/report/${classId}/${requestId}/${reportDetail.requestOfGroup}`}
                        >
                          <button className="btn btn-primary w-100">Chấm điểm</button>
                        </Link>
                      )}
                      </div>
                    )}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleDriverPicker;
