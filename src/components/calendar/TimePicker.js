import { fullDateFormatter, timeFormatter, range } from "../../utils/format";
import { useDateState, useDateDispatch } from "../../context/dateContext";
import { getReservedTime } from "../../apis/api";
import { useParams } from "react-router-dom";
import { isValid } from "../../utils/check";
import styled from "styled-components";
import React, { useEffect } from "react";

const operatingTime = {
  openingTime: 8,
  closingTime: 19,
};

function TimePicker() {
  const fno = useParams().fno;
  const dateState = useDateState();
  const dateDispatch = useDateDispatch();
  const { viewDate, reservedTime } = dateState;
  const { openingTime, closingTime } = operatingTime;

  useEffect(() => {
    getReservedTimeByDate(fno, dateState, dateDispatch);
  }, [viewDate, fno]);

  const BtnList = setTimeType(
    range(openingTime, closingTime),
    reservedTime,
    dateState
  );
  return <StTimeContainer>{BtnList}</StTimeContainer>;
}

// ----- Functions -----
async function getReservedTimeByDate(fno, dateState, dispatch) {
  if (!dateState.viewDate) return;
  try {
    const res = await getReservedTime(fno, fullDateFormatter(dateState));
    dispatch({ type: "SET_TIME", payload: res.data });
  } catch (err) {
    console.log(`${err}\n- 클릭한 날짜의 이미 예약된 시간 받아올때 에러 -`);
  }
}

function setTimeType(arr, reservedList, state) {
  const isPast = !isValid(new Date(), state, state.viewDate);
  return arr.map((hour, idx) => {
    let isDisable = null;
    if (isPast) {
      if (isPastTime(hour)) isDisable = "__disable";
      if (isReservedTime(reservedList, hour)) isDisable = "__disable";
    }
    return (
      <StTimeBtn className={isDisable} key={idx}>
        {timeFormatter(hour)}
      </StTimeBtn>
    );
  });
}

function isPastTime(hour) {
  const [currHour] = new Date().toTimeString().split(":");
  return Number(hour) < Number(currHour);
}

function isReservedTime(reservedList, viewHour) {
  const formattedTime = timeFormatter(viewHour);
  return reservedList && reservedList.indexOf(formattedTime) !== -1;
}

// ----- Style -----
const StTimeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: 20px 10px;
`;

const StTimeBtn = styled.div`
  width: calc(100% / 5);
  text-align: center;
  border-radius: 5px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0.3em 0;
  margin: 0.5em;

  opacity: ${(props) => (props.className === "__disable" ? "0.2" : "1")};

  &:hover {
    cursor: ${(props) =>
      props.className === "__disable" ? "not-allowed" : "pointer"};
    cursor: pointer;
  }
`;

export default React.memo(TimePicker);
