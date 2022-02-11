import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// User
import App from './App';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Calendar from './components/booking/calendar';
import Login from "./components/login/login";
import Signup from './components/signup/signup';
import Facility from './components/layout/facility';
import Mypage from "./components/mypage/mypage";
import History from "./components/mypage/history";
import Profile from "./components/mypage/profile";
import Password from "./components/mypage/password";
// Admin
import AdminLogin from "./components/Admin/login/AdminLogin";
import AdminDashBoard from "./components/Admin/dashBoard/AdminDashBoard";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* User */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking" element={<Facility />}>
          <Route path=":fno" element={<Calendar />} />
          <Route index element={<Navigate replace to="/"/>} />
        </Route>
        <Route path="/mypage" element={<Mypage />} >
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route path="password" element={<Password />} />
        </Route>
        <Route path="*" element={<div><p>404 Not Found</p></div>}/>

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashBoard />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);