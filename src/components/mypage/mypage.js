import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Header from "../layout/header";
import Loading from "../modal/loading";
import "./mypage.css"

export default function Mypage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // 내 예약목록은 굳이 들어갈때마다 요청할 필요가 없음.
  // 여기서 예약 목록을 state로 관리해서 자식 컴포넌트한테 props로 주면
  // 들어갈때마다 요청하지 않아도 될듯
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
        {loading ? <Loading /> : <Outlet/>}
      </div>
    </div>
  );
}