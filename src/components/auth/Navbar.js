import React, { useState, useEffect, useRef } from "react";
import "./Login.css"; // Import file CSS cho Header
import { Link } from "react-router-dom";
import menu from "./img/menu.png"; // Import the image
import home from "./img/home.png";
import axios from "axios";
import setting from "./img/setting.png";
import teach from "./img/teach.png";
import { useParams } from "react-router-dom";
import add from "./img/add.png";
import student from "./img/student.png";
import iconClass from "./img/iconClass.png";
import { useNavigate } from "react-router-dom";
import { BE_URL } from "../../utils/Url_request";
import arrow from "../auth/pageAdmin/imgAdmin/arrow.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [projectText, setProjectText] = useState("Project"); // State variable for project text
  const [isCreate, setIsCreate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Trạng thái đăng nhập
  const [username, setUsername] = useState(""); // Tên người dùng
  const navigate = useNavigate();
  const { classId } = useParams();
  const [isSetting, setIsSetting] = useState(false);
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    const savedUsername = localStorage.getItem("username");

    if (userLoggedIn === "true" && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);
  const handleLogout = () => {
    // Xóa token và tên người dùng từ localStorage
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername("");
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [users, setUsers] = useState([]);
  const [classList, setClassList] = useState([]);

  const [classListStudent, setClassListStudent] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch(`${BE_URL}/api/account`);
  //       const userData = await response.json();
  //       setUsers(userData);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BE_URL}/api/account`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);
  // lay userId by account
  useEffect(() => {
    const fetchClasses = async () => {
      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("accountId");

      if (!userId) {
        console.error("userId not found in localStorage");
        return;
      }

      try {
        const response = await fetch(
          `${BE_URL}/api-gv/class/createdBy/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token, // Thêm token vào header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const classData = await response.json();
        setClassList(classData);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);
  const fullName = localStorage.getItem("fullName");

  //get all class of
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const userId = localStorage.getItem("accountId");
        const token = localStorage.getItem("token");

        if (!userId) {
          console.error("userId not found in localStorage");
          return;
        }

        const response = await fetch(
          `${BE_URL}/api/user/${userId}/joined-class`,
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

        const classData = await response.json();
        setClassListStudent(classData);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);
  // Chạy lại effect khi classList thay đổi
  const handleLinkClick = (text) => {
    setProjectText(text);
    setIsMenuOpen(true);
  };

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  // Ref for the create class component
  const createClassRef = useRef();
  /*click hide of element*/
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        createClassRef.current &&
        !createClassRef.current.contains(event.target)
      ) {
        setIsCreate(false);
        setClassListStudent(false);
        setIsTeachingOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [isTeachingOpen, setIsTeachingOpen] = useState(false);

  const toggleTeaching = () => {
    setIsTeachingOpen(!isTeachingOpen);
  };
  const [isStudentOpen, setIsStudentOpen] = useState(false);
  const toggleStedent = () => {
    setIsStudentOpen(!isStudentOpen);
  };
  //chọn đối tượng class
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
  };
  // hiển thị hi tiết lớp môn học
  const [loading, setLoading] = useState(true);
  const [classDetail, setClassDetail] = useState(null);
  const [error, setError] = useState("");
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
        const { memberPerGroup } = classDetailData;
        localStorage.setItem("memberPerGroup", memberPerGroup);
        const { groupRegisterMethod } = classDetailData;
        localStorage.setItem("groupRegisterMethod", groupRegisterMethod);
        console.log("hhee:", memberPerGroup);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch class detail");
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetail();
  }, [classId]);
  const type = localStorage.getItem("type");
  console.log("hello type:", type);
  const togglesetting = () => {
    setIsSetting(!isSetting);
  };
  
  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-auto logo" onClick={toggleMenu}>
            <img src={menu} alt="Menu" /> {projectText}
          </div>
          <div className="col">
            <nav className="nav d-flex justify-content-end">
              <img src={add} height="40px" onClick={toggleCreate} />
              {isCreate && (
                <div ref={createClassRef} className="create-class-component">
                  <p>
                    {' '}
                    <Link to="/join" style={{ textDecoration: 'none' }}>
                      Join class
                    </Link>
                    <br></br>
                  </p>
                  <p>
                    <Link to="/create" style={{ textDecoration: 'none' }}>
                      Create class
                    </Link>
                  </p>
                </div>
              )}
              <ul className="nav-list d-flex">
                {isLoggedIn ? (
                  <>
                    <li>
                      <span>Hi ! {fullName}</span>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={handleLogout}
                        style={{ textDecoration: 'none' }}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      style={{ textDecoration: 'none' }}
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="additional-components">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <Link
                  to="/"
                  className="link"
                  onClick={() => handleLinkClick('Home')}
                >
                  <div className="menu_1">
                    <img src={home} /> Home
                  </div>
                </Link>
                {type === 'GV' ? (
  <Link className="link" onClick={() => handleLinkClick('Teaching')}>
    <div className="menu_1" onClick={toggleTeaching}>
      <img src={teach} alt="Teaching" /> Class Created
    </div>
  </Link>
) : (
  <Link className="link" onClick={() => handleLinkClick('Student')}>
    <div className="menu_1" onClick={toggleStedent}>
      <img src={student} alt="Student" /> Class Joined
    </div>
  </Link>
)}
{isTeachingOpen && (
  <div className="class-list-teach">
    <ul>
      {classList.map((classItem) => (
        <li
          key={classItem.id}
          onClick={() => handleLinkClick('Teaching >' + classItem.subjectName)}
        >
          <img src={iconClass} alt="Class" />
          <Link
            to={`/class/${classItem.subjectClassId}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <span className="class-name">{classItem.subjectName}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}
{isStudentOpen && (
  <div className="class-list-teach">
    <ul>
      {classListStudent.map((classItem) => (
        <li key={classItem.id}>
          <img src={iconClass} alt="Class" />
          <Link
            to={`/class/${classItem.subjectClassId}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <span className="class-name">{classItem.subjectName}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}


                <Link
                  className="link"
                  onClick={() => handleLinkClick('Setting')}
                >
                  <div className="menu_1 setting" onClick={togglesetting}>
                    <img src={setting} /> Setting
                  </div>
                </Link>

                {isSetting && (
                  <Link
                    to={`/change_pass`}
                    className="link"
                    onClick={() => handleLinkClick('Change password')}
                  >
                    <div className="class-list-teach1">
                      <img src={arrow} /> Change password
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;
