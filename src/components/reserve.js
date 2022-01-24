import React from 'react';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

function Reserve(props) {
  let navigate = useNavigate();
  let location = useLocation();

  const handleBooking = () => {
    const url = `booking/${props.userSelect.fno}`;
    const data = {
      "date" : props.userSelect.date,
      "maxHour" : props.time.length,
      "selectedTime" : props.time[0]
    };
    const header = {"Content-type" : "application/json"};
    axios.post(url, data, header)
    .then(response => {
      const code = response.headers.status;
      if(code === 201) { // 예약 성공
        navigate("/check", { replace : true, state : response.json() });
      } else if(code === 401) {
        navigate("/login", { state : props });
        return;
      }
    })
    .catch(err => console.log(err))
  }
  
  // const checkValidation = () => {
    
  // }
  return (
    <>
      <button onClick={handleBooking}>예약하기</button>
    </>  
  );
}

export { Reserve }