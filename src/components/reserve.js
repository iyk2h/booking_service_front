import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Reserve(props) {
  let navigate = useNavigate();

  const handleBooking = () => {
    const url = `/booking/${props.userSelect.fno}`;
    const data = {
      "date" : props.userSelect.date,
      "maxHour" : props.time.length,
      "selectedTime" : props.time[0]
    };
    const header = {"Content-type" : "application/json"};
    axios.post(url, data, header)
    .then(response => {
      const status = response.headers.status;
      handleStatus(status)
    })
    .catch(err => console.log("* 예약 신청 에러 " + err))
  }

  const handleStatus = (status) => {
    switch(status) {
      case 201: // POST, PUT -> 201
        navigate("/");
        break;
      case 401: // No Session
        navigate("/login");
        break;
      case 404: // Not Found
        navigate("/ad;fkja")
        break;
      default:
        console.log(status);
    }
  }
  
  return (
    <>
      <button onClick={handleBooking}>예약하기</button>
    </>  
  );
}

export { Reserve }