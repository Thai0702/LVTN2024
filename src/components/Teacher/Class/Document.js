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
import del from "../../Admin/imgAdmin/delete.png";
import drive from "../../Admin/imgAdmin/drive.png";


const Document = () => {
  const { classId } = useParams();
  const accountId = localStorage.getItem("accountId");
  const [decriptionResource, setDocumentDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const type = localStorage.getItem("type");

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
        fetchReports();
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
  
  };
  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="container-fluid">
        <div className="row">
          {type === "GV" && (
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
                      Gửi
                    </button>
                  </form>
                  {message && <p className="text-danger mt-2">{message}</p>}
                </div>
              </div>
            </div>
          )}
          <div className="col-md-6 mb-4">
            {reports.length > 0 && (
              <div className="card-danhsach">
                <div className="card-body">
                  <table className="table table-bordered custom-table">
                    <thead>
                      <tr className="text-center align-middle">
                        <th className="text-center">Tài liệu</th>
                        <th className="text-center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report.id}>
                          <td className="text-center align-middle">
                            {report.uploadedLink
                              .split(", ")
                              .map((url, index) => (
                                <div
                                  key={index}
                                  className="report-item d-flex align-items-center mb-2"
                                >
                                  <img                              
                                    src={drive}
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
                                </div>
                              ))}
                          </td>
                          <td className="text-center align-middle">
                            <img
                              src={del}
                              alt="Delete"
                              onClick={() => handleDelete(report.resourceId)}
                              style={{ cursor: "pointer" }}
                            />
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
  );
};

export default Document;
