import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login.js";
import RegisterPage from "./components/auth/PageMain/RegisterAccount.js";
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
import ShowProject from "./components/auth/PageMain/ShowProject.js";
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
import ShowMemberGroup from "./Page/ShowMemberGroup.js";
import AddProject from "./Page/Add_project.js";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/join" element={<Join/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/showproject" element={<ShowProject/>}/>
          <Route path="/class" element={<Class/>}/>
          <Route path="/showclass/:groupId" element={<ShowClass/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/people" element={<People/>}/>
          <Route path="/group" element={<Group/>}/>
          <Route path="/project" element={<Project/>}/>
          <Route path="/listsv" element={<ListStudent/>}/> 
          <Route path="/random" element={<Random/>}/> 
          <Route path="/add" element={<Add/>}/> 
          <Route path="/class/:classId" element={<DetailClass/>} />
          <Route path="/classstudent/:classId" element={<DetailClassStudent/>} />

          {/* STREAM */}
          {/* <Route path="/stream-view/:classId" element={<Stream_view/>}/> */}

          {/* REPORT */}
           {/* <Route path="/report-view/:groupId" element={<Report_view/>}/> */}
          <Route path="/report-view/:groupId" element={<Create_report/>}/>
          
          {/* PEOPLE */}
          <Route path="/people-view/:classId" element={<People_view/>}/>

          <Route path="/addmember-view" element={<AddMember_view/>}/>


          <Route path="/group-view/:classId" element={<Group_view/>}/>
          <Route path="/group-view/:classId/add-group" element={<Add_group/>}/>
          
          <Route path="/project-view/:classId" element={<Project_view/>}/>
          <Route path="/project-view/:classId/add-project" element={<AddProject/>}/>

          <Route path="/show_member/:classId" element={<ShowMemberGroup/>}/>  

        </Routes>        
      </div>
    </Router>
  );
};
export default App;
