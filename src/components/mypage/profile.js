import React from "react";
import "./profile.css";

export default function Profile() {
  const phone = "010-1111-2222";

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div className="phone_container">
      <form onSubmit={handleSubmit}>
        <div className="phone">
          <label htor="phone">연락처</label>
          <input type="phone" id="phone" placeholder={phone}/>
        </div>
        <div className="btn_container">
          <button className="confirm_btn">변경하기</button>
        </div>
      </form>
    </div>
  );
}