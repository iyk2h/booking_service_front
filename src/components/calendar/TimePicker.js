import { fullDateFormatter, timeFormatter, range } from "../../utils/format";
import { useDateState, useDateDispatch } from "../../context/dateContext";
import { getReservedTime } from "../../apis/api";
import { useParams } from "react-router-dom";
import { isValid } from "../../utils/check";
import styled from "styled-components";
import React, { useEffect } from "react";

const openingTime = 8;
const closingTime = 19;
const operatingTime = range(openingTime, closingTime);

function TimePicker() {
  const fno = useParams().fno;
  const dateState = useDateState();
  const dateDispatch = useDateDispatch();
  const { viewDate, reservedTime } = dateState;

  useEffect(() => {
    getReservedTimeByDate(fno, dateState, dateDispatch);
  }, [viewDate, fno]);

  const BtnList = setTimeType(operatingTime, reservedTime, dateState);
  return (
    <StTimeContainer className="__disable" onClick={highLightUserPick}>
      {BtnList.map((options, idx) => (
        <StTimeBtn className={`${options.isDisable}`} key={idx}>
          {timeFormatter(options.hour)}
        </StTimeBtn>
      ))}
    </StTimeContainer>
  );
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
  const isInValid = !isValid(new Date(), state, state.viewDate);
  return arr.map((hour, idx) => {
    let isDisable = null;
    if (isInValid && isPastTime(hour)) isDisable = "__disable";
    if (isReservedTime(reservedList, hour)) isDisable = "__disable";
    return { isDisable, hour };
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

function highLightUserPick(e) {
  const cssClass = e.target.className;
  if(cssClass.includes("__disable")) return;
  console.log(e.target);
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

  border: 1px solid grey;
  border-radius: 5px;

  margin: 0.5em;
  padding: 0.3em 0;

  text-align: center;

  color: ${(props) => (props.className === "pick" ? "white" : "black")};

  background-color: ${(props) =>
    props.className === "pick" ? "mediumseagreen" : "white"};

  opacity: ${(props) => (props.className === "__disable" ? "0.2" : "1")};

  &:hover {
    cursor: ${(props) =>
      props.className === "__disable" ? "not-allowed" : "pointer"};
  }
`;

export default React.memo(TimePicker);
