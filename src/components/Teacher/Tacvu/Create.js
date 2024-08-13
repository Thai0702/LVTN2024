import React, { useState, useEffect } from 'react';
import Navbar from "../Home/Navbar";
import "./css/main.css";
import { Link, useNavigate } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import { createClass } from '../../../services/apiServiceClass';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Create = () => {
  const navigate = useNavigate();
  const [classData, setClassData] = useState({
    subjectName: '',
    schoolYear: '',
    description: '',

  });
  const [users, setUsers] = useState([]);
  const [classList, setClassList] = useState([]);

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  

  const handleCreate = async () => {
    for (const key in classData) {
      if (!classData[key]) {
        window.alert('Vui lòng điền đầy đủ thông tin.');
        return;
      }
    }
    try {
      const data = await createClass(classData);
      setClassList([...classList, data]);
      window.alert("Tạo lớp môn học thành công!!!");
      navigate('/');
      window.location.reload(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BE_URL}/api-gv/account`);
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);



const handleDescriptionChange = (event, editor) => {
  const data = editor.getData();
  const plainText = data.replace(/<[^>]+>/g, ''); 
  setClassData({ ...classData, description: plainText });
};

  return (
    <div>
      <Navbar />
      <div className="col-md-6">
        <div className="card">
          <h2>Tạo lớp môn học</h2>
          <div className="card-body">

            <div className="form-group">
              <label>Tên lớp môn học: </label>
              <input type='text'
                className="form-control" name='subjectName'
                value={classData.subjectName}
                onChange={handleChange}></input>
            </div>
            <div className="form-group">
              <label>Học kỳ - năm học: </label>
              <input type='text'
                className="form-control" name='schoolYear'
                value={classData.schoolYear} onChange={handleChange}></input>
            </div>
            <div className="form-group">
              <label>Mô tả: </label>
              <CKEditor
                editor={ClassicEditor}
                data={classData.description}
                onChange={handleDescriptionChange}
              />
            </div>
            <button className="btn btn-primary" onClick={handleCreate}>Tạo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
