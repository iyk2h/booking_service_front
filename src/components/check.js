import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Check(props) {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인상태가 아니라면 로그인으로 redirect 시켜야 함.
  if(location.state && !location.state.loggedIn) {
    navigate("/login", { replace : true });
    return;
  }

  const startTime = location.state.startTime.split(" ")[1];
  const endTime = location.state.endTime.split(" ")[1];
  let place;
  switch (place) {
    case 1:
      place = "족구장";
      break;
    case 2:
      place = "풋살장";
      break;
    case 3:
      place = "테니스장";
      break;
    case 4:
      place = "대운동장";
      break;
    default:
      console.log("default");
  }

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
        <div>{place} {startTime} - {endTime}</div>
        <div className="go_btn" onClick={handleLink}>
          <button className="home_btn">홈으로</button>
          <button className="myPage_btn">마이페이지</button>
        </div>
      </article> 
    </div>  
  );
}