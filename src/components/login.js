import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [disabled, setDisabled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "id") {
      setId(value);
    } else if (name === "pw") {
      setPw(value);
    }
  }

  function requestLogin() {
    const url = "students/login";
    const headers = { "Content-Type": "application/json" };
    const data = {
      sid: id,
      pw: pw,
    };

    axios.post(url, data, headers)
    .then((response) => {
      const code = response.status;
      if (code === 200) {
        navigate(`/booking/${location.state.userSelect.fno}`, {
          state: location.state,
          replace: true,
        });
      } 
    })
    .catch(err => {
      const code = err.response.status;
      if(code === 401) {
        alert("id를 확인해 주세요.");
        setId("");
      } else if (code === 404) {
        alert("비밀번호를 확인해 주세요.");
        setPw("");
      }
    });
  }

  async function handleSubmit(e) {
    console.log("clicked");
    e.preventDefault();
    // 제출 직후 일시적으로 버튼 비활성화
    setDisabled(true);
    await new Promise((r) => setTimeout(r, 500));

    const chkId = /^[0-9]{6}$/;
    if (!chkId.test(id)) {
      alert("옳바른 형식의 아이디를 입력해 주세요.");
      setId("");
      return;
    }
    requestLogin();
    // 버튼 다시 활성화
    setDisabled(false);
  }

  return (
    <div>
      <div className="login-container">
        <img alt="MNU LOGO" />
        <form onSubmit={handleSubmit}>
          <input
            className="userId"
            name="id"
            type="text"
            value={id}
            onChange={handleInputChange}
            placeholder=" 학번"
          />

          <input
            className="userPw"
            name="pw"
            type="password"
            value={pw}
            onChange={handleInputChange}
            placeholder=" 비밀번호"
          />
          <button type="submit" className="login-btn" disabled={disabled}>
            로그인
          </button>
        </form>
        <p className="finding-pw">
          비밀번호를 잊으셨나요? <Link to="">비밀번호 찾기</Link>
        </p>
        <p className="finding-pw">
          계정이 없으신가요? <Link to="">회원가입</Link>
        </p>
      </div>
    </div>
  );
}

export { Login };
