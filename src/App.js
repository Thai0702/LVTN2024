import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login.js";
import RegisterPage from "./components/auth/PageMain/RegisterAccount.js";
import RegisterAdmin from "./components/auth/pageAdmin/RegisterAdmin.js";
import Homepage from "./Page/Homepage.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Join from './components/auth/Join.js'
import Create from "./components/auth/Create.js";
import Class from "./components/auth/Class.js";
import ShowClass from "./components/auth/ShowClass.js";
import DetailClass from "./components/auth/DetailClass.js";
import Admin from "./components/auth/Admin.js";
import People from "./components/auth/PageMain/People.js";
import Project from "./components/auth/PageMain/Project.js";
import Group from "./components/auth/PageMain/Group.js";
import ListStudent from "./components/auth/PageMain/ListStudent.js";
import Random from "./components/auth/PageMain/Random.js";
import Add from "./components/auth/PageMain/Add.js";
import DetailClassStudent from "./components/auth/DetailClassStudent.js";

//import Stream_view from "./Page/Stream_view.js"
import AddMember_view from "./Page/AddMember_view.js"
import Group_view from "./Page/Group_view.js"
import People_view from "./Page/People_view.js"
import Project_view from "./Page/Project_view.js"
import Create_report from "./Page/Create_report.js"
//import Report_view from "./Page/Report_view.js"
import Add_group from "./Page/Add_group.js";
// import ShowMemberGroup from "./Page/ShowMemberGroup.js";
import AddProject from "./Page/Add_project.js";
import ForgotPass from "./components/auth/ForgotPass.js";
import ResetPass from "./components/auth/ResetPass.js";
import ChangePass from "./components/auth/ChangePass.js";
import HomeAdmin from "./components/auth/pageAdmin/HomeAdmin.js";
import ChangPassAdmin from "./components/auth/pageAdmin/ChangPassAdmin.js";
import ListAccount from "./components/auth/pageAdmin/ListAccount.js";
import ListClass from "./components/auth/pageAdmin/ListClass.js";
import ListGroup from "./components/auth/pageAdmin/ListGroup.js";
import ListProject from "./components/auth/pageAdmin/ListProject.js";
import ListReport from "./components/auth/pageAdmin/ListReport.js";
import ShowMemberGroup from './components/auth/PageTeacher/ShowMemberGroup.js';
import CreateReport from "./components/auth/PageTeacher/CreateReport.js";
// page class detail
import Stream from "./components/auth/PageMain/Stream.js";
import AddGroup from "./components/auth/PageMain/AddGroup.js";

import EditClass from "./Page/EditClass.js";


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
          <Route path="/classstudent/:classId" element={<DetailClassStudent />} />

          {/* page class detail */}
          <Route path="/stream/:classId" element={<Stream />} />
          <Route path="/people/:classId" element={<People />} />
          <Route path="/project/:classId" element={<Project/>}/>
          <Route path="/group/:classId" element={<Group/>}/>
          <Route path="/addGroup/:classId" element={<AddGroup/>}/>


          <Route path="/project-view/:classId/add-project" element={<AddProject />} />

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



          <Route path="/editclass/:classId" element={<EditClass />} />

        </Routes>



      </div>
    </Router>
  );
};
export default App;
