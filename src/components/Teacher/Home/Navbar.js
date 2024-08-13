// import React, { useState, useEffect, useRef } from "react";
// import { useLocation } from 'react-router-dom';
// import "../Login_Register/Login"; 
// import { Link } from "react-router-dom";
// import menu from "../../img/menu.png"; 
// import home from "../../img/home.png";
// import axios from "axios";
// import setting from "../../img/setting.png";
// import teach from "../../img/teach.png";
// import { useParams } from "react-router-dom";
// import add from "../../img/add.png";
// import student from "../../img/student.png";  
// import iconClass from "../../img/iconClass.png";
// import { useNavigate } from "react-router-dom";
// import { BE_URL } from "../../../utils/Url_request";
// import arrow from "../../Admin/imgAdmin/arrow.png";
// import "./css/navbar.css"

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [projectText, setProjectText] = useState("Hỗ trợ giảng viên"); // State variable for project text
//   const [isCreate, setIsCreate] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(true); // Trạng thái đăng nhập
//   const [username, setUsername] = useState(""); // Tên người dùng
//   const navigate = useNavigate();
//   const { classId } = useParams();
//   const [isSetting, setIsSetting] = useState(false);
//   useEffect(() => {
//     const userLoggedIn = localStorage.getItem("isLoggedIn");
//     const savedUsername = localStorage.getItem("username");

//     if (userLoggedIn === "true" && savedUsername) {
//       setIsLoggedIn(true);
//       setUsername(savedUsername);
//     }
//   }, []);
//   const handleLogout = () => {
//     // Xóa token và tên người dùng từ localStorage
//     localStorage.clear();
//     setIsLoggedIn(false);
//     setUsername("");
//   };
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const [users, setUsers] = useState([]);
//   const [classList, setClassList] = useState([]);

//   const [classListStudent, setClassListStudent] = useState([]);
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(`${BE_URL}/api/account`);
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error.message);
//       }
//     };

//     fetchUsers();
//   }, []);
//   // lay userId by account
//   useEffect(() => {
//     const fetchClasses = async () => {
//       // Lấy token từ localStorage
//       const userId = localStorage.getItem("accountId");
//       const token = localStorage.getItem("token");
      

//       if (!userId) {
//         console.error("userId not found in localStorage");
//         return;
//       }

//       try {
//         const response = await fetch(
//           `${BE_URL}/api-gv/class/createdBy/${userId}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + token, // Thêm token vào header
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const classData = await response.json();
//         setClassList(classData);
//       } catch (error) {
//         console.error("Error fetching classes:", error);
//       }
//     };

//     fetchClasses();
//   }, []);
//   const fullName = localStorage.getItem("fullName");

//   //get all class of
//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const userId = localStorage.getItem("accountId");
//         const token = localStorage.getItem("token");

//         if (!userId) {
//           console.error("userId not found in localStorage");
//           return;
//         }

//         const response = await fetch(
//           `${BE_URL}/api/user/${userId}/joined-class`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + token,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const classData = await response.json();
//         setClassListStudent(classData);
//       } catch (error) {
//         console.error("Error fetching classes:", error);
//       }
//     };

//     fetchClasses();
//   }, []);
  




//   // Chạy lại effect khi classList thay đổi
//   const handleLinkClick = (text) => {
//     setProjectText(text);
//     setIsMenuOpen(true);
//   };

//   const toggleCreate = () => {
//     setIsCreate(!isCreate);
//   };

//   // Ref for the create class component
//   const createClassRef = useRef();
//   /*click hide of element*/
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         createClassRef.current &&
//         !createClassRef.current.contains(event.target)
//       ) {
//         setIsCreate(false);
//         setClassListStudent(true);
//         setIsTeachingOpen(true);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   const [isTeachingOpen, setIsTeachingOpen] = useState(true);

//   const toggleTeaching = () => {
//     setIsTeachingOpen(isTeachingOpen);
//   };
//   const [isStudentOpen, setIsStudentOpen] = useState(true);
//   const toggleStudent = () => {
//     setIsStudentOpen(isStudentOpen);
//   };

