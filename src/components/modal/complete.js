import React from "react";
import { Link } from "react-router-dom";
import { setPlace } from "../../utils/format";
import "./complete.css";

export default function Complete({ data, fno }) {
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
          <p><span>시설</span>{setPlace(Number(fno))}</p>
          <p><span>일정</span>{data.date}</p>
          <p><span>시간</span>{setTime(data.selectedTime, data.maxHour)}</p>
        </div>
        <div className="btn_section">
          <Link to="/mypage/history">예약 내역</Link>
        </div>
      </div>
    </div>
  );
}
