import React, { useState, useEffect } from "react";
import {
  fullDateFormatter,
  timeFormatter,
  range,
  setTimeListFromReservedTime,
} from "../../utils/format";
import { useDateState, useDateDispatch } from "../../context/dateContext";
import { getReservedTime } from "../../apis/api";
import { useLocation, useParams } from "react-router-dom";
import { isValid, isPastTime } from "../../utils/check";
import styled from "styled-components";
import ReserveBtn from "./ReserveBtn";
import { TimePickerLoader } from "../modal/loading";

const openingTime = 8;
const closingTime = 19;
const operatingTime = range(openingTime, closingTime);
const maxHour = 2; // 임시

function TimePicker() {
  const location = useLocation();
  const fno = useParams().fno;
  const dateState = useDateState();
  const dateDispatch = useDateDispatch();
  const { viewDate, reservedTime } = dateState;
  const [userPick, setUserPick] = useState([]);

  useEffect(() => {
    // if (location.state && location.state.dateState) {
    //   dateDispatch({ type: "SET_DATE", payload: location.state.dateState });
    //   setUserPick(location.state.userPick); // 동작하는데, 아래 어딘가에서 렌더링이 일어나기때문에 else문 setUserPick이 실행됨.
    //   getReservedTimeByDate(fno, dateState, dateDispatch);
    //   location.state = null;
    // } else {
    getReservedTimeByDate(fno, dateState, dateDispatch);
    setUserPick([]);
    // }
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
    BtnList = setDisableTimeList(
      operatingTime,
      range(openingTime, closingTime),
      dateState
    );
  } else {
    BtnList = setDisableTimeList(operatingTime, reservedTime, dateState);
  }
  // console.log("--여기",{userPick})
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
  const TODAY = new Date();
  const isInvalid = !isValid(TODAY, state, state.viewDate);
  const isPrevDate = (state.viewYear <= TODAY.getFullYear()) && (state.viewMonth < TODAY.getMonth()+1)
  const result = arr.map((hour) => {
    let isDisable = "";
    if (isPrevDate) {isDisable = "__disable"};
    if (isInvalid && isPastTime(hour)) {isDisable = "__disable"}; // 시간과 동시에 만족해야하기때문에 오류임.
    if (isReservedTime(reservedList, hour)) {isDisable = "__disable"};
    return { isDisable, hour };
  });
  return result;
}

function test() {

}

function isReservedTime(reservedList, hour) {
  return reservedList.indexOf(hour) !== -1;
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
