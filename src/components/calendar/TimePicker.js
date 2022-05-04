import { useDateState, useDateDispatch } from "../../context/dateContext";
import { fullDateFormatter, timeFormatter, range } from "../../utils/format";
import { getReservedTime } from "../../apis/api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";

const startTime = 8;
const endTime = 19;

function TimePicker() {
  const urlParams = useParams();
  const dateState = useDateState();
  const dateDispatch = useDateDispatch();

  useEffect(() => {
    getReservedTimeByDate(urlParams.fno, dateState);
  }, [dateState.viewDate, urlParams.fno]);

  async function getReservedTimeByDate(fno, dateState) {
    if (!dateState.viewDate) return;
    try {
      const date = fullDateFormatter(
        dateState.viewYear,
        dateState.viewMonth,
        dateState.viewDate
      );
      const res = await getReservedTime(urlParams.fno, date);
      dateDispatch({ type: "SET_TIME", payload: res.data });
    } catch (err) {
      console.log(
        `${err} \n --- 클릭한 날짜의 이미 예약된 시간 받아올때 에러 ---`
      );
    }
  }
  console.log(dateState.reservedTime);

  // 이제 state를 기반으로 시간 버튼 렌더링하기.
  const timeBtnList = range(startTime, endTime).map(time => {
    return <StTimeBtn key={time}>{timeFormatter(time)}</StTimeBtn>
  })
  return (
    <StTimeContainer>
      {timeBtnList}
    </StTimeContainer>
  );
}

const StTimeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: 20px 10px;
`;

const StTimeBtn = styled.div`
  &:hover {
    cursor: pointer;
  }
  width: calc(100% / 5);
  text-align: center;
  border-radius: 5px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0.3em 0;
  margin: 0.5em;
`;

export default TimePicker;
