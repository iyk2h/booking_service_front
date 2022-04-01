import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../modal/loading";
import styled from "styled-components";

const menu = [
  { row : "예약 번호" },
  { row : "시설 번호" },
  { row : "학번" },
  { row : "시작 시간"},
  { row : "종료 시간" }
];

export default function AdminBooking() {
  const [bookingList, setBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBookingList() {
      try {
        const response = await axios.get("/manage/booking");
        setIsLoading(false);
        setBookingList(response.data);
      } catch (error) {
        setIsLoading(false);
        return alert(
          "예약 목록을 불러오는중 알수없는오류가 발생했습니다. 새로고침 해주세요."
        );
      }
    }
    getBookingList();
  }, []);

  async function deleteBooking(list_id) {
    try {
      const response = await axios.delete(`/manage/booking/${list_id}`);
      if (response.status === 204) {
        alert("삭제되었습니다.");
        setBookingList(prev => prev.filter(booking => booking.bno !== Number(list_id)))
      }
    } catch (error) {
      return alert(
        "알수없는 오류가 발생했습니다. 새로고침후 다시 시도해주세요."
      );
    }
  }

  return (
    <>{isLoading ? <Loading /> : <ListTemplate bookingList={bookingList} deleteBooking={deleteBooking} />}</>
  );
}

function ListTemplate({ bookingList, deleteBooking }) {
  return (
    <ul>
      <LI>
        {menu.map((item) => (
          <Item key={item.row}>{item.row}</Item>
        ))}
      </LI>
      {bookingList.map((item) => {
        return (
          <LI key={item.bno} id={item.bno}>
            <Item>{item.fno}</Item>
            <Item>{item.sid}</Item>
            <Item>{item.startTime}</Item>
            <Item>{item.endTime}</Item>
            <button onClick={e => deleteBooking(e.target.parentNode.id)}>삭제</button>
          </LI>
        );
      })}
    </ul>
  );
}

const LI = styled.li`
  max-width: 500px;
  display: flex;
  justify-content: space-around;
`;

const Item = styled.div`
  margin: 0 10px;
`;
