import React from "react";
import Cancel from './cancel';
import Edit from "./edit";
import "./bookingCard.css";

// 예약 수정 버튼
export default function BookingCard(props) {
  const setPlace = item => {
    switch (item.fno) {
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

  const setDate = item => {
    return item.startTime.split(" ")[0]
  }

  const setTime = item => {
    return `${item.startTime.split(" ")[1]} - ${item.endTime.split(" ")[1]}`;
  }

  return (
    <li key={props.item.bno} className="booking_card">
      <div className="booking_card_content">
        <p><span>시설</span>{setPlace(props.item)}</p>
        <p><span>일정</span>{setDate(props.item)}</p>
        <p><span>시간</span>{setTime(props.item)}</p>
      </div>
      <div className="booking_card_btn_section">
        <Cancel list={props.list} setList={props.setList} bno={props.item.bno} />
        <Edit list={props.list} setList={props.setList} bno={props.item.bno} />
      </div>
    </li>
  );
}
// BookingCard 컴포넌트에서는 setList를 사용하지 않고
// 자식컴포넌트에 보내기만함.

// 1. Context를 사용해 전역적으로 props를 사용하는 방법.
// 2. BookingCard컴포넌트에tj cancel, edit을 합성하는 방법