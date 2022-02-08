import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLoginStatus from "../hook/auth";
import axios from "axios";
import "./header.css";

export default function Header() {
  const navigate = useNavigate();
  const isLogin = useLoginStatus();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => setToggle(!toggle);

  const handleLog = () => {
    if(!isLogin) {
      navigate("/login", {replace : true});
      return;
    }
    axios
    .get("/students/logout")
    .then(response => {
      if(response.status === 204) {
        alert("로그아웃 되었습니다.");
        navigate("/", {replace : true});
      }
    })
    .catch((err) => console.log("Logout Err" + err));
  };

  return (
    <>
      <menu className="menuIcon" onClick={handleToggle}>
        <Link to="/">
          <img
            src="/asset/images/MNU_LOGO.jpeg"
            style={{color : "mediumseagreen"}}
            alt="MNU"
            className="icon"
          />
        </Link>
        <i className="user_icon fas fa-user-circle"></i>
      </menu>
      <div className="header_menu">
        {toggle && (
          <span onClick={handleLog}>{isLogin ? "로그아웃" : "로그인"}</span>
        )}
        {toggle && <Link to="/mypage/history">마이페이지</Link>}
      </div>
    </>
  );
}
