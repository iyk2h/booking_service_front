import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { History } from './history';
import { Editprofile } from './editprofile';

export default function Mypage() {
  const navigate = useNavigate();

  const [list, setList] = useState('');
  const [history, setHistory] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios
    .get("/booking/students")
    .then(response => response.status === 200 && setList(response.data))
    .catch(err => err.response.status === 401 && navigate("/login"))
  }, [])

  const handleClick = (e) => {
    const target = e.target.className;
    switch (target) {
      case "history":
        setHistory(!history);
        break;
      case "edit_profile":
        setEdit(!edit);
        break;
      default:
        return;
    }
  }

  return (
    <div onClick={handleClick}>
      <h3>My page</h3>
      <div key="history" className="history">
        예약 내역
        {history ? <History list={list}/> : null}
      </div>
      <div key="edit_profile" className="edit_profile">
        개인정보 변경
        {edit ? <Editprofile/> : null}
      </div>
      <div key="change_pw" className="change_pw">비밀번호 변경</div>
      <div key="withdraw" className="withdraw">회원 탈퇴</div>
    </div>
  );
}