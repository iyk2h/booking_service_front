import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Loading from "./loading";

export default function Check(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoding] = useState(true);

  useEffect(() => {
    axios
    .get("/check")
    .catch(err => err.response.status === 401 && navigate("/login", { replace: true }));
    setLoding(false);
  });

  const setPlace = (fno) => {
    switch (fno) {
      case 1:
        return "족구장";
      case 2:
        return "풋살장";
      case 3:
        return "테니스장";
      case 4:
        return "대운동장";
      default:
        return;
    }
  }
  
  return (
    <div>
      {loading ? <Loading /> : null}
      <div>( 체크 이미지 V )</div>
      <article>
        <div>예약이 완료되었습니다.</div>
        <div>
          풋살장 2022-01-31 10:00 ~ 11:59
        </div>
        {/* <div>
          {place} {startTime} - {endTime}
        </div> */}
        <div className="go_btn">
          <Link className="home_btn" to="/">Home</Link>
          <Link className="myPage_btn" to="/mypage/history">MyPage</Link>
        </div>
      </article>
    </div>
  );
}
