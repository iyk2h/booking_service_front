import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../loading';
import BookingCard from './bookingCard';
import NoBookingCard from './noBookingCard';
import "./history.css"

export default function History(props) {
  const [loading, setLoading] = useState(true)
  const [list,setList] = useState(null)

  useEffect(() => {
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
            />
          )
        }
      </ul>
    </div>
  );
}