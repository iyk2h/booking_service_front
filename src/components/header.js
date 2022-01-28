import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [log, setLog] = useState(false);

  const handleLink = e => {
    e.preventDefault();
    if(e.target.className === "log") {
      log && logout();
    }
  }

  // 토큰으로 바뀌면 하는게 편함.
  const logout = () => {
    axios.get("/students/logout")
    .then(response => setLog(false))
    .catch(err => console.log("로그아웃 에러" + err))
  }

  return (
    <div>
      <div>
        <span>프로필</span>
        <button>toggle</button>
      </div>
      <div>
        <ul onClick={handleLink}>
          <li><Link to="/mypage">내 예약</Link></li>
          <li><Link to="/mypage">계정</Link></li>
          <li className='log'>{log ? "로그아웃" : "로그인"}</li>
        </ul>
      </div>
    </div>
  );
}