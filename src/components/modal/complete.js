import React from "react";
import { Link } from "react-router-dom";
import "./complete.css";

export default function Complete(props) {
  const setPlace = (fno) => {
    switch (Number(fno)) {
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
  };

  const setTime = (selected, max) => {
    const start = Number(selected.split(":")[0]);
    const end = max === 1 ? `${start}:59` : `${start + Number(max) - 1}:59`;
    return `${selected} - ${end}`;
  };

  return (
    <div>
      <div className="modal_container"></div>
      <div className="modal_content">
        <h3 className="check_header">예약 완료!</h3>
        <div className="check_image"><i className="far fa-calendar-check"></i></div>
        <div className="check_body">
          <p><span>시설</span>{setPlace(props.fno)}</p>
          <p><span>일정</span>{props.data.date}</p>
          <p><span>시간</span>{setTime(props.data.selectedTime, props.data.maxHour)}</p>
        </div>
        <div className="btn_section">
          <Link to="/mypage/history">확인</Link>
        </div>
      </div>
    </div>
  );
}
