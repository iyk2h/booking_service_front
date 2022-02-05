import axios from "axios";
import React, { useState } from "react";
import Confirm from "./confirm";
import Find from "./find";
import "./profile.css";

export default function Profile() {
  const [inputs, setInputs] = useState({
    name : '',
    phone : '',
    pw : ''
  });

  const {name, phone, pw} = inputs;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    })
  }

  const onReset = () => {
    setInputs({
      name : '',
      phone : '',
      pw : ''
    })
  }

  const checkProfileValidation = () => {
    const nameRegex = /^[가-힣]{2,4}$/;
    const phoneRegex = /^010-?([0-9]{4})-?([0-9]{4})$/;
    if(!nameRegex.test(name)) {
      alert('옳바른 형식의 이름을 입력해주세요');
      return;
    }
    if(!phoneRegex.test(phone)) {
      alert('옳바른 형식의 전화번호를 입력해주세요');
      return;
    }
    return true
  }

  const changeProfile = () => {
    const url = "/students";
    const data = {
      "name": name,
      "phone": phone,
      "pw": pw
    }    
    axios.put(url, data)
    .then(response => response.status === 201 && alert("프로필이 변경되었습니다."))
    .then(result => onReset())
    .catch(err => err.response.status === 404 && alert("비밀번호가 틀렸습니다."))
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(checkProfileValidation()) {
      changeProfile();
    }
  }

  return (
    <div className="phone_container">
      <form onSubmit={handleSubmit}>
        <div className="name">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            name="name"
            id="name_input"
            placeholder="   Name"
            value={name}
            onChange={handleChange}
            required  
          />
        </div>
        <div className="phone">
          <label htmlFor="phone_input">연락처</label>
          <input
            type="phone"
            name="phone"
            id="phone_input"
            value={phone}
            placeholder="   Phone Number"
            onChange={handleChange}
            required  
          />
        </div>
        <div className="pw">
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            name="pw"
            id="password_input"
            placeholder="   Password"
            value={pw}
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