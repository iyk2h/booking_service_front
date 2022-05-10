import React, { useState, useEffect } from "react";
import {
  fullDateFormatter,
  timeFormatter,
  range,
  setTimeListFromReservedTime,
} from "../../utils/format";
import { useDateState, useDateDispatch } from "../../context/dateContext";
import { getReservedTime } from "../../apis/api";
import { useParams } from "react-router-dom";
import { isValid, isPastTime } from "../../utils/check";
import styled from "styled-components";
import ReserveBtn from "./ReserveBtn";
import { TimePickerLoader } from "../modal/loading";

const openingTime = 8;
const closingTime = 19;
const operatingTime = range(openingTime, closingTime);
const maxHour = 2; // 임시

function TimePicker() {
  const fno = useParams().fno;
  const dateState = useDateState();
  const dateDispatch = useDateDispatch();
  const { viewDate, reservedTime } = dateState;
  const [userPick, setUserPick] = useState([]);

  useEffect(() => {
    getReservedTimeByDate(fno, dateState, dateDispatch);
    setUserPick([]);
  }, [viewDate, fno]);

  function restrictUserPick(e) {
    const cssClass = e.target.className;
    const text = Number(e.target.textContent.split(":")[0]);
    if (isNaN(text)) return;
    if (cssClass.includes("__disable")) return; // o 선택 불가능한 버튼
    if (userPick.indexOf(text) !== -1)
      return setUserPick(userPick.filter((time) => time < text)); // o 다시 누르면 취소
    if (userPick.length === maxHour)
      return alert(`최대 이용시간은 ${maxHour}시간 입니다.`); // o 최대 이용시간 이상 선택 불가
    if (userPick.length !== 0 && text < Math.min(...userPick)) return; // o 이전 시간 선택 불가
    if (text - userPick[userPick.length - 1] > 1) return; // o 연속된 시간만 선택 가능.
    setUserPick([...userPick, text]);
  }

  let BtnList;
  if (!reservedTime) {
    BtnList = setDisableTimeList(operatingTime, range(openingTime, closingTime), dateState);
  } else {
    BtnList = setDisableTimeList(operatingTime, reservedTime, dateState);
  }

  return (
    <StTimeContainer className="__disable" onClick={restrictUserPick}>
      {BtnList.map((options, idx) => {
        let cssClass = options.isDisable;
        if (userPick.indexOf(options.hour) !== -1) {
          cssClass = "pick";
        } else if (
          options.hour - Math.min(...userPick) > 0 &&
          options.hour - Math.min(...userPick) < maxHour
        ) {
          cssClass = "adjacentTime";
        }
        return (
          <StTimeBtn className={cssClass} key={idx}>
            {timeFormatter(options.hour)}
          </StTimeBtn>
        );
      })}
      <ReserveBtn fno={fno} userPick={userPick} dateState={dateState} />
      {!reservedTime && <TimePickerLoader />}
    </StTimeContainer>
  );
}

// ----- Functions -----
async function getReservedTimeByDate(fno, dateState, dispatch) {
  if (!dateState.viewDate) return;
  dispatch({ type: "LOADING" });
  try {
    const res = await getReservedTime(fno, {
      date: fullDateFormatter(dateState),
    });

    dispatch({
      type: "SET_TIME",
      payload: setTimeListFromReservedTime(res.data),
    });
  } catch (err) {
    console.log(`${err}\n- 클릭한 날짜의 이미 예약된 시간 받아올때 에러 -`);
  }
}

function setDisableTimeList(arr, reservedList, state) {
  const isInValid = !isValid(new Date(), state, state.viewDate);
  const result = arr.map((hour) => {
    let isDisable = "";
    if (isInValid && isPastTime(hour)) isDisable = "__disable";
    if (isReservedTime(reservedList, hour)) isDisable = "__disable";
    return { isDisable, hour };
  });
  return result;
}

function isReservedTime(reservedList, viewHour) {
  return reservedList.indexOf(viewHour) !== -1;
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

  color: ${(props) =>
    props.className === "pick"
      ? "white"
      : props.className === "adjacentTime"
      ? "mediumseagreen"
      : "black"};

  background-color: ${(props) =>
    props.className === "pick" ? "mediumseagreen" : "white"};

  opacity: ${(props) => (props.className === "__disable" ? "0.2" : "1")};

  &:hover {
    cursor: ${(props) =>
      props.className === "__disable" ? "not-allowed" : "pointer"};
  }
`;

export default React.memo(TimePicker);
