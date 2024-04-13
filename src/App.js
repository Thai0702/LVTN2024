import React from "react";
import { BrowserRouter as Router, Routes, Route,usHuseHistory } from "react-router-dom";
import Login from "./components/auth/Login.js";
import RegisterPage from "./components/auth/RegisterAccount.js";
import Homepage from "./Page/Homepage.js";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>        
      </div>
    </Router>
  );
};
export default App;



