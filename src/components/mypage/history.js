import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../loading';
import auth from "../../auth";
import Cancel from './cancel';
import Edit from "./edit";
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

  const handleEdit = (target_bno) => {

  }
  
  return (
    <div className='history_list'>
      {loading && <Loading />}
      <ul className='history_list'>
        {
          list && list.length === 0
          ? <li className='no_booking'>
              <p>예약 내역이 없습니다.</p>
              <Link to="/" className="go_home">예약하러 가기</Link>
            </li>
          : list && list.map(item => {
            return (
              <li key={item.bno} className='booking_card'>
                <div>{item.bno}</div>
                <div>
                  <div className='place_name'>{setPlace(item.fno)}</div>
                  <div>{item.startTime.split(" ")[0]}</div>
                  <div>{item.startTime.split(" ")[1]} ~ {item.endTime.split(" ")[1]}</div>
                </div>
                <div>
                  <Cancel list={list} setList={setList} bno={item.bno}/>
                  <Edit list={list} setList={setList} bno={item.bno}/>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}