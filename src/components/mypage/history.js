import axios from 'axios';
import React, { useEffect, useState } from 'react';
import auth from "../../auth";
import "./history.css"

export default function History(props) {
  const [list,setList] = useState(null)

  useEffect(() => {
    auth();

    axios
    .get("/booking/students")
    .then(response => response.status === 200 && setList(response.data))
    .catch(err => console.log("자신의 예약리스트 받아올때 에러"))
  },[]);
  
  const setPlace = fno => {
    let place = null;
    switch (fno) {
      case 1:
        place = '족구장'
        break;      
      case 2:
        place = '풋살장'
        break;      
      case 3:
        place = '테니스장'
        break;      
      case 4:
        place = '대운동장'
        break;      
      default:
        return place;
    }
  }

  const editBooking = () => {
    
  }

  const cancelBooking = (fno) => {
    axios
    .delete(`/booking/${fno}`)
    .then(response => response.status === 204 && alert("예약이 취소되었습니다."))
    .catch(err => console.log("예약 취소할때 난 에러" + err))
  }

  return (
    <div>
      <ul>
        {
          !list 
          ? <li className='no_booking'>예약 내역이 없습니다.</li>
          : list.map(item => {
            return (
              <li>
                <p>{setPlace(item.fno)}</p>
                <button onClick={editBooking}>예약 변경</button>
                <button onClick={cancelBooking}>예약 취소</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}