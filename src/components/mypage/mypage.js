import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Header from "../header";
import Loading from "../loading";
import "./mypage.css"

export default function Mypage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
    .get("/check")
    .then((response) => response.status === 200 && setLoading(false))
    .catch((err) => err.response.status === 401 && navigate("/login"));
  });

  return (
    <div className='mypage_container'>
      <Header/>
      <nav>
        <NavLink 
          to="history"
          style={{ display: "block", margin: "1rem 0" }}
          className={({ isActive }) => isActive ? "isActive" : null}
        >
          예약 내역
        </NavLink>
        <NavLink 
          to="profile"
          style={{ display: "block", margin: "1rem 0" }}
          className={({ isActive }) => isActive ? "isActive" : null}
        >
          개인정보 변경
        </NavLink>
        <NavLink 
          to="password"
          style={{ display: "block", margin: "1rem 0" }}
          className={({ isActive }) => isActive ? "isActive" : null}
        >
          비밀번호 변경
        </NavLink>
      </nav>
      <div className="outlet">
        {loading && <Loading />}
        <Outlet/>  
      </div>
    </div>
  );
}