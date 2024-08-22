import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//ADMIN
import Admin from "./components/Admin/Admin.js";
import HomeAdmin from "./components/Admin/HomeAdmin.js";
import ChangPassAdmin from "./components/Admin/ChangPassAdmin.js";
import ListAccount from "./components/Admin/ListAccount.js";
import ListClass from "./components/Admin/ListClass.js";
import ListGroup from "./components/Admin/ListGroup.js";
import ListProject from "./components/Admin/ListProject.js";
import ListReport from "./components/Admin/ListReport.js";
import AccountStudent from "./components/Admin/AccountStudent.js";
import AccountTeacher from "./components/Admin/AccountTeacher.js";

//GIAOVIEN
import Login from "./components/Teacher/Login_Register/Login.js";
import RegisterPage from "./components/Teacher/Login_Register/RegisterAccount.js";
import RegisterAdmin from "./components/Admin/RegisterAdmin.js";
import Homepage from "./components/Teacher/Home/Homepage.js";
import Create from "./components/Teacher/Tacvu/Create.js";
import Class from "./components/Teacher/Class/Class.js";
import ShowClass from "./components/Teacher/Class/ShowClass.js";
// import DetailClass from "./components/auth/DetailClass.js";
import People from "./components/Teacher/Tacvu/People.js";
import Project from "./components/Teacher/Tacvu/Project.js";
import Group from "./components/Teacher/Tacvu/Group.js";
import ListStudent from "./components/Teacher/Tacvu/ListStudent.js";
import Random from "./components/Teacher/Tacvu/Random.js";
import Add from "./components/Teacher/Tacvu/Add.js";
import ForgotPass from "./components/Teacher/Login_Register/ForgotPass.js";
import ResetPass from "./components/Teacher/Login_Register/ResetPass.js";
import ChangePass from "./components/Teacher/Login_Register/ChangePass.js";
import ShowMemberGroup from './components/Teacher/Tacvu/ShowMemberGroup.js';
import CreateReport from "./components/Teacher/Tacvu/CreateReport.js";
import Stream from "./components/Teacher/Class/Stream.js";
import AddGroup from "./components/Teacher/Tacvu/AddGroup.js";
import UpdateReport from "./components/Teacher/Tacvu/UpdateReport.js";
import TearchAddMember from "./components/Teacher/Tacvu/TearchAddMember.js";
import EditClass from "./components/Teacher/Class/EditClass.js";
import MethodAddGroup from "./components/Teacher/Tacvu/MethodAddGroup.js";
import Upload from "./components/Teacher/Tacvu/Upload.js"
import Submit from "./components/Teacher/Tacvu/Submit.js";
import Request from "./components/Teacher/Tacvu/Request.js";
import ShowProject from "./components/Teacher/Tacvu/ShowProject.js"
import ListProjectOfClass from "./components/Teacher/Tacvu/ListProjectOfClass.js";
import EditProject from "./components/Teacher/Class/EditProject.js"
import EditReport from "./components/Teacher/Class/EditReport.js"

//SINHVIEN
import Join from './components/Sinhvien/Join.js'
import Score from "./components/Teacher/Tacvu/Score.js";
import Document from "./components/Teacher/Class/Document.js";


const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/join" element={<Join />} />
          <Route path="/create" element={<Create />} />
          <Route path="/class" element={<Class />} />
          <Route path="/showclass/:groupId" element={<ShowClass />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/people" element={<People />} />
          <Route path="/group" element={<Group />} />
          <Route path="/project" element={<Project />} />
          <Route path="/listsv" element={<ListStudent />} />
          <Route path="/random" element={<Random />} />
          <Route path="/add" element={<Add />} />
          <Route path="/class/:classId" element={<Stream />} />



          {/* page class detail */}
          <Route path="/stream/:classId" element={<Stream />} />
          <Route path="/people/:classId" element={<People />} />
          <Route path="/project/:classId" element={<Project />} />
          <Route path="/group/:classId" element={<Group />} />
          <Route path="/addGroup/:classId" element={<AddGroup />} />
          <Route path="/tearchAdd/:classId" element={<TearchAddMember/>}/>
          <Route path="/methodGroup/:classId" element={<MethodAddGroup/>}/>


          {/* forgot password */}
          <Route path="/forgot_pass" element={<ForgotPass />} />

          <Route path="/reset_pass" element={<ResetPass />}></Route>
          {/* ChangePass */}
          <Route path="/change_pass" element={<ChangePass />} />

          <Route path="/showmemberGroup/:classId/:groupId" element={<ShowMemberGroup />} />
          <Route path="/createReport/:classId/:groupId" element={<CreateReport />} />


          {/* Admin page */}
          <Route path="/regiterAdmin" element={<RegisterAdmin />} />
          <Route path="/homAdmin" element={<HomeAdmin />} />
          <Route path="/changepassAdmin" element={<ChangPassAdmin />} />
          <Route path="/listAccount" element={<ListAccount />} />
          <Route path="/listClass" element={<ListClass />} />
          <Route path="/listGroup" element={<ListGroup />} />
          <Route path="/listProject" element={<ListProject />} />
          <Route path="/listReport" element={<ListReport />} />


          {/* Page tearcher */}
          <Route path="/updateReport/:classId/:requestId" element={<UpdateReport />} />
          <Route path="/editclass" element={<EditClass />} />
          <Route path="/upload/:classId/:requestId" element={<Upload />} />
          <Route path="/submit/:classId/:requestId" element={<Submit/>}/>
          <Route path="/showrequest/:groupId/:projectId" element={<Request/>}/>


          <Route path="/upload/:classId/:requestId" element={<Upload />} />
          <Route path="/submit/:classId/:requestId" element={<Submit/>}/>



          <Route path="/showproject/:classId/:groupId" element={<ShowProject/>}/>


          <Route path="/score/report/:classId/:requestId/:groupId" element={<Score/>}/>


          
          <Route path="/document/:classId" element={<Document/>}/>

          <Route path="/projectListClass/:classId" element={<ListProjectOfClass/>}/>

          <Route path="/editproject/:classId" element={<EditProject/>}/>



          <Route path="/accountStudent" element={<AccountStudent/>}/>
          <Route path="/accountTearch" element={<AccountTeacher/>}/>

          <Route path="/editreport/:classId" element={<EditReport/>}/>


        </Routes>
      </div>
    </Router>
  );
};
export default App;