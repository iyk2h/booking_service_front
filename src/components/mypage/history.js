import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../modal/loading";
import BookingCard from "./bookingCard";
import NoBookingCard from "./noBookingCard";
import "./history.css";

export default function History(props) {
  const [state, setState] = useState({
    loading: true,
    list: [],
  });

  const { loading, list } = state;

  useEffect(() => {
    async function getHistory() {
      try {
        const res = await axios.get("/students/booking");
        setState({ loading: false, list: res.data });
      } catch (err) {
        console.log(`${err} - 자신의 예약리스트 받아올때 에러`);
      }
    }
    getHistory();
  }, []);

  // 확인 안된 코드
  const setList = (data) => {
    setState({
      ...state,
      list: data,
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="history_list">
      {
        <ul className="history_list">
          {list.length === 0 ? (
            <NoBookingCard />
          ) : (
            list.map((item) => (
              <BookingCard
                key={item.bno}
                item={item}
                list={list}
                setList={setList}
              />
            ))
          )}
        </ul>
      }
    </div>
  );
}
