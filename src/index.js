import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Calendar } from './components/calendar';
import { Login } from "./components/login";
import Signup from './components/signup';
import Facility from './components/facility';
import Check from "./components/check";
import Mypage from "./components/mypage/mypage";
import History from "./components/mypage/history";
import Profile from "./components/mypage/profile";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/check" element={<Check />} />
        <Route path="/booking" element={<Facility />}>
          <Route path=":fno" element={<Calendar />} />
          <Route index element={<Navigate replace to="/"/>} />
        </Route>
        <Route path="/mypage" element={<Mypage />} >
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<div><p>404 Not Found</p></div>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);