//   // hiển thị hi tiết lớp môn học
//   const [loading, setLoading] = useState(true);
//   const [classDetail, setClassDetail] = useState(null);
//   const [error, setError] = useState("");
//   useEffect(() => {
//     const fetchClassDetail = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("No token found");
//         setLoading(false);
//         return;
//       }
//       if (!classId) {
//         setError("Class ID is required");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`${BE_URL}/api-gv/class/get/${classId}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + token, // Add token to header
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const classDetailData = await response.json();
//         setClassDetail(classDetailData);
//         const { memberPerGroup } = classDetailData;
//         localStorage.setItem("memberPerGroup", memberPerGroup);
//         const { groupRegisterMethod } = classDetailData;
//         localStorage.setItem("groupRegisterMethod", groupRegisterMethod);
//         console.log("hhee:", memberPerGroup);
//       } catch (error) {
//         console.error("Error:", error);
//         setError("Failed to fetch class detail");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClassDetail();
//   }, [classId]);
//   const type = localStorage.getItem("type");
//   console.log("hello type:", type);
//   const togglesetting = () => {
//     setIsSetting(!isSetting);
//   };


//   // const toggleContent = () => {
//   //   setIsContentVisible(!isContentVisible);
//   // };
//   // const [isContentVisible, setIsContentVisible] = useState(false);



//   // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const location = useLocation();

//   // Close sidebar when changing routes (entering a class)
//   useEffect(() => {
//     setIsSidebarOpen(false); // Close the sidebar when the route changes
//   }, [location]);
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (

//     // <header className="header">
//     //   <div className="container-fluid">
//     //     <div className="row align-items-center">
//     //       <div className="col-auto logo" onClick={toggleMenu}>
//     //         <img src={menu} alt="Menu" /> {projectText}
//     //       </div>
//     //       <div className="col">
//     //         <nav className="nav d-flex justify-content-end">
//     //           <img src={add} height="40px" onClick={toggleCreate} />
//     //           {isCreate && (
//     //             <div ref={createClassRef} className="create-class-component">
//     //               <p>
//     //                 {' '}
//     //                 <Link to="/join" style={{ textDecoration: 'none' }}>
//     //                   Tham gia lớp
//     //                 </Link>
//     //                 <br></br>
//     //               </p>
//     //               <p>
//     //                 <Link to="/create" style={{ textDecoration: 'none' }}>
//     //                   Tạo lớp
//     //                 </Link>
//     //               </p>
//     //             </div>
//     //           )}
//     //           <ul className="nav-list d-flex link">
//     //             {isLoggedIn ? (
//     //               <>
//     //                 <li>
//     //                   <span>Xin chào!!! {fullName}</span>
                      
//     //                 </li>
//     //                 <li>
//     //                   <Link
//     //                     to="/login"
//     //                     onClick={handleLogout}
//     //                     // style={{ textDecoration: 'none' }}
//     //                     // className="link"
//     //                   >
//     //                     Đăng xuất
//     //                   </Link>
//     //                 </li>
//     //               </>
//     //             ) : (
//     //               <li>
//     //                 <Link
//     //                   to="/login"
//     //                   // style={{ textDecoration: 'none' }}
//     //                   // className="link"
//     //                 >
//     //                   Đăng nhập
//     //                 </Link>
//     //               </li>
//     //             )}
//     //           </ul>
//     //         </nav>
//     //       </div>
//     //     </div>
//     //   </div>

//     //   {isMenuOpen && (
//     //     <div className="additional-components">
//     //       <div className="container-fluid">
//     //         <div className="row">
//     //           <div className="col-12">
//     //             <Link
//     //               to="/"
//     //               className="link"
//     //               // onClick={() => handleLinkClick('Home')}
//     //             >
//     //               <div className="menu_1">
//     //                 <img src={home} /> Trang chủ
//     //               </div>
//     //             </Link>
//     //             {type === 'GV' ? (
//     //               <Link className="link"
//     //               //  onClick={() => handleLinkClick('Teaching')}
//     //                >
//     //                 <div className="menu_1" onClick={toggleTeaching}>
//     //                   <img src={teach} alt="Teaching" /> Lớp đã tạo
//     //                 </div>
//     //               </Link>
//     //             ) : (
//     //               <Link className="link" 
//     //               // onClick={() => handleLinkClick('Student')}
//     //               >
//     //                 <div className="menu_1" onClick={toggleStudent}>
//     //                   <img src={student} alt="Student" /> Lớp đã tham gia
//     //                 </div>
//     //               </Link>
//     //             )}
//     //             {isTeachingOpen && (
//     //               <div className="class-list-teach" style={{ maxHeight: '400px', overflowY: 'auto' }}>
//     //                 <ul >
//     //                   {classList.map((classItem) => (
//     //                     <li
//     //                       key={classItem.id}
//     //                        onClick={() => handleLinkClick('Teaching >' + classItem.subjectName)}
//     //                        style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
//     //                     >
//     //                       <img src={iconClass} alt="Class" />
//     //                       <Link
//     //                         to={`/class/${classItem.subjectClassId}`}
//     //                         style={{ 
//     //                           textDecoration: 'none', 
//     //                           color: 'black', 
//     //                           whiteSpace: 'nowrap', 
//     //                           overflow: 'hidden', 
//     //                           textOverflow: 'ellipsis', 
//     //                           flex: 1 
//     //                         }}
//     //                       >
//     //                         <span className="class-name">{classItem.subjectName}</span>
//     //                       </Link>
//     //                     </li>
//     //                   ))}
//     //                 </ul>
//     //               </div>
//     //             )}
//     //             {isStudentOpen && (
//     //               <div className="class-list-teach">
//     //                 {classListStudent.length > 0 && (
//     //                 <ul>
//     //                   {classListStudent.map((classItem) => (
//     //                     <li key={classItem.id}
//     //                      onClick={() => handleLinkClick('Student >' + classItem.subjectName)}
//     //                     >
//     //                       <img src={iconClass} alt="Class" />
//     //                       <Link
//     //                         to={`/class/${classItem.subjectClassId}`}
//     //                         style={{ textDecoration: 'none', color: 'black' }}
//     //                       >
//     //                         <span className="class-name">{classItem.subjectName}</span>
//     //                       </Link>
//     //                     </li>
//     //                   ))}
//     //                 </ul>
//     //                 )}
//     //               </div>
//     //             )}
//     //             <Link
//     //               className="link"
//     //               // onClick={() => handleLinkClick('Setting')}
//     //             >
//     //               <div className="menu_1 setting" onClick={togglesetting}>
//     //                 <img src={setting} /> Cài đặt
//     //               </div>
//     //             </Link>

//     //             {isSetting && (
//     //               <Link
//     //                 to={`/change_pass`}
//     //                 className="link"
//     //                 // onClick={() => handleLinkClick('Change password')}
//     //               >
//     //                 <div className="class-list-teach1">
//     //                   <img src={arrow} /> Đổi mật khẩu
//     //                 </div>
//     //               </Link>
//     //             )}
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   )}
//     //  </header>


