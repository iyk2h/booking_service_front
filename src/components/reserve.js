import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Complete from "./modal/complete";

export default function Reserve(props) {
  let navigate = useNavigate();

  const [modal, setModal] = useState(null);

  const handleBooking = () => {
    const url = `/booking/${props.userSelect.fno}`;
    const data = {
      date: props.userSelect.date,
      maxHour : props.time.length,
      selectedTime : props.time[0]
    };

    //TEST
    axios
    .post(url, data)
    .then(response => {
      if(response.status === 201) {
        setModal(<Complete data={response.data} fno={props.userSelect.fno}/>)
      }
    })
    .catch(error => error.response.status === 401 && navigate("/login", { state: props }));
  };
  return (
    <>
      <button onClick={handleBooking} className="reserve_btn">예약하기</button>
      {modal}
    </>
  );
}