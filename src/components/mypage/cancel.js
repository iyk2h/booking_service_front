import React from 'react';
import axios from 'axios';
// import "./cancel.css";

// 변경하기 버튼
export default function Cancel(props) {
  const handleCancel = () => {
    axios
    .delete(`/students/booking/${props.bno}`)
    .then(response => {
      if(response.status === 204) {
        alert("예약이 취소되었습니다.");
        const new_list = props.list.filter(item => item.bno !== props.bno)
        console.log(new_list);
        props.setList(new_list);
      }
    })
    .catch(err => console.log("예약 취소할때 난 에러" + err))
  }
  return (
    <>
      <button onClick={handleCancel}>예약 취소</button>
    </>
  );
}