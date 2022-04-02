import React from "react";
import styled from "styled-components";

function AdminBookingItem({ booking, deleteBooking }) {
  return (
    <LI key={booking.bno}>
      <Item>{booking.fno}</Item>
      <Item>{booking.sid}</Item>
      <Item>{booking.startTime}</Item>
      <Item>{booking.endTime}</Item>
      <button onClick={() => deleteBooking(booking.bno)}>삭제</button>
    </LI>
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

export default React.memo(AdminBookingItem);
