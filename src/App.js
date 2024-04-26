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
          <Route path="/class" element={<Class/>}/>
          <Route path="/showclass" element={<ShowClass/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/people" element={<People/>}/>
          <Route path="/group" element={<Group/>}/>
          <Route path="/project" element={<Project/>}/>
          <Route path="/listsv" element={<ListStudent/>}/> 
          <Route path="/random" element={<Random/>}/> 
          <Route path="/class/:classId" element={<DetailClass/>} />
        </Routes>        
      </div>
    </Router>
  );
};
export default App;
