import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import add from './img/add.png';
import { BE_URL } from '../../utils/Url_request';
const ClassDetailPage = () => {
  const [classDetail, setClassDetail] = useState(null);
  const navigate = useNavigate();
  const { classId } = useParams(); // Lấy classId từ URL
  const [isClassworkopen, setIsClasswork] = useState(false);
  const [isCreateClassworkopen, setIsCreateClasswork] = useState(false);
  const [isStream, setIsStream] = useState(true); // Mặc định mở Stream
  const [isPeople, setIspeople] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isProjectGroup, setIsProjectGroup] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const createClassRef = useRef();
  const [accountId, setAccount] = useState([]);
  // add report request
  const [subjectClass, setsubjectClass] = useState('');
  const [requestOfProject, setrequestOfProject] = useState('');
  const [expiredTime, setexpiredTime] = useState('');
  const [expiredDate, setexpiredDate] = useState('');
  const [expiredAction, setexpiredAction] = useState('');
  const [requestTile, setrequestTile] = useState('');
  const [requestDescription, setrequestDescription] = useState('');
  const handleAddReportRequest = async (e) => {
    e.preventDefault();
    // Kiểm tra không được bỏ trống các trường
    if (!subjectClass || !requestOfProject || !expiredTime || !expiredDate || !requestTile || !requestDescription) {
      window.alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BE_URL}/api-gv/report-request`,
        {
          subjectClass: subjectClass,
          requestOfProject: requestOfProject,
          expiredTime: expiredTime,
          expiredDate: expiredDate,
          expiredAction: 2,
          requestTile: requestTile,
          requestDescription: requestDescription
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token // Thêm token vào header
          }
        }
      );
      if (response.status !== 200) {
        setsubjectClass('');
        setrequestOfProject('');
        setexpiredTime('');
        setexpiredDate('');
        // setexpiredAction('');
        setrequestTile('');
        setrequestDescription('');
        window.alert("Report created successfully !");
        window.location.reload(false);
      }
    } catch (error) {
      window.alert("Add fail !");
    }
  };
  //lấy danh sách report of class id
  const [reportList, setreportList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchReportList = async () => {
      try {
        const response = await fetch(`${BE_URL}/api-gv/report-request/${classId}`, {
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
        setreportList(data);
      } catch (error) {
        console.error('Error fetching report list:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or an error occurs
      }
    };
    fetchReportList();
  }, [classId]);
  // delete report
  // const handleDeleteRepoet = async (id) => {
  //   const token = localStorage.getItem('token');
  //   const confirmed = window.confirm("Bạn có chắc muốn xóa repoort này không?");
  //   if (!confirmed) {
  //     return;
  //   }
  //   try {

  //     const url = `${BE_URL}/api-gv/report-request/delete/${id}`;
  //     const responseDelete = await fetch(url, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + token
  //       }
  //     });
  //     if (responseDelete.ok) {
  //       window.alert("Xóa report thành công!");
  //       window.location.reload(true);
  //     } else {
  //       console.error('Failed to delete report');
  //       alert("Đã xảy ra lỗi khi xóa report!");
  //     }
  //   } catch (error) {
  //     console.error('Error deleting report:', error);
  //     alert("Đã xảy ra lỗi khi xóa report!");
  //   }
  // };

   // Delete project of group
   const[listReport,setListReport]=useState();
   const handleDeleteReport = async (requestId) => {
    if (!requestId) {
      console.error('request ID is missing or undefined');
      window.alert('request ID is missing or undefined');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      window.alert('No token found');
      return;
    }

    const confirmed = window.confirm("Bạn có chắc muốn xóa request này không?");
    if (!confirmed) {
      // Do not delete if user does not confirm
      return;
    }

    try {
      const responseDelete = await fetch(`${BE_URL}/api-gv/report-request/delete/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      if (responseDelete.ok) {
        // Remove project from list if deletion is successful
        setListReport(listReport.filter(project => project.requestId !== requestId));
        window.alert('Xóa project thành công.');
      } else {
        const errorData = await responseDelete.json();
        console.error('Error deleting project:', errorData.message);
        window.alert('Xảy ra lỗi khi xóa project: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error deleting request:', error);
      window.alert('Xảy ra lỗi khi xóa request.');
    }
  };
  /* upload file on list student */
  const fileInputRef = useRef(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [classList, setClassList] = useState([]);
  const handleFileUpload = async () => {
    const token = localStorage.getItem('token');
    const file = fileInputRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await axios.post(`${BE_URL}/api-gv/class/excel/${classId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
          }
        });
        window.alert('File uploaded successfully!');
        // Load lại trang sau khi thêm thành công
        window.location.reload(false);
      } catch (error) {
        window.alert('File uploaded fail!');
      }
    } else {
      console.error('No file selected or class not selected');
      window.alert('No file selected or class not selected!');
    }
  };

  // lay userId by account 
  useEffect(() => {
    const fetchClasses = async () => {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('accountId');

      if (!userId) {
        console.error('userId not found in localStorage');
        return;
      }

      try {
        const response = await fetch(`${BE_URL}/api-gv/class/createdBy/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // Thêm token vào header
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const classData = await response.json();
        setClassList(classData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);
  // /*show list student of class*/
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchStudentList = async () => {
      try {
        const response = await fetch(`${BE_URL}/api/class/student-list/${classId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setStudentList(data);
      } catch (error) {
        console.error('Error fetching student list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentList();
  }, [classId]);
  const handleDeleteSV = async (id) => {
    const token = localStorage.getItem('token');
    const confirmed = window.confirm("Bạn có chắc muốn xóa sinh viên này không?");
    if (!confirmed) {
      // Không xóa nếu người dùng không xác nhận
      return;
    }
    try {
      const url = `${BE_URL}/api-gv/class/delete/student-list/${classId}/${id}`;
      const responseDelete = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      if (responseDelete.ok) {
        // Xóa sinh viên khỏi danh sách nếu xóa thành công
        setStudentList(studentList.filter(student => student.studentId !== id));
        window.alert(" Bạn đã xóa sinh viên với mã" + " " + id)
        window.location.reload(true);
      } else {
        console.error('Failed to delete student');
        alert("Xóa sinh viên không thành công!");
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert("Đã xảy ra lỗi khi xóa sinh viên!");
    }
  };

  /*show list group of class */
  const [grouptList, setGroupList] = useState([]);
  useEffect(() => {
    // Fetch the list of students
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/api-gv/classId/group-list/${classId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => {
        setGroupList(data);
      })
      .catch(error => console.error('Error fetching student list:', error));
  }, [classId]);
  // Hiển thị danh sách dự án của một nhóm khi nhấp vào tên nhóm
  const toggleProjectOfGroup = async (groupId) => {
    try {
      const response = await fetch(`${BE_URL}/api/group/${groupId}/projects`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects for this group');
      }
      const classDetailData = await response.json();
      // In classDetailData ra console để kiểm tra dữ liệu nhận được
      console.log(classDetailData);
      console.log("chai che" + groupId);
      // Bạn có thể sử dụng classDetailData để hiển thị danh sách dự án của nhóm
    } catch (error) {
      console.error('Error fetching projects for group:', error);
    }
  };
  /*add project */
  const [project_name, setProjectName] = useState('');
  const [project_of_group, setProjectOfGroup] = useState('');
  const [description, setDescription] = useState('');
  const [expired_day, setExpiredDay] = useState('');
  const [expired_time, setExpiredTime] = useState('');
  const handleAddProject = async (e) => {
    e.preventDefault();
    // Kiểm tra không được bỏ trống các trường
    if (!project_name || !project_of_group || !description || !expired_day || !expired_time) {
      window.alert('Vui lòng điền đủ thông tin.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BE_URL}/api-gv/project/create-project`,
        {
          projectName: project_name,
          projectOfGroup: project_of_group,
          projectDescription: description,
          expiredDay: expired_day,
          // expiredTime: formatTime(expired_time)
          expiredTime: expired_time
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token // Thêm token vào header
          }
        }
      );
      if (response.status === 200) {
        // Đặt lại các trường nhập
        setProjectName('');
        setProjectOfGroup('');
        setDescription('');
        setExpiredDay('');
        setExpiredTime('');
        window.alert("Project created successfully !");
      }
    } catch (error) {
      window.alert("Add fail !");
    }
  };
  /*Add group*/
  const [groupName, setgroupName] = useState('');
  const [class_id, setClassId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [groupData, setGroupData] = useState({
    classId: classId,
    groupName: '',
    leaderId: '',
  });
  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };
  const handleCreateGroup = async () => {

    if (!groupData.groupName || !groupData.leaderId) {
      window.alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');

      const response = await fetch(`${BE_URL}/api/class/create-a-group`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token // Thêm token vào header
        },
        body: JSON.stringify({ ...groupData })
      });
      if (response.ok) {
        window.alert('File uploaded successfully!');
        // Load lại trang sau khi thêm thành công
        window.location.reload(false);
      }
      else {
        window.alert('add group fail !');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // delete group of class
  const handleDeleteGroup = async (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa nhóm này không?");
    if (!confirmed) {
      return;
    }
    try {
      const url = `${BE_URL}/api/group/${id}`;
      const responseDelete = await fetch(url, {
        method: 'DELETE'
      });

      if (responseDelete.ok) {
        window.alert("Xóa nhóm thành công!");
        window.location.reload(true);
      } else {
        console.error('Failed to delete group');
        alert("Đã xảy ra lỗi khi xóa nhóm!");
      }
    } catch (error) {
      console.error('Error deleting group:', error);
      alert("Đã xảy ra lỗi khi xóa nhóm!");
    }
  };
  /*click hide of element*/
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createClassRef.current && !createClassRef.current.contains(event.target)) {
        setIsCreateProject(false);
        setIsCreateGroup(false);
        setIsCreateClasswork(false);
        setIsAdd(false);
        setIsProjectGroup(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  /*show detail of class */

  useEffect(() => {
    const fetchClassDetail = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      if (!classId) {
        setError('Class ID is required');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BE_URL}/api-gv/class/get/${classId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // Add token to header
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const classDetailData = await response.json();
        setClassDetail(classDetailData);
        const {memberPerGroup}=classDetailData
        localStorage.setItem('memberPerGroup', memberPerGroup);    
        console.log("hhee:",memberPerGroup)

      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch class detail');
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetail();
  }, [classId]);

  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return <p>{error}</p>;
  }

  if (!classDetail) {
    return <p>No class detail available</p>;
  }
  const toggleClasswork = () => {
    setIsClasswork(!isClassworkopen);
    setIsStream(false);
    setIspeople(false);
    setIsGroup(false);
    setIsProject(false);
    setIsRandom(false)
  };
  const toggleCreateClasswork = () => {
    setIsCreateClasswork(!isCreateClassworkopen)
    setIsClasswork(false);
    setIsStream(false);
    setIspeople(false);
    setIsGroup(false);
    setIsProject(false);
    setIsRandom(false)
  };
  const toggleStream = () => {
    setIsStream(!isStream);
    setIsClasswork(false);
    setIspeople(false);
    setIsGroup(false);
    setIsProject(false);
    setIsRandom(false)
  };

  const togglePeople = () => {
    setIspeople(!isPeople);
    setIsClasswork(false);
    setIsStream(false);
    setIsGroup(false);
    setIsProject(false);
    setIsRandom(false)
  };

  const toggleGroup = () => {
    setIsGroup(!isGroup);
    setIsClasswork(false);
    setIsStream(false);
    setIspeople(false);
    setIsProject(false);
    setIsRandom(false)
  };
  const toggleCreateGroup = () => {
    setIsCreateGroup(!isCreateGroup);
    setIsGroup(false);
    setIsClasswork(false);
    setIsStream(false);
    setIspeople(false);
    setIsProject(false);
    setIsRandom(false)
  };
  const toggleProject = () => {
    setIsProject(!isProject);
    setIsGroup(false);
    setIsClasswork(false);
    setIsStream(false);
    setIspeople(false);
    setIsRandom(false)
  };
  const toggleCreateProject = () => {
    setIsCreateProject(!isCreateProject);
    setIsProject(false);
    setIsGroup(false);
    setIsClasswork(false);
    setIsStream(false);
    setIspeople(false);
    setIsRandom(false)
  };
  const toggleAddmember = () => {
    setIsAdd(!isAdd);
    setIsCreateProject(false);
    setIsProject(false);
    setIsGroup(false);
    setIsClasswork(false);
    setIsStream(false);
    setIspeople(false);
    setIsRandom(false)
  };
  const toggleProjectOfGroup1 = () => {
    setIsProjectGroup(!isProjectGroup);
    setIsAdd(false);
    setIsCreateProject(false);
    setIsProject(false);
    setIsGroup(false);
    setIsClasswork(false);
    setIsStream(false);
    setIspeople(false);
    setIsRandom(false)
  };

  const handleCheckboxChange = (studentId) => {
    // Clone the selectedStudents array
    let updatedSelectedStudents = [...accountId];

    // If the studentId is already in the selectedStudents array, remove it. Otherwise, add it.
    if (updatedSelectedStudents.includes(studentId)) {
      updatedSelectedStudents = updatedSelectedStudents.filter(id => id !== studentId);
    } else {
      updatedSelectedStudents.push(studentId);
    }

    // Update the state
    setAccount(updatedSelectedStudents);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`${BE_URL}/api/class/add-member`, {
        classId: classId,
        groupName: groupName,
        accountId: accountId
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('Data saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  // show project âll grouid 

  return (
    <div>
      <Navbar />
      <div className='container-main'>
        <div className='container-header'>
          {/* Phần Stream */}
          <div className={`header-1 ${isStream ? 'open' : ''}`} onClick={toggleStream}>Stream</div>
          {/* <div className={`header-1 ${isStream ? 'open' : ''}`} onClick={toggleStream}> <Link to={`/stream-view/${classId}`}>Stream</Link></div> */}

          {/* Phần Report */}
          {<div className={`header-1 ${isClassworkopen ? 'open' : ''}`} onClick={toggleClasswork}>Report</div>}
          {/* {classList.map((classItem) => ( 
          <div className={`header-1 ${isClassworkopen ? 'open' : ''}`} onClick={toggleClasswork}><Link to={`/report-view/${classItem.subjectClassId}`}>Report</Link></div>
          ))} */}
          {/* {classList.length > 0  && (
            <div className={`header-1 ${isClassworkopen ? 'open' : ''}`} onClick={toggleClasswork}>
              <Link to={`/report-view/${classId}`}>Report</Link>
            </div>
          )} */}

          {/* Phần People */}
          {/* <div className={`header-1 ${isPeople ? 'open' : ''}`} onClick={togglePeople}><Link to="/people-view">People</Link></div> */}
          {/* {classList.length > 0  && (
            <div className={`header-1 ${isClassworkopen ? 'open' : ''}`} onClick={toggleClasswork}>
              <Link to={`/people-view/${classList[0].subjectClassId}`}>People</Link>
            </div>
          )} */}

          {/* {classList.length > 0  && (
            <div className={`header-1 ${isPeople ? 'open' : ''}`} onClick={togglePeople}>
              <Link to={`/people-view/${classId}`}>People</Link>
            </div>
          )} */}


          <div className={`header-1 ${isPeople ? 'open' : ''}`} onClick={togglePeople}>People</div>

          {/* Phần PROJECT */}
          {/* <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleProject}><Link to={`/project-view/${classId}`}>Project</Link></div> */}
          <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleProject}>Project</div>

          {/* Phần Manager */}
          {/* <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleGroup}><Link to="/addmember-view">Manager</Link></div> */}
          <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleGroup}>Group</div>
          {/* <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleGroup}><Link to={`/group-view`}>Group</Link></div> */}
          {/*           
            <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleGroup}>
              <Link to={`/group-view/${classId}`}>Group</Link>
            </div> */}

          {/* <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleGroup}><Link to={`/group-view/${classId}`}>Group</Link></div> */}

          <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={classDetail.groupRegisterMethod === "RANDOM" ? null : toggleAddmember}>
            {classDetail.groupRegisterMethod === "RANDOM" ? null : classDetail.groupRegisterMethod + "  " + "add Member"}
          </div>
        </div>

        {isClassworkopen && (
          <div className='container-body'>
            <div className='create-work' onClick={toggleCreateClasswork}>
              <img src={add} alt='Create' />
              {<p>Create</p>}
            </div>
            <div className='works'>
              <ul>
                {reportList.map((report) => (
                  <li key={report.requestId}>
                    <span>{report.requestTile}</span>
                    <button className='btnDeleteSV' onClick={() => handleDeleteReport(report.requestId)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {isCreateClassworkopen && (
          <div ref={createClassRef} className='container-create-project'>
            <form onSubmit={handleAddReportRequest}>
              <input
                type='text'
                placeholder='Báo cáo cho project nào ?'
                className='input'
                value={requestOfProject}
                onChange={(e) => setrequestOfProject(e.target.value)}
              />
              <select onChange={(e) => setsubjectClass(e.target.value)} value={subjectClass}>
                <option value=''>Select Class</option>
                {classList.map((classItem) => (
                  <option key={classItem.subjectClassId} value={classItem.subjectClassId}>{classItem.subjectName}</option>
                ))}
              </select>
              <input
                type='time'
                placeholder='Thời gian hết hạn'
                className='input'
                value={expiredTime}
                onChange={(e) => setexpiredTime(e.target.value)}
              />
              <input
                type='date'
                placeholder='Ngày hết hạn'
                className='input'
                value={expiredDate}
                onChange={(e) => setexpiredDate(e.target.value)}
              />
              <input
                type='text'
                placeholder='Chủ đề report'
                className='input'
                value={requestTile}
                onChange={(e) => setrequestTile(e.target.value)}
              />
              <input
                type='text'
                placeholder='Mô tả'
                className='input'
                value={requestDescription}
                onChange={(e) => setrequestDescription(e.target.value)}
              />
              {error && <div className="error">{error}</div>}
              {successMessage && <div className="success">{successMessage}</div>}
              <button className='btn btn-primary' type='submit' onClick={handleAddReportRequest}>
                Add Report
              </button>
            </form>
          </div>
        )}
        {isStream && (
          <div className='container-body'>
            <div className='body-1'>
              <p>{classDetail.subjectName}</p>
            </div>
            <div className='body-2'>
              <div className='body-code'>
                <p>Code class</p>
                <p>{classDetail.inviteCode}</p>
              </div>
              <div className='works'>
                <ul>
                  {reportList.map((report) => (
                    <li key={report.requestId}>
                      <span>{report.requestTile}</span>
                      <button className='btnDeleteSV' onClick={() => handleDeleteReport(report.requestId)}>Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {isPeople && (
          <div className='container-body'>
            <div className='import-people'>
              <input type='file' ref={fileInputRef} />
              {/* <select onChange={(e) => setSelectedClassId(e.target.value)} value={selectedClassId}>
                <option value=''>Select Class</option>
                {classList.map((classItem) => (
                  <option key={classItem.subjectClassId} value={classItem.subjectClassId}>{classItem.subjectName}</option>
                ))}
              </select> */}
              <button onClick={handleFileUpload}>Add</button>

            </div>
            <div className='works'>
              <p className='dsshow'>List Students</p>
              <ul>
                {studentList.map((student) => (
                  <li key={student.classId}>
                    <span>{student.studentId}-{student.fullName}</span>
                    <div className='btnPeople'>
                      <button onClick={() => handleDeleteSV(student.accountId)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {isGroup && (
          <div className='container-body'>
            <div className='create-work' onClick={toggleCreateGroup}>
              <img src={add} alt='Create' />
              <p>Add group</p>
            </div>
            <div className='works'>
              <p className='dsshow'>List Group</p>
              <ul>
                <ul>
                  {grouptList.map((listgroup) => (
                    <li key={listgroup.groupId}>
                     <Link to={`/showmemberGroup/${listgroup.classId}/${listgroup.groupId}`}><span>{listgroup.classId} - {listgroup.groupName}</span></Link> 
                      <div className=''>
                        <button  >Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
          </div>
        )}
        {isProjectGroup && (
          <div>
            <div className='class-list-teach'>
              {classList.map((classItem) => (
                <li key={classItem.id} className='showclass-1'>
                  <div>
                    <div className='name_class'><Link to={`/class/${classItem.projectId}`}>{classItem.projectName}</Link></div>
                  </div>
                </li>
              ))}
            </div>
          </div>
        )}
        {isCreateGroup && (
          <div ref={createClassRef} className='container-create-project'>

            <form className='addGroup'>
              <input
                type='text'
                placeholder='Mã leader'
                className='input'
                name='leaderId'
                value={groupData.leaderId}
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='Tên nhóm'
                className='input'
                name='groupName'
                value={groupData.groupName}
                onChange={handleChange}
              />
              <button className='button-create' onClick={handleCreateGroup}>Create</button>
            </form>
          </div>
        )}
        {isProject && (
          <div className='container-body' >
            <div className='create-work' onClick={toggleCreateProject}>
              <img src={add} alt='Create' />
              <p>Add Project</p>
            </div>
            {/* <div className='works'>
              show all Project here
            </div> */}
          </div>
        )}
        {isCreateProject && (
          <div ref={createClassRef} className='container-create-project'>
            <form onSubmit={handleAddProject}>
              <input
                type='text'
                placeholder='Tên đồ án'
                className='input'
                value={project_name}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <select onChange={(e) => setProjectOfGroup(e.target.value)} value={project_of_group}>
                <option value=''>Select Group</option>
                {grouptList.map((group) => (
                  <option key={group.groupId} value={group.groupId}>
                    {group.groupName}
                  </option>
                ))}
              </select>
              <input
                type='text'
                placeholder='Mô tả'
                className='input'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type='date'
                placeholder='CreateDay'
                className='input'
                value={expired_day}
                onChange={(e) => setExpiredDay(e.target.value)}
              />
              <input
                type='time'
                placeholder='Thời gian hết hạn'
                className='input'
                value={expired_time}
                onChange={(e) => setExpiredTime(e.target.value)}
              />
              {error && <div className="error">{error}</div>}
              {successMessage && <div className="success">{successMessage}</div>}
              <button className='btn btn-primary' type='submit' onClick={handleAddProject}>
                Add project
              </button>
            </form>
          </div>
        )}
        {isAdd && (
          <div className='container-body' ref={createClassRef}>
            <div className='works'>
              <p className='dsshow'>List Students</p>
              <select onChange={(e) => setgroupName(e.target.value)} value={groupName} className='addMember'>
                <option value=''>Select Group</option>
                {grouptList.map((group) => (
                  <option key={group.groupId} value={group.groupId}>
                    {group.groupName}
                  </option>
                ))}
              </select>
              <select onChange={(e) => setClassId(e.target.value)} value={classId} className='addMember'>
                <option value=''>Select Class</option>
                {classList.map((classItem) => (
                  <option key={classItem.subjectClassId} value={classItem.subjectClassId}>{classItem.subjectName}</option>
                ))}
              </select>
              <button onClick={handleSave} className='addMember'>Save</button>

              <ul>
                {studentList.map((student) => (
                  <li key={student.classId}>
                    <span>{student.classId}-{student.studentId}-{student.studentClass}</span>
                    <input
                      type='checkbox'
                      onClick={() => handleCheckboxChange(student.accountId)}
                      checked={accountId.includes(student.accountId)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default ClassDetailPage;
