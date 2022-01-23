import React from "react";
import { useNavigate } from "react-router-dom";

export default function Check(props) {
  const navigate = useNavigate();

  const handleLink = (e) => {   
    if(e.target.className === "home_btn") {
        navigate("/");
    } else if(e.target.className === "myPage_btn") {
        navigate("/myPage");
    }
  }

  return (
    <div>
      <div>( 체크 이미지 V )</div>
      <article>
        <div>예약이 완료되었습니다.</div>
        <div>(2022-01-31 10:00 ~ 12:00)</div>
        <div className="go_btn" onClick={handleLink}>
          <button className="home_btn">홈으로</button>
          <button className="myPage_btn">마이페이지</button>
        </div>
      </article> 
    </div>  
  );
}