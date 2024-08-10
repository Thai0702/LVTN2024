import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BE_URL } from "../../../utils/Url_request";
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";
import logo_drive from "../../img/logo_drive.png";
import { getAllDocumentByClass } from "../../../services/apiService";
import { deleteResourceById } from "../../../services/apiService";
import "./css/document.css";
import cancel from "../../img/cancel.png";

const Document = () => {
  const { classId } = useParams();
  const accountId = localStorage.getItem("accountId");
  const [decriptionResource, setDocumentDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uploadedBy", accountId);
    formData.append("uploadClassId", classId);
    formData.append("decriptionResource", decriptionResource);
    attachments.forEach((file) => formData.append("uploadedLink", file));
    try {
      const response = await axios.post(
        `${BE_URL}/api/upload/resource/class`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Upload success!!");
        setDocumentDescription("");
        setAttachments([]);
        document.getElementById("fileInput").value = null;
        fetchReports(); // Fetch updated reports
      } else {
        setMessage("There was an error submitting the report.");
      }
    } catch (error) {
      console.error("There was an error uploading the file!", error);
      alert("Vui lòng gửi lại !");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const fetchReports = async () => {
    try {
      const data = await getAllDocumentByClass(classId);
      setReports(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [classId]);

  const handleDelete = async (resourceId) => {
    try {
          await deleteResourceById(resourceId);
          const newDocuments = await getAllDocumentByClass(resourceId);
          setReports(newDocuments);
          return;
        } catch (error) {
          console.error("Đã xảy ra lỗi khi hủy bài nộp! ", error);
          window.alert("Đã xảy ra lỗi khi hủy bài nộp!");
        }
    // try {
    //   const response = await axios.delete(`${BE_URL}/api/upload/resource/delete/${reportId}`);
    //   if (response.status === 200) {
    //     fetchReports(); // Fetch updated reports
    //   } else {
    //     alert("Error deleting the file. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("There was an error deleting the file!", error);
    //   alert("Error deleting the file. Please try again.");
    // }
  };
  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card-document">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <input
                    value={decriptionResource}
                    className="form-control"
                    onChange={(e) => setDocumentDescription(e.target.value)}
                    placeholder="Document Description"
                  />
                  <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    onChange={handleFileChange}
                    multiple
                    required
                  />
                  <button className="btn btn-primary mt-3" type="submit">
                    Nộp
                  </button>
                </form>
                {message && <p className="text-danger mt-2">{message}</p>}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            {reports.length > 0 && (
              <div className="card-danhsach">
                <div className="card-body">
                  <table className="table table-bordered custom-table">
                    <tbody>
                      {reports.map((report) => (
                        <div key={report.id}>
                          {report.uploadedLink.split(", ").map((url, index) => (
                            <div
                              key={index}
                              className="report-item d-flex align-items-center mb-2"
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
                                {report.decriptionResource}
                              </a>
                              <button
                                className="btn btn-danger btn-sm ms-2"
                                onClick={() => handleDelete(report.resourceId)}
                              >
                                X
                              </button>
                            </div>
                          ))}
                        </div>
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
  );
};

export default Document;
