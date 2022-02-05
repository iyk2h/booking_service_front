import React from "react";
import Cancel from './cancel';
import Edit from "./edit";
// import "./edit.css";

// 예약 수정 버튼
export default function BookingCard(props) {
  return (
    <li key={props.item.bno} className="booking_card">
      <div>{props.item.bno}</div>
      <div>
        <div className="place_name">{props.setPlace(props.item.fno)}</div>
        <div>{props.item.startTime.split(" ")[0]}</div>
        <div>
          {props.item.startTime.split(" ")[1]} ~ {props.item.endTime.split(" ")[1]}
        </div>
      </div>
      <div>
        <Cancel list={props.list} setList={props.setList} bno={props.item.bno} />
        <Edit list={props.list} setList={props.setList} bno={props.item.bno} />
      </div>
    </li>
  );
}
