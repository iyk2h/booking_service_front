import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Reserve(props) {
  let navigate = useNavigate();

  const handleBooking = () => {
    const url = `/booking/${props.userSelect.fno}`;
    const header = { "Content-type": "application/json" };
    const data = {
      date: props.userSelect.date,
      maxHour : props.time.length,
      selectedTime : props.time[0]
    };
    axios
    .post(url, data, header)
    .then(response => response.status === 201 && navigate("/check", { state: response.data }))
    .catch(error => error.response.status === 401 && navigate("/login", { state: props }));
  };
  return (
    <>
      <button onClick={handleBooking}>예약하기</button>
    </>
  );
}

export { Reserve };
