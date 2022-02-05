import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  // const startTime = location.state.startTime.split(" ")[1];
  // const endTime = location.state.endTime.split(" ")[1];
  // let place;
  // switch (place) {
  //   case 1:
  //     place = "족구장";
  //     break;
  //   case 2:
  //     place = "풋살장";
  //     break;
  //   case 3:
  //     place = "테니스장";
  //     break;
  //   case 4:
  //     place = "대운동장";
  //     break;
  //   default:
  //     console.log("default");
  // }

  const handleLink = (e) => {
    const target = e.target.className;
    if(target === "home_btn") {
      navigate("/");
    } else if(target === "myPage_btn") {
      navigate("/mypage");
    }
  };
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
        <div className="go_btn" onClick={handleLink}>
          <button className="home_btn">홈으로</button>
          <button className="myPage_btn">마이페이지</button>
        </div>
      </article>
    </div>
  );
}
