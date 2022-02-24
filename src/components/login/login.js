import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { checkIdFormat } from "../../utils/check";
import Find from "../mypage/find";
import axios from "axios";
import "./login.css";

export default function Login({ url, nextUrl }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);

  const idRef = useRef(null);
  const pwRef = useRef(null);

  useEffect(() => {
    idRef.current.focus();
    return () => {
      setDisabled(false);
    }; // 나중에 고치기
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    temporarilyDisableSubmit();
    if (!checkIdFormat(idRef.current.value)) {
      alert("옳바른 형식의 아이디를 입력해 주세요.");
      idRef.current.focus();
      return;
    }
    requestLogin();
  };

  const temporarilyDisableSubmit = async () => {
    setDisabled((prev) => (prev = true));
    await new Promise((t) => setTimeout(t, 1000));
    setDisabled(false);
  };

  const requestLogin = async () => {
    try {
      const data = {
        id: idRef.current.value,
        pw: pwRef.current.value,
      };
      const response = await axios.post(url, data);
      if (response) {
        handleSuccess(response.status);
      }
    } catch (err) {
      handleError(err.response.status);
    }
  };

  const handleSuccess = (status) => {
    if (status === 201) {
      if (location.state) {
        return navigate(`/booking/${location.state.userSelect.fno}`, {
          state: location.state,
          replace: true,
        });
      }
      return navigate(nextUrl, { replace: true });
    }
  };

  const handleError = (status) => {
    switch (status) {
      case 401:
        alert("id를 확인해 주세요.");
        idRef.current.focus();
        break;
      case 404:
        alert("비밀번호를 확인해 주세요.");
        pwRef.current.focus();
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input
            className="userId"
            name="id"
            type="text"
            placeholder=" 학번"
            ref={idRef}
            required
          />

          <input
            className="userPw"
            name="pw"
            type="password"
            placeholder=" 비밀번호"
            ref={pwRef}
            required
          />
          <button type="submit" className="login-btn" disabled={disabled}>
            Login
          </button>
        </form>
        <p className="finding-pw">
          <Find />
        </p>
        <p className="finding-pw">
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
}

Login.defaultProps = {
  url: "/login",
  nextUrl: "/",
};