//     // <div className="sidebar-container">
//     //   {/* Header with hamburger icon */}
//     //   <header className="header">
//     //     <div className="container-fluid">
//     //       <div className="row align-items-center">
//     //         <div className="col-auto logo" onClick={toggleSidebar}>
//     //           <img src={menu} alt="Menu" /> {projectText}
//     //         </div>
//     //         <div className="col">
//     //           <nav className="nav d-flex justify-content-end">
//     //           <img src={add} height="40px" onClick={toggleCreate} />
//     //            {isCreate && (
//     //             <div ref={createClassRef} className="create-class-component">
//     //               <p>
//     //                 {' '}
//     //                 <Link to="/join" style={{ textDecoration: 'none' }}>
//     //                   Tham gia lớp
//     //                 </Link>
//     //                 <br></br>
//     //               </p>
//     //               <p>
//     //                 <Link to="/create" style={{ textDecoration: 'none' }}>
//     //                   Tạo lớp
//     //                 </Link>
//     //               </p>
//     //             </div>
//     //           )}
//     //           <ul className="nav-list d-flex link">
//     //             {isLoggedIn ? (
//     //               <>
//     //                 <li>
//     //                   <span>Xin chào!!! {fullName}</span>
                      
//     //                 </li>
//     //                 <li>
//     //                   <Link
//     //                     to="/login"
//     //                     onClick={handleLogout}
//     //                     // style={{ textDecoration: 'none' }}
//     //                     // className="link"
//     //                   >
//     //                     Đăng xuất
//     //                   </Link>
//     //                 </li>
//     //               </>
//     //             ) : (
//     //               <li>
//     //                 <Link
//     //                   to="/login"
//     //                   // style={{ textDecoration: 'none' }}
//     //                   // className="link"
//     //                 >
//     //                   Đăng nhập
//     //                 </Link>
//     //               </li>
//     //             )}
//     //            </ul>
//     //           </nav>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </header>

