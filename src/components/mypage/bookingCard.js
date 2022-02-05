import React from "react";
import Cancel from './cancel';
import Edit from "./edit";
import "./bookingCard.css";

// 예약 수정 버튼
export default function BookingCard(props) {
  const setPlace = fno => {
    switch (fno) {
      case 1:
        return '족구장'
      case 2:
        return '풋살장'
      case 3:
        return '테니스장'
      case 4:
        return '대운동장'
      default:
        return;
    }
  }

  return (
    <li key={props.item.bno} className="booking_card">
      <div className="booking_card_content">
        <p><span>시설</span>{setPlace(props.item.fno)}</p>
        <p><span>일정</span>{props.item.startTime.split(" ")[0]}</p>
        <p><span>시간</span>{props.item.startTime.split(" ")[1]} - {props.item.endTime.split(" ")[1]}</p>
      </div>
      <div className="booking_card_btn_section">
        <Cancel list={props.list} setList={props.setList} bno={props.item.bno} />
        <Edit list={props.list} setList={props.setList} bno={props.item.bno} />
      </div>
    </li>
  );
}