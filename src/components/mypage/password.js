import React, { useState } from 'react';
import axios from 'axios';
import Confirm from "./confirm";
import Find from "./find";
import useLoginStatus from '../hook/auth';
import "./password.css";
import { useNavigate } from 'react-router-dom';

export default function Password() {
  const navigate = useNavigate();
  const isLogin = useLoginStatus();
  if(isLogin === false) {
    navigate('/login', {replace : true});
  }

  const [inputs, setInputs] = useState({
    old : '',
    _new : '',
    confirm : ''
  });
  
  const {old, _new, confirm} = inputs;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs, 
      [name] : value 
    })
  }

  const onReset = () => {
    setInputs({
      old : "",
      _new : "",
      confirm : ""
    })
  }

  const checkPasswordValidation = () => {
    // const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    // if(!regex.test(_new)) {
    //   console.log("최소 8 자, 하나 이상의 문자와 하나의 숫자를 입력해 주세요.");
    //   return;
    // } 
    if(_new !== confirm) {
      alert("새비밀번호와 확인비밀번호가 일치하지 않습니다.");
      return;
    } 
    if(old === _new) {
      alert("기존과 다른 비밀번호를 입력해 주세요.");
      return;
    }
    return true;
  }

  const changePassword = () => {
    const url = "/students/password";
    const data = {
      "newPw": _new,
      "oldPw": old
    }
    axios.put(url, data)
    .then(response => response.status === 201 && alert("변경되었습니다."))
    .then(result => onReset())
    .catch(err => err.response.status === 404 && alert("비밀번호가 틀렸습니다."))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(checkPasswordValidation()) {
      changePassword();
    }
  }

  return (
    <div className="pass-container">
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="old">이전 비밀번호</label>
            <input
              type="password"
              id="old"
              name="old"
              placeholder="   Old Password"
              onChange={handleChange}
              value={old}
              required
            />
        </div>
        <div>
            <label htmlFor="_new">새 비밀번호</label>
            <input
              type="password" 
              id="_new" 
              name="_new" 
              placeholder="   New Password" 
              value={_new}
              onChange={handleChange} 
              required
            />
        </div>
        <div>
            <label htmlFor="confirm">비밀번호 확인</label>
            <input 
              type="password" 
              id="confirm" 
              name="confirm" 
              placeholder="   Confirm" 
              value={confirm}
              onChange={handleChange} 
              required
            />
        </div>
        <Confirm />
        <Find />
      </form>
    </div>
  );
}