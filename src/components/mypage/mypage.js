import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from "../header"
import auth from "../../auth"
import "./mypage.css"

export default function Mypage() {
  useEffect(() => {
    auth();
  }, [])

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
        <Outlet/>  
      </div>
    </div>
  );
}