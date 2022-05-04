import { useDateState, useDateDispatch } from "../../context/dateContext";
import { fullDateFormatter } from "../../utils/format";
import { getReservedTime } from "../../apis/api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function TimePicker() {
  const urlParams = useParams();
  const dateState = useDateState();
  const dateDispatch = useDateDispatch();

  useEffect(() => {
    getReservedTimeByDate(urlParams.fno, dateState);
  }, [dateState.viewDate, urlParams.fno]);

  async function getReservedTimeByDate(fno, dateState) {
    if(!dateState.viewDate) return;
    try {
      const date = fullDateFormatter(dateState.viewYear, dateState.viewMonth, dateState.viewDate);
      const res = await getReservedTime(urlParams.fno, date);
      dateDispatch({ type: "SET_TIME", payload: res.data});
    } catch (err) {
      console.log(`${err} \n --- 클릭한 날짜의 이미 예약된 시간 받아올때 에러 ---`);
    }
  }
  console.log(dateState.reservedTime)
  return <div></div>;
}


export default TimePicker;
