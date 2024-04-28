import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import add from './img/add.png';
const ClassDetailPage = () => {
  const [classDetail, setClassDetail] = useState(null);
  const [classDetailPeople, setClassDetailPeople] = useState(null);
  const { classId } = useParams(); // Lấy classId từ URL
  const [isClassworkopen, setIsClasswork] = useState(false);
  const [isCreateClassworkopen, setIsCreateClasswork] = useState(false);
  const [isStream, setIsStream] = useState(true); // Mặc định mở Stream
  const [isPeople, setIspeople] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const createClassRef = useRef();


  /*random group */
  const [groupSize, setGroupSize] = useState('');
  const [randomGroup, setRandomGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [error1, setError1] = useState('');
  const [successMessage1, setSuccessMessage1] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/class/${classId}/student-list`);
        const studentList = response.data;
        setStudents(studentList);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sinh viên:', error);
      }
    };
    fetchStudents();
  }, [classId]);
  // Hàm tạo đối tượng nhóm ngẫu nhiên với số lượng thành viên cụ thể từ danh sách sinh viên
  const generateRandomGroup = () => {
    if (!groupSize || isNaN(groupSize) || groupSize <= 0) {
      setError('Vui lòng nhập một số nguyên dương.');
      return;
    }

    if (groupSize > students.length) {
      setError('Không đủ sinh viên để tạo nhóm.');
      return;
    }
    const randomGroupMembers = [];
    const shuffledStudents = students.sort(() => 0.5 - Math.random());
    let selectedStudents = shuffledStudents.slice(0, groupSize);
    selectedStudents.forEach(student => {
      randomGroupMembers.push(student.student_id);
    });
    console.log('hello');
    const randomGroup = {
      groupName: `Group ${Math.floor(Math.random() * 6)+1}`,
      members: randomGroupMembers
    };
    setRandomGroup(randomGroup);
    setError1('');
  };
// Gửi đối tượng nhóm về phía backend để lưu lại trong danh sách nhóm
const saveRandomGroup = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/class/random-group', randomGroup);
    if (response.status === 200) {
      setSuccessMessage('Đã lưu nhóm ngẫu nhiên thành công.');
    }
  } catch (error) {
    console.error('Lỗi khi lưu nhóm ngẫu nhiên:', error);
  }
};
  /* upload file on list student */
  const fileInputRef = useRef(null);
  const [selectedClassId, setSelectedClassId] = useState(null); 
  const [errorMessageUpload, setErrorMessageUpload] = useState(null);
  const [classList, setClassList] = useState([]);
  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (file && selectedClassId) {
        const formData = new FormData();
        formData.append('file', file);
        try {
            await axios.post(`http://localhost:8080/api/account/class/${selectedClassId}/excel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            window.alert('File uploaded successfully!');
            setTimeout(() => {
            }, 3000);
        } catch (error) {
          window.alert('File uploaded fail!');
        }
    } else {
        console.error('No file selected or class not selected');
        window.alert('No file selected or class not selected!');
    }
};

   // show class on selected
   const fetchClasses = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/class');
        const classData = await response.json();
        setClassList(classData);
    } catch (error) {
        setErrorMessageUpload('Error fetching classes!');
    }
};
useEffect(() => {
    fetchClasses();
}, []);
  // /*show list student of class*/
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch the list of students
    fetch(`http://localhost:8080/api/class/${classId}/student-list`)
      .then(response => response.json())
      .then(data => {
        setStudentList(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => console.error('Error fetching student list:', error));
  }, [classId]);