//     //   {/* Sidebar */}
//     //   {isSidebarOpen && (
//     //     <div className="sidebar">
//     //       <div className="menu-item">
//     //         <Link to="/" className="link">
//     //           <div className="menu_1">
//     //             <img src={home} alt="Home" style={{ width: "20px", height: "20px" }}/> Trang chủ
//     //           </div>
//     //         </Link>
//     //       </div>
//     //       <div className="menu-item">
//     //         {/* <Link to="/created-classes" className="link">
//     //           <div className="menu_1">
//     //             <img src={teach} alt="Teaching" style={{ width: "20px", height: "20px" }}/> Lớp đã tạo
//     //           </div>
//     //         </Link> */}
//     //         {type === 'GV' ? (
//     //               <Link className="link"
//     //               //  onClick={() => handleLinkClick('Teaching')}
//     //                >
//     //                 <div className="menu_1" onClick={toggleTeaching}>
//     //                   <img src={teach} alt="Teaching" style={{ width: "20px", height: "20px" }}/> Lớp đã tạo
//     //                 </div>
//     //               </Link>
//     //             ) : (
//     //               <Link className="link" 
//     //               // onClick={() => handleLinkClick('Student')}
//     //               >
//     //                 <div className="menu_1" onClick={toggleStudent}>
//     //                   <img src={student} alt="Student" style={{ width: "20px", height: "20px" }}/> Lớp đã tham gia
//     //                 </div>
//     //               </Link>
//     //             )}
//     //             {isTeachingOpen && (
//     //               <div className="class-list-teach" >
//     //                 <ul >
//     //                   {classList.map((classItem) => (
//     //                     <li
//     //                       key={classItem.id}
//     //                        onClick={() => handleLinkClick('Teaching >' + classItem.subjectName)}
//     //                        style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
//     //                     >
//     //                       <img src={iconClass} alt="Class" style={{ width: "20px", height: "20px" }}/>
//     //                       <Link
//     //                         to={`/class/${classItem.subjectClassId}`}
//     //                         style={{ 
//     //                           textDecoration: 'none', 
//     //                           color: 'black', 
//     //                           whiteSpace: 'nowrap', 
//     //                           overflow: 'hidden', 
//     //                           textOverflow: 'ellipsis', 
//     //                           flex: 1 
//     //                         }}
//     //                       >
//     //                         <span className="class-name">{classItem.subjectName}</span>
//     //                       </Link>
//     //                     </li>
//     //                   ))}
//     //                 </ul>
//     //               </div>
//     //             )}
//     //             {isStudentOpen && (
//     //               <div className="class-list-teach">
//     //                 {classListStudent.length > 0 && (
//     //                 <ul>
//     //                   {classListStudent.map((classItem) => (
//     //                     <li key={classItem.id}
//     //                      onClick={() => handleLinkClick('Student >' + classItem.subjectName)}
//     //                     >
//     //                       <img src={iconClass} alt="Class" />
//     //                       <Link
//     //                         to={`/class/${classItem.subjectClassId}`}
//     //                         style={{ textDecoration: 'none', color: 'black' }}
//     //                       >
//     //                         <span className="class-name">{classItem.subjectName}</span>
//     //                       </Link>
//     //                     </li>
//     //                   ))}
//     //                 </ul>
//     //                 )}
//     //               </div>
//     //             )}
//     //       </div>
//     //       <div className="menu-item">
//     //       <Link
//     //               className="link"
//     //               // onClick={() => handleLinkClick('Setting')}
//     //             >
//     //               <div className="menu_1 setting" onClick={togglesetting}>
//     //                 <img src={setting} style={{ width: "20px", height: "20px" }}/> Cài đặt
//     //               </div>
//     //             </Link>

//     //             {isSetting && (
//     //               <Link
//     //                 to={`/change_pass`}
//     //                 className="link"
//     //                 // onClick={() => handleLinkClick('Change password')}
//     //               >
//     //                 <div className="class-list-teach1">
//     //                   <img src={arrow} /> Đổi mật khẩu
//     //                 </div>
//     //               </Link>
//     //             )}

//     //       </div>
//     //     </div>
//     //   )}
//     // </div>



    
//   );
// }
// export default Navbar;






