import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  checkIdFormat,
  checkPhoneFormat,
  chekcBothPwMatch,
  checkDuplicate
} from "../../utils/check";
import style from "./signup.module.css";

export default function SignupTemplate({ url, nextUrl }) {
  console.log(url, nextUrl);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    id: "",
    phone: "",
    pw: "",
    confirm: "",
  });

  const { name, id, phone, pw, confirm } = inputs;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkDuplicate(id);
    if (!checkIdFormat(id)) {
      return alert("학번을 입력해 주세요.");
    }
    if (!checkPhoneFormat(phone)) {
      return alert("옳바른 형식의 전화번호를 입력해 주세요.");
    }
    if (!chekcBothPwMatch(pw, confirm)) {
      return alert("확인 비밀번호가 일치하지 않습니다.");
    }
    try {
      const data = { name, phone, pw, sid : id };
      const response = await axios.post(url, data);
      if (response.status === 201) {
        alert("회원가입이 완료되었습니다.");
        return navigate(nextUrl, { replace: true })
      }
    } catch (err) {
      return err.response.stauts === 404 && alert("잘못된 입력입니다.");
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <ul className={style.ul}>
          <li>
            <input
              className={style.input}
              type="text"
              name="name"
              id="name_feild"
              value={name}
              onChange={handleInputChange}
              placeholder=" Name"
              required
            />
          </li>
          <li>
            <input
              className={style.input}
              type="text"
              name="id"
              id="id_feild"
              value={id}
              onChange={handleInputChange}
              placeholder=" ID"
              required
            />
          </li>
          <li>
            <input
              className={style.input}
              type="phone"
              name="phone"
              id="phone_feild"
              value={phone}
              onChange={handleInputChange}
              placeholder=" Phone"
              required
            />
          </li>
          <li>
            <input
              className={style.input}
              type="password"
              name="pw"
              id="password_feild"
              value={pw}
              onChange={handleInputChange}
              placeholder=" Password"
              required
            />
          </li>
          <li>
            <input
              className={style.input}
              type="password"
              name="confirm"
              id="confirm_feild"
              value={confirm}
              onChange={handleInputChange}
              placeholder=" Confirm"
              required
            />
          </li>
          <li>
            <button type="submit" className={style.join}>회원가입</button>
          </li>
          <li>
            <p className={style.login_link}>
              이미 계정이 있으신가요? <Link to={nextUrl}>로그인</Link>
            </p>
          </li>
        </ul>
      </form>
    </div>
  );
}
