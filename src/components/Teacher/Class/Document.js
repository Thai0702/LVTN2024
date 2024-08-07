import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import Navbar from "../Home/Navbar";
import DetailClass from "../Class/DetailClass";

const Document = () => {
  const { classId } = useParams(); // Get classId from URL
  const [documentDescription, setDocumentDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('documentDescription', documentDescription);

    attachments.forEach(file => {
      formData.append('attachment', file);
    });

    try {
      // Include classId in the URL
      const response = await axios.post(`${BE_URL}/class/document/${classId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert('Submit success!!');
        setDocumentDescription('');
        setAttachments([]);
        document.getElementById('fileInput').value = null;
        navigate(`/upload/${classId}`); // Adjust navigation if needed
      } else {
        setMessage('There was an error submitting the document.');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Vui lòng gửi lại!');
    }
  };

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  return (
    <div>
      <Navbar />
      <DetailClass />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  value={documentDescription}
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
                <button className="btn btn-primary" type="submit">
                  Nộp
                </button>
              </form>
              {message && <p className="text-danger">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;