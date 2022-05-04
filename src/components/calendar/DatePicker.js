import { useDateState, useDateDispatch } from "../../context/dateContext";
import { range } from "../../utils/format";
import styled from "styled-components";

function DatePicker() {
  const dateState = useDateState();
  const dateDispatch = useDateDispatch();

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

function Calendar({ dateState }) {
  const prevLast = new Date(dateState.viewYear, dateState.viewMonth - 1, 0);
  const thisLast = new Date(dateState.viewYear, dateState.viewMonth, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay(); // 이전달 마지막 요일
  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay(); // 이번달 마지막 요일

  const prevDates =
    PLDay === 6 ? [] : setDisable(range(PLDate - PLDay, PLDate));
  const thisDates = setDateType(range(1, TLDate), dateState);
  const nextDates = setDisable(range(1, 6 - TLDay));

  const dates = prevDates.concat(thisDates, nextDates);
  return (
    <>
      {dates.map((date, idx) => {
        return <StLI key={idx}>{date}</StLI>;
      })}
    </>
  );
}

const day_of_week = ["일", "월", "화", "수", "목", "금", "토"];
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

///////// 함수들
function setDateType(arr, state) {
  const TODAY = new Date();
  return arr.map((date) => {
    if (isPicked(state, date)) return <StHighLight>{date}</StHighLight>;
    if (isToday(TODAY, state, date)) return date;
    if (isValid(TODAY, state, date)) return date;
    return (
      <StDisable className="__disable" key={date}>
        {date}
      </StDisable>
    );
  });
}

function setDisable(arr) {
  return arr.map((date) => (
    <StDisable className="__disable" key={date}>
      {date}
    </StDisable>
  ));
}

function isPicked(state, date) {
  return Number(date) === Number(state.viewDate);
}

function isValid(TODAY, state, date) {
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
  box-sizing: border-box;
  width: calc(100% / 7);

  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.3rem;
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
  display: inline-block;

  width: 25px;
  height: 25px;
  line-height: 28px;

  border-radius: 50%;

  color: white;
  background-color: mediumseagreen;

  transform: translateY(-5%);
`;
export default DatePicker;
