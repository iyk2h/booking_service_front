import React from "react";
import { Link } from "react-router-dom";
// import "./edit.css";

// 예약 수정 버튼
export default function NoBookingCard() {
  return (
    <>
      <li className="no_booking">
        <p>예약 내역이 없습니다.</p>
        <Link to="/" className="go_home">
          예약하러 가기
        </Link>
      </li>
    </>
  );
}
