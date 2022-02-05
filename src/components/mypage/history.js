import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../loading';
import auth from "../../auth";
import BookingCard from './bookingCard';
import NoBookingCard from './noBookingCard';

import "./history.css"

export default function History(props) {
  const [loading, setLoading] = useState(true)
  const [list,setList] = useState(null)

  useEffect(() => {
    auth();
    axios
    .get("/students/booking")
    .then(response => {
      if(response.status === 200) {
        setLoading(false);
        setList(response.data);
      }
    })
    .catch(err => console.log("자신의 예약리스트 받아올때 에러"))
  }, []);
  
  const setPlace = fno => {
    switch (fno) {
      case 1:
        return '족구장'
      case 2:
        return '풋살장'
      case 3:
        return '테니스장'
      case 4:
        return '대운동장'
      default:
        return;
    }
  }

  return (
    <div className='history_list'>
      {loading && <Loading />}
      <ul className='history_list'>
        {
          list && list.length === 0
          ? <NoBookingCard />
          : list && list.map(item => 
            <BookingCard 
              key={item.bno} 
              item={item} 
              list={list} 
              setList={setList}
              setPlace={setPlace}
            />
          )
        }
      </ul>
    </div>
  );
}