import React, { useState, useEffect, useRef } from "react";
import "../Login_Register/Login"; 
import { Link } from "react-router-dom";
import menu from "../../img/menu.png"; 
import home from "../../img/home.png";
import axios from "axios";
import setting from "../../img/setting.png";
import teach from "../../img/teach.png";
import { useParams } from "react-router-dom";
import add from "../../img/add.png";
import student from "../../img/student.png";  
import iconClass from "../../img/iconClass.png";
import { useNavigate } from "react-router-dom";
import { BE_URL } from "../../../utils/Url_request";
import arrow from "../../Admin/imgAdmin/arrow.png";
import "./css/navbar.css"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [projectText, setProjectText] = useState("Hỗ trợ giảng viên"); // State variable for project text
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
      const userId = localStorage.getItem("accountId");
      const token = localStorage.getItem("token");
      

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
        setClassListStudent(true);
        setIsTeachingOpen(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [isTeachingOpen, setIsTeachingOpen] = useState(true);

  const toggleTeaching = () => {
    setIsTeachingOpen(isTeachingOpen);
  };
  const [isStudentOpen, setIsStudentOpen] = useState(true);
  const toggleStudent = () => {
    setIsStudentOpen(isStudentOpen);
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
                      Tham gia lớp
                    </Link>
                    <br></br>
                  </p>
                  {type === 'GV' ? (
              <p>
                <Link to="/create" style={{ textDecoration: 'none' }}>
                     Tạo lớp
                </Link>
              </p>
            ) : null}
                </div>
              )}
              <ul className="nav-list d-flex link">
                {isLoggedIn ? (
                  <>
                    <li>
                      <span>Xin chào!!! {fullName}</span>
                      
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={handleLogout}
                        // style={{ textDecoration: 'none' }}
                        // className="link"
                      >
                        Đăng xuất
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      // style={{ textDecoration: 'none' }}
                      // className="link"
                    >
                      Đăng nhập
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
                  // onClick={() => handleLinkClick('Home')}
                >
                  <div className="menu_1">
                    <img src={home} /> Trang chủ
                  </div>
                </Link>
                {type === 'GV' ? (
                  <Link className="link"
                  //  onClick={() => handleLinkClick('Teaching')}
                   >
                    <div className="menu_1" onClick={toggleTeaching}>
                      <img src={teach} alt="Teaching" /> Lớp đã tạo
                    </div>
                  </Link>
                ) : (
                  <Link className="link" 
                  // onClick={() => handleLinkClick('Student')}
                  >
                    <div className="menu_1" onClick={toggleStudent}>
                      <img src={student} alt="Student" /> Lớp đã tham gia
                    </div>
                  </Link>
                )}
                {isTeachingOpen && (
                  <div className="class-list-teach" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <ul >
                      {classList.map((classItem) => (
                        <li
                          key={classItem.id}
                           //onClick={() => handleLinkClick('Teaching >' + classItem.subjectName)}
                           style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
                        >
                          <img src={iconClass} alt="Class" />
                          <Link
                            to={`/class/${classItem.subjectClassId}`}
                            style={{ 
                              textDecoration: 'none', 
                              color: 'black', 
                              whiteSpace: 'nowrap', 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis', 
                              flex: 1 
                            }}
                          >
                            <span className="class-name">{classItem.subjectName}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {isStudentOpen && (
                  <div className="class-list-teach" >
                    {classListStudent.length > 0 && (
                     
                    <ul>
                   
                      {classListStudent.map((classItem) => (
                        <li key={classItem.id}
                        style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
                         //onClick={() => handleLinkClick('Student >' + classItem.subjectName)}
                        >
                          <img src={iconClass} alt="Class" />
                          <Link to={`/class/${classItem.subjectClassId}`}
                            style={{ 
                              textDecoration: 'none', 
                              color: 'black', 
                              whiteSpace: 'nowrap', 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis', 
                              flex: 1 
                            }}
                          >
                            <span className="class-name">{classItem.subjectName}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    )}
                  </div>
                )}
                
                <Link
                  className="link"
                  // onClick={() => handleLinkClick('Setting')}
                >
                  <div className="menu_1 setting" onClick={togglesetting}>
                    <img src={setting} /> Cài đặt
                  </div>
                </Link>

                {isSetting && (
                  <Link
                    to={`/change_pass`}
                    className="link"
                    // onClick={() => handleLinkClick('Change password')}
                  >
                    <div className="class-list-teach1">
                      <img src={arrow} /> Đổi mật khẩu
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