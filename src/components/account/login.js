import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

// Component
function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const [input, setInput] = useState({
    id : '',
    pw : ''
  })
  const {id, pw} = input;

  const idInput = useRef(null);

  useEffect(() => { 
    idInput.current.focus();
  }, [])

  // Handler
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setInput({
      ...input,
      [name] : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(prev => prev = true);
    await new Promise(t => setTimeout(t, 0));

    const chkId = /^[0-9]{6}$/;
    if (!chkId.test(id)) {
      alert("옳바른 형식의 아이디를 입력해 주세요.");
      idInput.current.focus();
      setDisabled(false);
      return
    }
    requestLogin();
    setDisabled(false);
  }

  // Request
  const requestLogin = () => {
    const url = `/students/login`;
    const headers = { "Content-Type": "application/json" };
    const data = {
      "id": id,
      "pw": pw,
    };

    axios.post(url, data, headers)
    .then(response => {
      if (response.status === 201) {
        if(!location.state) {
          navigate("/", { replace : true });
          return;
        }
        navigate(`/booking/${location.state.userSelect.fno}`, {
          state: location.state,
          replace: true,
        });
      } 
    })
    .catch(err => {
      switch (err.response.status) {
        case 401:
          alert("id를 확인해 주세요.");
          break;
        case 404:
          alert("비밀번호를 확인해 주세요.");
          setInput({
            ...input,
            pw : ""
          })
          break;
        default:
          return;
      }
    });
  }
  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input
            className="userId"
            name="id"
            type="text"
            value={id}
            onChange={handleInputChange}
            placeholder=" 학번"
            ref={idInput}
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
            Login
          </button>
        </form>
        <p className="finding-pw">
          비밀번호를 잊으셨나요? <Link to="">비밀번호 찾기</Link>
        </p>
        <p className="finding-pw">
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
}

export { Login };
