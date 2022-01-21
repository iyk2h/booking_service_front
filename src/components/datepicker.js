import React from "react";

export default function DatePicker(props) {
  const day_of_week = ["일", "월", "화", "수", "목", "금", "토"];
  const yoil_list = day_of_week.map((yoil) => (
    <li key={yoil} className="yoil">
      {yoil}
    </li>
  ));

  return (
    <ul className="date-picker" onClick={(e) => props.onClick(e)}>
      {yoil_list}
      {props.dates}
    </ul>
  );
}
