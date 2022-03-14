import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../modal/loading";
import styled from "styled-components";

const menu = ["예약 번호", "시설 번호", "학번", "시작 시간", "종료 시간"];

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

  return (
    <>{isLoading ? <Loading /> : <ListTemplate bookingList={bookingList} />}</>
  );
}

function ListTemplate({ bookingList }) {
  return (
    <ul>
      <LI>
        {menu.map((item, idx) => (
          <Item key={idx} content={menu[idx]} />
        ))}
      </LI>
      {bookingList.map((item) => {
        return (
          <LI key={item.bno}>
            <Item content={item.bno} />
            <Item content={item.fno} />
            <Item content={item.sid} />
            <Item content={item.startTime} />
            <Item content={item.endTime} />
          </LI>
        );
      })}
    </ul>
  );
}

function Item(props) {
  return <Wrap>{props.content}</Wrap>;
}

const LI = styled.li`
  max-width: 500px;
  display: flex;
  justify-content: space-around;
`;

const Wrap = styled.div`
  margin: 0 10px;
`;
