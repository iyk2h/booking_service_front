import React from "react";
import Cancel from "./cancel";
import Edit from "./edit";
import { setPlace } from "../../utils/check"
import "./bookingCard.css";

export default function BookingCard(props) {
  const setDate = (item) => {
    return item.startTime.split(" ")[0];
  };

  const setTime = (item) => {
    return `${item.startTime.split(" ")[1]} - ${item.endTime.split(" ")[1]}`;
  };

  return (
    <li key={props.item.bno} className="booking_card">
      <div className="booking_card_content">
        <p>
          <span>시설</span>
          {setPlace(props.item.fno)}
        </p>
        <p>
          <span>일정</span>
          {setDate(props.item)}
        </p>
        <p>
          <span>시간</span>
          {setTime(props.item)}
        </p>
      </div>
      <div className="booking_card_btn_section">
        <Cancel
          list={props.list}
          setList={props.setList}
          bno={props.item.bno}
        />
        <Edit 
          list={props.list} 
          setList={props.setList} 
          bno={props.item.bno} 
        />
      </div>
    </li>
  );
}