import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLoginStatus from "../hook/auth";
import axios from "axios";
import HomeButton from "../button/homeButton";
import "./header.css";

export default function Header() {
  const navigate = useNavigate();
  const isLogin = useLoginStatus(); // 확인 필요
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => setToggle(!toggle);

  const handleLog = async () => {
    if (!isLogin) {
      navigate("/login", { replace: true });
      return;
    }
    try {
      const url = "/students/logout";
      const response = await axios.get(url);
      if (response && response.status === 204) {
        alert("로그아웃 되었습니다.");
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <menu className="menuIcon" onClick={handleToggle}>
        <HomeButton url="/" />
        <i className="user_icon fas fa-user-circle"></i>
      </menu>
      <div className="header_menu">
        {toggle && 
          (<span onClick={handleLog}>{isLogin ? "로그아웃" : "로그인"}</span>)
          (<Link to="/mypage/history">마이페이지</Link>)
        }
      </div>
    </>
  );
}
