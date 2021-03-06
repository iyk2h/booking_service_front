import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Complete from "../modal/complete";

export default function Reserve(props) {
  let navigate = useNavigate();

  const [modal, setModal] = useState(null);

  const handleBooking = async () => {
    try {
      const url = `/booking/${props.userSelect.fno}`;
      console.log({url})
      const data = {
        date: props.userSelect.date,
        maxHour : props.time.length,
        selectedTime : props.time[0]
      };
      console.log(data);
      const response = await axios.post(url ,data);
      if(response.status === 201) {
        setModal(
          <Complete
            data={response.data} 
            fno={props.userSelect.fno}
          />
        )
      }
    } catch (err) {
      if(err.response.status === 401) {
        return navigate("/login", { state: props });
      }
      if(err.response.status === 404) {
        return alert("입력 오류");
      }
    }
  };
  return (
    <>
      <button onClick={handleBooking} className="reserve_btn">예약하기</button>
      {modal}
    </>
  );
}