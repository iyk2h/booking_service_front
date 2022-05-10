import React, { useState } from "react";
import styled from "styled-components";
import { postReserve } from "../../apis/api";
import { isValid, isPastTime } from "../../utils/check";
import Complete from "../modal/complete";

function isValidUserInput(dateState, userPick) {
  if (!isValid(new Date(), dateState, dateState, dateState.viewDate)) return alert("유효한 날짜를 선택해주세요");
  if (isPastTime(userPick[0])) return alert("유효한 시간을 입력해 주세요;");
  console.log(isPastTime(userPick[0]));
  return true;
}

function Reserve({ fno, dateState, userPick }) {
  const [completeMsg, setCompleteMsg] = useState(null);

  async function requestReserve() {
    if (userPick.length === 0) return;
    //if (!isValidUserInput(dateState, userPick)) return;
    try {
      const res = await postReserve(fno, dateState, userPick);
      if (res.status === 201) {
        setCompleteMsg(<Complete data={res.data} fno={fno} />);
      }
    } catch (err) {
      console.log(`${err} : 예약 신청할때 발생한 에러`);
    }
  }

  return (
    <>
    {completeMsg}
    <StReserveBtn
      onClick={requestReserve}
      className={userPick.length === 0 ? "__disable" : ""}
    >예약하기</StReserveBtn>
    </>
  );
}

const StReserveBtn = styled.div`
  opacity: ${(props) => (props.className === "__disable" ? "0.4" : "1")};
  background-color: mediumseagreen;
  border: 1px solid whitesmoke;
  transition: opacity 0.1s;
  margin-top: 2em;
  padding: 0.7em 2em;
  border-radius: 5px;
  font-weight: bold;
  font-size: 12px;
`;

export default Reserve;
