import { useEffect } from "react";
import { useDateState, useDateDispatch } from "../../context/dateContext";
import { getReservedTime } from "../../apis/api";
import { useParams } from "react-router-dom";
import { range, fullDateFormatter } from "../../utils/format";
import styled from "styled-components";

const day_of_week = ["일", "월", "화", "수", "목", "금", "토"];

async function getReservedTimeByDate(fno, date) {
  try {
    const res = await getReservedTime(fno, date);
    console.log(res.data);
  } catch (err) {
    console.log(`${err} \n --- 클릭한 날짜의 이미 예약된 시간 받아올때 에러 ---`);
  }
}

function DatePicker() {
  const urlParams = useParams();
  const dateState = useDateState();
  const dateDispatch = useDateDispatch();

  useEffect(() => {
    const date = fullDateFormatter(dateState.viewYear, dateState.viewMonth, dateState.viewDate);
    getReservedTimeByDate(urlParams.fno, date);
  }, [dateState.viewDate, urlParams.fno]);

  function handleClick(e) {
    if (e.target.className.includes("__disable")) return;
    dateDispatch({ type: "PICK", payload: Number(e.target.textContent) });
  }

  return (
    <StUL onClick={handleClick}>
      <YoilList />
      <Calendar dateState={dateState} />
    </StUL>
  );
}

function YoilList() {
  return (
    <>
      {day_of_week.map((yoil) => {
        return (
          <StLI className="__disable" key={yoil}>
            {yoil}
          </StLI>
        );
      })}
    </>
  );
}

function Calendar({ dateState }) {
  const prevLast = new Date(dateState.viewYear, dateState.viewMonth - 1, 0);
  const thisLast = new Date(dateState.viewYear, dateState.viewMonth, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay(); // 이전달 마지막 요일
  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay(); // 이번달 마지막 요일

  const prevDates =
    PLDay === 6 ? [] : setDateType(range(PLDate - PLDay, PLDate));
  const thisDates = setDateType(range(1, TLDate), dateState);
  const nextDates = setDateType(range(1, 6 - TLDay));

  const dates = prevDates.concat(thisDates, nextDates);
  return (
    <>
      {dates.map((date, idx) => {
        return <StLI key={idx}>{date}</StLI>;
      })}
    </>
  );
}

// 여기를 좀 깔끔하게 만들고 싶음.
function setDateType(arr, state = null) {
  const TODAY = new Date();
  return arr.map((date) => {
    if (state) {
      if (isPicked(state, date)) return <StHighLight>{date}</StHighLight>;
      if (isToday(TODAY, state, date)) return date;
      if (isPast(TODAY, state, date)) return date;
    }
    return (
      <StDisable className="__disable" key={date}>
        {date}
      </StDisable>
    );
  });
}

function isPicked(state, date) {
  return Number(date) === Number(state.viewDate);
}

function isPast(TODAY, state, date) {
  return new Date(`${state.viewYear}-${state.viewMonth}-${date}`) > TODAY;
}

function isToday(TODAY, state, date) {
  return (
    TODAY.getDate() === date &&
    TODAY.getMonth() + 1 === state.viewMonth &&
    TODAY.getFullYear() === state.viewYear
  );
}

const StUL = styled.ul`
  display: flex;
  flex-flow: row wrap;
  text-align: center;

  margin: 0;
  padding: 10px;

  & li:nth-child(7n) {
    color: #396ee2;
  }
  & li:nth-child(7n + 1) {
    color: #d13e3e;
  }
`;

const StLI = styled.li`
  width: calc(100% / 7);
  text-align: center;
  padding: 0.5rem 0;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

// 고쳐야됨. span으로 때우는거보다 props로 className 전달해주는게 더 좋을듯
const StDisable = styled.span`
  opacity: 0.2;
`;

const StHighLight = styled.span`
  transform: translateY(-15%);
  display: inline-block;

  width: 25px;
  height: 25px;
  line-height: 28px;

  border-radius: 50%;

  color: white;
  background-color: mediumseagreen;
`;
export default DatePicker;
