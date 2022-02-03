import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  const checkValidation = () => {
    const regex = /^010-?([0-9]{4})-?([0-9]{4})$/;
    if(!regex.test(phone)) {
      alert('옳바른 형식의 전화번호를 입력해주세요');
      return;
    }
    if(name.length < 2) {
      alert('옳바른 형식의 이름을 입력해주세요');
      return;
    }
    if(pw.length < 2) {
      //alert('옳바른 형식의 비밀번호를 입력해주세요');
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
    .then(response => {
      response.status === 201 && alert("비밀번호가 변경되었습니다.");
      onReset();
    })
    .catch(err => err.response.status === 404 && alert("비밀번호가 틀렸습니다."))
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(checkValidation()) {
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
            onChange={handleChange}
            required  
          />
        </div>
        <div className="btn_container">
          <button className="confirm_btn">변경하기</button>
        </div>
        <Link to="/" className='find'>비밀번호를 잊으셨나요?</Link>
      </form>
    </div>
  );
}