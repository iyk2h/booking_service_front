import React from "react";
import axios from "axios";
import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pw: "",
      disabled: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value,
    });
  }
 
  requestLogin() {  
    const url = "REQUEST URL";
    const headers = { "Content-Type" : "application/json" };
    const data = {
      id : this.state.id,
      pw : this.state.pw
    }
    axios.post(url, data, { headers })
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }

  async handleSubmit(e) {
    console.log('clicked');
    e.preventDefault();
    // 제출 직후 일시적으로 버튼 비활성화
    this.setState((state) => {
      return { disabled : !state.disable }
    });
    await new Promise(r => setTimeout(r, 250));

    const chkId = /^[0-9]{6}$/;
    //const chkPw = ;
    if(!chkId.test(this.state.id)){
      alert("옳바른 아이디를 입력해 주세요.");  
    } 
    //this.requestLogin();
    
    this.setState({disabled : false});
  }

  render() {
    return (
      <div>
        <div className="login-container">
          <img alt="MNU LOGO"/>
          <form onSubmit={this.handleSubmit}>
            <input
              className="userId"
              name="id"
              type="text"
              value={this.state.id}
              onChange={this.handleInputChange}
              placeholder=" 학번"
            />

            <input
              className="userPw"
              name="pw"
              type="password"
              value={this.state.pw}
              onChange={this.handleInputChange}
              placeholder=" 비밀번호"
            />
            <button type="submit" className="login-btn" disabled={this.state.disabled}>로그인</button>
          </form>
          <p className="finding-pw">비밀번호를 잊으셨나요? <a href="#">비밀번호 찾기</a></p>
        </div>
      </div>
    );
  }
}

export { Login };
