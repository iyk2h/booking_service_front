import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";
import {
  checkIdFormat,
  checkPhoneFormat,
  chekcBothPwMatch
} from "../../utils/check";

export default function Signup() {
  const navigate = useNavigate();

  const [isDuplicate, setIsDuplicate] = useState(null);
  const [inputs, setInputs] = useState({
    name : '',
    id : '',
    phone : '',
    pw : '',
    confirm : '',    
  })
  
  const {name, id, phone, pw, confirm} = inputs;

  const handleInputChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    })
  }

  const duplicateCheck = async e => {
    e.preventDefault();
    if(!checkIdFormat(id)) {
      return alert("학번을 입력해 주세요.");
    }
    try {
      const url = `/students/idcheck`;
      const data = { id }; 
      const response = await axios.post(url, data);
      return response.status === 201 && setIsDuplicate(false)
    } catch(err) {
      return err.response.status === 400 && setIsDuplicate(true)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if(isDuplicate) {
      return alert("id중복 확인을 해주세요.");
    }
    if(!checkIdFormat(id)) {
      return alert("학번을 입력해 주세요.");
    }
    if(!checkPhoneFormat(phone)) {
      return alert("옳바른 형식의 전화번호를 입력해 주세요.");
    }
    if(!chekcBothPwMatch(pw, confirm)) {
      return alert("확인 비밀번호가 일치하지 않습니다.");
    }
    try {
      const url = "/students/signup";
      const data = { name, phone, pw, id };
      const response = await axios.post(url, data);
      if(response.status === 201) {
        alert("회원가입이 완료되었습니다.");
        return navigate("/login", {replace : true});
      }
    } catch (err) {
      console.log("회원가입시 오류" + err);
    }
  }
 
  let msg;
  if(isDuplicate) {
    msg = "이미 존재하는 아이디 입니다.";
  } else if(isDuplicate === null) {
    msg = "중복을 확인해 주세요.";
  } else {
    msg = "사용 가능한 아이디 입니다.";
  }
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label id="name_feild"></label>
            <input type="text" name="name" id="name_feild" value={name} onChange={handleInputChange} placeholder=" Name" required/>
          </li>
          <li>
            <label id="id_feild"></label>
            <input type="text" name="id" id="id_feild" value={id} onChange={handleInputChange} placeholder=" ID" required/>
            <button onClick={duplicateCheck}>중복 체크</button>{msg}
          </li>
          <li>
            <label id="phone_feild"></label>
            <input type="phone" name="phone" id="phone_feild" value={phone} onChange={handleInputChange} placeholder=" Phone" required/>
          </li>
          <li>
            <label id="password_feild"></label>
            <input type="password" name="pw" id="password_feild" value={pw} onChange={handleInputChange} placeholder=" Password" required/>
          </li>
          <li>
            <label id="confirm_feild"></label>
            <input type="password" name="confirm" id="confirm_feild" value={confirm} onChange={handleInputChange} placeholder=" Confirm" required/>
          </li>
        </ul>
        <li>
          <button type="submit">회원가입</button>
        </li>
        <li>이미 계정이 있으신가요? <Link to="/login">로그인</Link></li>
      </form>
    </div>
  );
}

