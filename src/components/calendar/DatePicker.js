import { useDateState } from "../../context/dateContext";
import styled from "styled-components";
import { range } from "../../utils/format";

const day_of_week = ["일", "월", "화", "수", "목", "금", "토"];

function DatePicker() {
  function handleClick(e) {
    if (e.target.className.includes('__disable')) return;
    console.log(1);
  }
  return (
    <StUL>
      <YoilList />
      <Calendar onClick={handleClick}/>
    </StUL>
  );
}

function YoilList() {
  return (
    <>
      {day_of_week.map((yoil) => {
        return <StLI key={yoil}>{yoil}</StLI>;
      })}
    </>
  );
}

function Calendar() {
  const dateState = useDateState();
  const prevLast = new Date(dateState.viewYear, dateState.viewMonth - 1, 0);
  const thisLast = new Date(dateState.viewYear, dateState.viewMonth, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay(); // 이전달 마지막 요일
  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay(); // 이번달 마지막 요일

  const prevDates =
    PLDay === 6 ? [] : setDisable(range(PLDate - PLDay, PLDate));
  const thisDates = setDisable(range(1, TLDate), dateState);
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

//

function setDisable(arr, state = null) {
  const TODAY = new Date();
  return arr.map((date) => {
    if (state) {
      if (isToday(TODAY, state, date)) return <StHighLightToday>{date}</StHighLightToday>
      if (isPast(TODAY, state, date)) return date;
    }
    return (
      <StDisable className="__disable" key={date}>
        {date}
      </StDisable>
    );
  });
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

const StHighLightToday = styled.span`
  display: inline-block;

  width: 25px;
  height: 25px;

  line-height:27px;
  border-radius: 50%;

  color: white;
  background-color: mediumseagreen;
`;
export default DatePicker;
