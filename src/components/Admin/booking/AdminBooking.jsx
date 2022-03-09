import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBooking() {
  const [bookingList, setBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getBookingList() {
      try {
        const response = await axios.get("/manage/booking");
        console.log(response.data);
        setBookingList(response.data);
      } catch (error) {
        return alert(
          "예약 목록을 불러오는중 알수없는오류가 발생했습니다. 새로고침 해주세요."
        );
      }
    }
    getBookingList();
  }, []);

  console.log({ bookingList });
  return (
    <div>
      <ul>
        {bookingList.map((item) => {
          return (
            <li key={item.bno}>
              예약 번호 : {item.bno}
              시설 번호 : {item.fno}
              학번 : {item.sid}
              시작 시간 : {item.startTime}
              종료 시간 : {item.endTime}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
