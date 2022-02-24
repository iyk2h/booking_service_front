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
    axios
      .get("/students/booking")
      .then(
        (response) =>
          response.status === 200 &&
          setState({ loading: false, list: response.data })
      )
      .catch((err) => console.log("자신의 예약리스트 받아올때 에러"));
  }, []);

  // 확인 안된 코드
  const setList = (data) => {
    setState({
      ...state,
      list: data,
    });
  };

  return (
    <div className="history_list">
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </div>
  );
}
