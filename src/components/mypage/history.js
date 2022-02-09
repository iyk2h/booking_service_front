import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../modal/loading';
import BookingCard from './bookingCard';
import NoBookingCard from './noBookingCard';
import "./history.css"

export default function History(props) {
  const [state, setState] = useState({
    loading : true,
    list : []
  })

  const {loading, list} = state;

  useEffect(() => {
    axios
    .get("/students/booking")
    .then(response => response.status === 200 && setState({loading : false, list : response.data}))
    .catch(err => console.log("자신의 예약리스트 받아올때 에러"))
  }, []);
  
  // 확인 안된 코드
  const setList = (data) => {
    setState({
      ...state,
      list : data
    })
  }

  return (
    <div className='history_list'>
      {loading && <Loading />}
      <ul className='history_list'>
        {
          list.length === 0
          ? <NoBookingCard />
          : list.map(item => 
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

// BookingCard 컴포넌트에서는 list props만 사용하지만,
// Cancel 컴포넌트에서 사용할 props들 까지 전달해주고 있음. 
          

// 첫 로드시 서버로부터 유저의 예약 목록을 받아옴.
// 받아오기 전까지 "로딩중 문구 표시"
// 통신에 성공했다면 로딩 상태와 예약 목록 상태를 변경해 화면 업데이트.
