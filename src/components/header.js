import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "./header.css"

export default function Header() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => logIn(), []);

  const logIn = () => {
    const url = "/students/check";
    const headers = { "Content-Type" : "application/json" }
    const data = {
      "id": 0,
      "pw": "string"
    }
    axios
    .post(url, data, headers)
    .then(response => response.status === 201 && setIsLogin(true))
    .catch(err => err.response.status === 401 && console.log("err"))
  }
  
  const handleIcon = () => setToggle(!toggle);

  const handleLog = () => {
    if(isLogin) {
      const url = "/students/logout"
      axios
      .get(url)
      .then(response => setIsLogin(false))
      .catch(err => console.log("Logout Err" + err))
      return;
    }
    navigate("/login");
  }

  const handleList = () => {
    navigate("/mypage")
  }
  return (
    <>
      <menu
        className="menuIcon"
        onClick={handleIcon}
      >
        <Link to="/"><img src="../../asset/images/MNU_LOGO.png" alt='MNU' className='icon'/></Link>
        <i className="icon fas fa-user-circle"></i>
      </menu>
      <div className="header_menu">  
        {toggle && <span onClick={handleLog}>{isLogin ? "로그아웃" : "로그인"}</span>}
        {toggle && <span onClick={handleList}>마이페이지</span>}
      </div>
    </>
  );
}