import { useDateState, useDateDispatch } from "../../context/dateContext";
import { isPicked, isValid, isToday } from "../../utils/check";
import { range } from "../../utils/format";
import styled from "styled-components";

function DatePicker() {
  const dateState = useDateState();
  const dateDispatch = useDateDispatch();

  function handleClick(e) {
    const className = e.target.className;
    if (className.includes("__disable") || className.includes("yoil")) return;
    dateDispatch({ type: "PICK", payload: Number(e.target.textContent) });
  }

  return (
    <StUL onClick={handleClick}>
      <YoilList />
      <Calendar dateState={dateState} />
    </StUL>
  );
}

const day_of_week = ["일", "월", "화", "수", "목", "금", "토"];
function YoilList() {
  return (
    <>
      {day_of_week.map((yoil) => {
        return (
          <StLI className="yoil" key={yoil}>
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
    PLDay === 6 ? [] : setDisable(range(PLDate - PLDay, PLDate));
  const thisDates = setDateType(range(1, TLDate), dateState);
  const nextDates = setDisable(range(1, 6 - TLDay));

  const dates = prevDates.concat(thisDates, nextDates);

  return <>{dates}</>;
}

// ----- Functions ----- //
function setDateType(arr, state) {
  const TODAY = new Date();
  return arr.map((date) => {
    if (isPicked(state, date)) {
      return (
        <StLI key={`h_${date}`}>
          <StHighLight>{date}</StHighLight>
        </StLI>
      );
    }
    let isDisable = "__disable";
    if (isToday(TODAY, state, date)) isDisable = null;
    if (isValid(TODAY, state, date)) isDisable = null;
    return (
      <StLI className={isDisable} key={date}>
        {date}
      </StLI>
    );
  });
}

function setDisable(arr) {
  return arr.map((date) => (
    <StLI className="__disable" key={`n-d-${date}`}>
      {date}
    </StLI>
  ));
}

// ----- Style ----- //
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

  opacity: ${(props) => (props.className === "__disable" ? "0.2" : "1")};
  &:hover {
    cursor: ${(props) =>
      props.className === "__disable" ? "not-allowed" : "pointer"};
  }
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
