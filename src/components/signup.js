import React, { useState } from "react";
import { Link  } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils";

export default function Signup() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [phone, setPhone] = useState("");
  const [duplicate, setDuplicate] = useState(true);
  
  const duplicateCheck = e => {
    e.preventDefault();
    const url = `${BASE_URL}/students/check`;
    const data = { "id" : id, "pw": pw };
    const headers = { "Content-Type" : "application/json" };
    axios.post(url, data, headers)
    .then(response => response.status === 200 && setDuplicate(false))
    .catch(err => err.response.status === 400 && console.log(err))  
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(duplicate) {
      alert("id중복 확인을 해주세요.");
      return;
    }
    const chkId = /^[0-9]{6}$/;
    if (!chkId.test(id)) {
      alert("옳바른 형식의 아이디를 입력해 주세요.");
      setId("");
      return;
    }
    if(pw === '') {
      alert("옳바른 형식의 비밀번호를 입력해 주세요.");
      setPw("");
      return;
    }
    const chkPhone = /\d{3}-\d{4}-\d{4}/;
    if(!chkPhone.test(phone)) {
      alert("옳바른 형식의 전화번호를 입력해 주세요.");
      setPhone("010");
      return;
    }
  }

  const handleInputChange = e => {
    const target = e.target.name;
    const value = e.target.value;
    switch (target) {
      case "id":
        setId(value);
        break;
      case "pw":
        setPw(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        return
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmit} onChange={handleInputChange}>
        <input
          type="text"
          name="id"
          placeholder="id"
        />
        {duplicate ? "중복체크를 해주세요." : "사용 가능한 아이디 입니다."}
        <button onClick={duplicateCheck}>중복 체크</button>
        <input
          type="password"
          name="pw"
          placeholder="password"
        />
        <input
          type="phone"
          name="phone"
          placeholder="phone"
        />
        <button>Sign up</button>
        <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
      </form>
    </div>
  );
}

