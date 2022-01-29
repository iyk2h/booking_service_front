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
      <Header />
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
          개인 정보
        </NavLink>
      </nav>
      <div className="outlet">
        <Outlet/>  
      </div>
    </div>
  );
}