/*delete student */
const handleDeleteSV = async (id) => {
  const confirmed = window.confirm("Bạn có chắc muốn xóa sinh viên này không?");
  if (!confirmed) {
      // Không xóa nếu người dùng không xác nhận
      return;
  }
  try {
      const url = `http://localhost:8080/api/class/student-list/${classId}/${id}`;
      const responseDelete = await fetch(url, {
          method: 'DELETE'
      });

      if (responseDelete.ok) {
          // Xóa sinh viên khỏi danh sách nếu xóa thành công
          setStudentList(studentList.filter(student => student.studentId !== id));
      } else {
          console.error('Failed to delete student');
      }
  } catch (error) {
      console.error('Error deleting student:', error);
  }
};


  /*show list group of class */
  const [grouptList, setGroupList] = useState([]);
  useEffect(() => {
    // Fetch the list of students
    fetch(`http://localhost:8080/api/class/${classId}/group-list`)
      .then(response => response.json())
      .then(data => {
        setGroupList(data);      
      })
      .catch(error => console.error('Error fetching student list:', error));
  }, [classId]);

  // const [classData, setClassData] = useState({
  //   class_id: '',
  //   group_name: '',
  //   leader_id: ''
  // });
  /*add project */
  const [classData, setClassData] = useState({
    project_name: '',
    project_of_group: '',
    description: '',
    created_by: '',
    created_at: '',
    expired_day: '',
    expired_time: '',
  });
  const [project_name, setProjectName] = useState('');
  const [project_of_group, setGrsetProjectofgroup] = useState('');
  const [description, setdescription] = useState('');
  const [created_by, setcreated_by] = useState('');
  const [expired_day, setexpired_day] = useState('');
  const [expired_time, setexpired_time] = useState('');
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/project/create-project`, {
        projectName: project_name,
        projectOfGroup: project_of_group,
        projectDescription: description,
        createdBy: created_by,
        expiredDay: expired_day,
        expiredTime: expired_time
      });
      console.log("hhh");
      if (response.status === 200) {
        // Đặt lại các trường nhập
        setProjectName('');
        setGrsetProjectofgroup('');
        setdescription('');
        setcreated_by('');
        setexpired_day('');
        setexpired_time('');
        // Đặt thông báo thành công
        setSuccessMessage('Project created successfully.');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      setError('Lỗi đăng ký');
    }
  };
  /*Add group*/
  const [class_id, setClassId] = useState('');
  const [group_name, setGroupName] = useState('');
  const [leader_id, setLeaderid] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/class/create-a-group`, {
        leaderId: leader_id,
        classId: class_id,
        groupName: group_name,
      });
      if (response.status != 200) {
        // Đặt lại các trường nhập
        setLeaderid('');
        setClassId('');
        setGroupName('');
        // Đặt thông báo thành công
        setSuccessMessage('Group created successfully.');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      setError('Lỗi đăng ký');
    }
  };
  

  /*click hide of element*/
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createClassRef.current && !createClassRef.current.contains(event.target)) {
        setIsCreateProject(false);
        setIsCreateGroup(false);
        setIsCreateClasswork(false);
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
      try {
        const response = await fetch(`http://localhost:8080/api/class/${classId}`);
        const classDetailData = await response.json();
        setClassDetail(classDetailData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchClassDetail();
  }, [classId]);
  if (!classDetail) {
    return <p>Loading...</p>;
  }
  const toggleRandom = () => {
    setIsRandom(!isRandom)
    setIsClasswork(false);
    setIsStream(false);
    setIspeople(false);
    setIsGroup(false);
    setIsProject(false);
  };
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

  return (
    <div>
      <Navbar />
      <div className='container-main'>
        <div className='container-header'>
          <div className={`header-1 ${isStream ? 'open' : ''}`} onClick={toggleStream}>Stream</div>
          <div className={`header-1 ${isClassworkopen ? 'open' : ''}`} onClick={toggleClasswork}>Classworks</div>
          <div className={`header-1 ${isPeople ? 'open' : ''}`} onClick={togglePeople}>People</div>
          <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleGroup}>Group</div>
          <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleProject}>Project</div>
          <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleRandom}>Random</div>
        </div>
        {isRandom && (
          <div ref={createClassRef} className='container-create-project'>
            <div>
        <label htmlFor="groupSize">Nhập số lượng thành viên cho nhóm:</label>
        <input
          type="number"
          id="groupSize"
          value={groupSize}
          onChange={(e) => setGroupSize(e.target.value)}
        />
        <button onClick={generateRandomGroup}>Tạo Nhóm Ngẫu Nhiên</button>
      </div>
      {randomGroup && (
        <div>
          <h3>Nhóm Ngẫu Nhiên:</h3>
          <p>Tên Nhóm: {randomGroup.groupName}</p>
          <p>Thành Viên:</p>
          <ul>
               {randomGroup.members.map((memberId, index) => {
                    // Tìm sinh viên trong danh sách sinh viên dựa trên ID
                    const student = students.find(student => student.student_id === memberId);
                    // Kiểm tra xem sinh viên có tồn tại không
                    if (student) {
                      return (
                        <li key={index}>
                          <div>
                            <strong>student id:</strong> {student.studentId}
                          </div>
                          <div>
                            <strong>class id:</strong> {student.classId}
                          </div>                         
                        </li>
                      );
                    } else {
                      // Trường hợp không tìm thấy sinh viên
                      return <li key={index}>Sinh viên không tồn tại</li>;
                    }
                  })}
          </ul>
          <button onClick={saveRandomGroup}>Lưu Nhóm Ngẫu Nhiên</button>
        </div>
      )}
      {error1 && <div className="error">{error1}</div>}
      {successMessage1 && <div className="success">{successMessage1}</div>}
          </div>
        )}
        {isClassworkopen && (
          <div className='container-body'>
            <div className='create-work' onClick={toggleCreateClasswork}>
              <img src={add} alt='Create' />
              <p>Create</p>
            </div>
            <div className='works'>
              show all homeworks
            </div>
          </div>
        )}
        {isCreateClassworkopen && (
          <div ref={createClassRef} className='container-create-project'>
            <input type='text' placeholder='submit_by' className='input'></input>
            <input type='text' placeholder='report_of_request' className='input'></input>
            <input type='text' placeholder='report_title' className='input'></input>
            <input type='text' placeholder='report_description' className='input'></input>
            <input type='text' placeholder='created_time' className='input'></input>
            <input type='file' placeholder='attachment' className='input'></input>
            <button className='button-create' >Submit</button>
          </div>
        )}
        {isStream && (
          <div className='container-body'>
            <div className='body-1'>
              <p>{classDetail.subject_name}</p>
            </div>
            <div className='body-2'>
              <div className='body-code'>
                <p>Code class</p>
                <p>{classDetail.subject_class_id}</p>
              </div>
              <div className='body-homework'>
                <div>documents </div>
              </div>
            </div>

          </div>
        )}
        {isPeople && (
          <div className='container-body'>
                <div className='import-people'>
                    <input type='file' ref={fileInputRef} /> {/* File input */}
                    <select onChange={(e) => setSelectedClassId(e.target.value)} value={selectedClassId}>
                        <option value=''>Select Class</option>
                        {classList.map((classItem) => (
                            <option key={classItem.subject_class_id} value={classItem.subject_class_id}>{classItem.subject_class_id}</option>
                        ))}
                    </select> 
                    <button onClick={handleFileUpload}>Add</button>
                  
            </div>
            <div className='works'>
  <ul>
    {studentList.map((student) => (
      <li key={student.studentId}>
        <span>{student.classId}-{student.studentId}</span>
        <button className='btnDeleteSV' onClick={() => handleDeleteSV(student.studentId)}>Delete</button>
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
              {grouptList.map((group) => (
                <li key={group.group_id}>
                  {group.groupName}
                  <button className='btnDeleteSV' >Delete</button>
                </li>
              ))}
            </div>
          </div>
        )}
        {isCreateGroup && (
          <div ref={createClassRef} className='container-create-project'>

            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='leader ID'
                className='input'
                value={leader_id}
                onChange={(e) => setLeaderid(e.target.value)}
              />
              <input
                type='text'
                placeholder='Class ID'
                className='input'
                value={class_id}
                onChange={(e) => setClassId(e.target.value)}
              />
              <input
                type='text'
                placeholder='Group Name'
                className='input'
                value={group_name}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <button className='btn btn-primary' type='submit'>
                Create
              </button>
            </form>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
          </div>
        )}
        {isProject && (
          <div className='container-body' >
            <div className='create-work' onClick={toggleCreateProject}>
              <img src={add} alt='Create' />
              <p>Add Project</p>
            </div>
            <div className='works'>
              show all Project here
            </div>
          </div>
        )}
        {isCreateProject && (
          <div ref={createClassRef} className='container-create-project'>

            <form onSubmit={handleAddProject}>
            
              <input
                type='text'
                placeholder='Project Name'
                className='input'
                value={project_name}
                onChange={(e) => setProjectName(e.target.value)}
              />
                <select onChange={(e) => setGrsetProjectofgroup(e.target.value)} value={project_of_group}>
                <option value=''>Select Project</option>
                {grouptList.map((group) => (
                  <option key={group.group_id} value={group.group_id}>
                    {group.groupId}
                  </option>
                ))}
              </select>
               {/* <input
                type='text'
                placeholder='Project of group'
                className='input'
                value={project_of_group}
                onChange={(e) => setGrsetProjectofgroup(e.target.value)}
              /> */}
              <input
                type='text'
                placeholder='Description'
                className='input'
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
              <input
                type='text'
                placeholder='CreatedBy'
                className='input'
                value={created_by}
                onChange={(e) => setcreated_by(e.target.value)}
              />
              <input
                type='date'
                placeholder='CreateDay'
                className='input'
                value={expired_day}
                onChange={(e) => setexpired_day(e.target.value)}
              />
              <input
                type='time'
                placeholder='CreateTime'
                className='input'
                value={expired_time}
                onChange={(e) => setexpired_time(e.target.value)}
              />
                {error && <div className="error">{error}</div>}
              {successMessage && <div className="success">{successMessage}</div>}
              <button className='btn btn-primary' type='submit'onClick={handleAddProject}>
                Add project
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDetailPage;
