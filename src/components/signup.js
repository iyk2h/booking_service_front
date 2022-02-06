import React, { useState } from "react";
import { Link  } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [inputs, setInputs] = useState({
    name : '',
    id : '',
    phone : '',
    pw : '',
    confirm : '',    
    isDuplicate : true
  })
  
  const {name, id, phone, pw, confirm, isDuplicate} = inputs;

  const duplicateCheck = e => {
    e.preventDefault();
    const url = `/students/check`;
    const data = { "id" : id, "pw": pw };
    axios.post(url, data)
    .then(response => response.status === 200 && setInputs({...inputs, isDulicate : false}))
    .catch(err => err.response.status === 400 && console.log(err))  
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(isDuplicate) {
      alert("id중복 확인을 해주세요.");
      return;
    }
    const chkId = /^[0-9]{6}$/;
    if (!chkId.test(id)) {
      alert("옳바른 형식의 아이디를 입력해 주세요.");
      return;
    }
    if(pw === '') {
      alert("옳바른 형식의 비밀번호를 입력해 주세요.");
      return;
    }
    const chkPhone = /\d{3}-\d{4}-\d{4}/;
    if(!chkPhone.test(phone)) {
      alert("옳바른 형식의 전화번호를 입력해 주세요.");
      return;
    }
  }

  const handleInputChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    })
  }

  return(
    <div>
      <form onSubmit={handleSubmit} onChange={handleInputChange}>
        <ul>
          <li>
            <label id="name_feild"></label>
            <input type="text" name="name" id="name_feild" value={name} placeholder="   Name" required/>
          </li>
          <li>
            <label id="id_feild"></label>
            <input type="text" name="id" id="id_feild" value={id} placeholder="   ID" required/>
            <button onClick={duplicateCheck}>중복 체크</button>
            {isDuplicate ? "중복체크를 해주세요." : "사용 가능한 아이디 입니다."}
          </li>
          <li>
            <label id="phone_feild"></label>
            <input type="phone" name="phone" id="phone_feild" value={phone} placeholder="   Phone" required/>
          </li>
          <li>
            <label id="password_feild"></label>
            <input type="password" name="password" id="password_feild" value={pw} placeholder="   Password" required/>
          </li>
          <li>
            <label id="confirm_feild"></label>
            <input type="password" name="confrim" id="confirm_feild" value={confirm} placeholder="   Confirm" required/>
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

