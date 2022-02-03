import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./password.css";

export default function Password() {
  const [inputs, setInputs] = useState({
    old : '',
    _new : '',
    confirm : ''
  })
  const inputRefs = useRef({});
  
  const {old, _new, confirm} = inputs;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs, // 복사 후 
      [name] : value // 값 변경
    })
  }

  const onReset = () => {
    setInputs({
      old : '',
      _new : '',
      confirm : ''
    })
  }

  // front단에서 먼저 입력 형식 검사해야함.
  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputs["old"] === '') {
      console.log("비번을 입력해주세요.");
      return;
    } 
    if(inputs["_new"] === '') {
      console.log("새비번을 입력해주세요.");
      return;
    }  
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(!regex.test(inputs["_new"])) {
      console.log("최소 8 자, 하나 이상의 문자와 하나의 숫자를 입력해 주세요.");
      return;
    } 
    if(inputs["confirm"] === '') {
      console.log("확인비번을 입력해주세요.");
      return;
    } 
    if(inputs["_new"] !== inputs["confirm"]) {
      console.log("새비밀번호와 확인비밀번호가 일치하지 않습니다.");
      return;
    } 
  }

  const changePassword = () => {
    const url = "/students/password";
    const data = {
      "newPw": _new,
      "oldPw": old
    }
    axios.put(url, data)
    .then(response => response.status === 200 && alert("비밀번호가 변경되었습니다."))
    .catch(err => err.response.status === 401 && alert("비밀번호가 틀렸습니다."))
  }

  return (
    <div className="pass-container">
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="old">이전 비밀번호</label>
            <input type="password" id="old" name="old_pw" onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="_new">새 비밀번호</label>
            <input type="password" id="_new" name="new_pw" onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="confirm">비밀번호 확인 :</label>
            <input type="password" id="confirm" name="confirm_pw" onChange={handleChange}/>
        </div>
        <div className="btn">
            <button className="confirm_btn" type="submit">변경하기</button>
        </div>
        <Link to="/" className='find'>비밀번호를 잊으셨나요?</Link>
    </form>
    </div>
  );
}