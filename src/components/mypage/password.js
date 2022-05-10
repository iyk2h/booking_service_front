import React, { useState, useEffect } from "react";
import axios from "axios";
import Confirm from "./confirm";
import Find from "./find";
import useLoginStatus from "../hook/auth";
import { useNavigate } from "react-router-dom";
import { chekcBothPwMatch } from "../../utils/check";
import "./password.css";

export default function Password() {
  // const navigate = useNavigate();
  // const isLogin = useLoginStatus();

  // useEffect(() => {
  //   if (isLogin === false) {
  //     navigate("/login", { replace: true });
  //   }
  // }, []);

  const [inputs, setInputs] = useState({
    old: "",
    _new: "",
    confirm: "",
  });

  const { old, _new, confirm } = inputs;

  const onReset = () => {
    setInputs({
      old: "",
      _new: "",
      confirm: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPwValidation() && changePw();
  };

  const checkPwValidation = () => {
    if (!chekcBothPwMatch(_new, confirm)) {
      return alert("새비밀번호와 확인비밀번호가 일치하지 않습니다.");
    }
    if (old === _new) {
      return alert("기존과 다른 비밀번호를 입력해 주세요.");
    }
    return true;
  };

  const changePw = async () => {
    try {
      const data = { newPw: _new, oldPw: old };
      const res = axios.put("/students/password", data);
      if (res.status === 201) {
        alert("변경되었습니다.");
        onReset();
      }
    } catch (err) {
      return err.res.status === 404 && alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="pass-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="old">이전 비밀번호</label>
          <input
            type="password"
            id="old"
            name="old"
            placeholder="Old Password"
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
            placeholder="New Password"
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
            placeholder="Confirm"
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
