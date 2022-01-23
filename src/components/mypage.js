import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Mypage() {
  const [myBooking, setMyBooking] = useState([]);
  useEffect(() => {
    const url = "booking/students";
    const header = { "Content-Type" : "application/json" };
    axios.get(url, header)
    .then(response => response.json())
    .then(json => setMyBooking(json))
    .catch(err => console.log("예약일정 get 에러" + err))
  },[]) 

  const handleCancle = () => {
    const url = 
    axios
  } 
  return (
    <div>
      <button>예약 변경</button>
      <button onClick={handleCancle}>예약 취소</button>
    </div>
  );
}
//   예약 취소,
//   예약 변경