import React from "react";

export default function DateFilter(props) {
  return (
    <div onClick={(e) => props.onClick(e)} className="date-filter">
      <div className={"prev_btn"}>&lt;</div>
      <div> {`${props.viewYear}년 ${props.viewMonth + 1}월`} </div>
      <div className={"next_btn"}>&gt;</div>
    </div>
  );
}
