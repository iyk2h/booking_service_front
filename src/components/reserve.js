import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Reserve(props) {
  let navigate = useNavigate();

  const handleBooking = () => {
    const url = `${props.userSelect.fno}`;
    const data = {
      "date" : props.userSelect.date,
      "maxHour" : props.time.length,
      "selectedTime" : props.time[0]
    };
    const header = {"Content-type" : "application/json"};

    axios.post(url, data, header)
    .then(response => {
      const code = response.status;
      if(code === 201) { // 예약 성공
        navigate("/check", { replace : true, state : response.data });
      }
    })
    .catch(error => {
      if(error.response.status === 401) {
        navigate("/login", { state : props });
        return;
      }
    })
  }
  return (
    <>
      <button onClick={handleBooking}>예약하기</button>
    </>  
  );
}

export { Reserve }