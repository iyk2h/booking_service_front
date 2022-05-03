import axios from 'axios';
import { fullDateFormatter } from "../utils/format"
// 둘중에 뭐쓸지
export function getReservedTime(fno, date) {
  return axios.post(`/booking/${fno}/date`, date);
}

export async function getReservedTimeByDate(fno, dateState) {
  try {
    const date = fullDateFormatter(dateState.viewYear, dateState.viewMonth, dateState.viewDate)
    const res = await axios.post(`/booking/${fno}/date`, date);
    console.log(res.data);
  } catch (err) {
    console.log(`${err} \n --- 클릭한 날짜의 이미 예약된 시간 받아올때 에러 ---`);
  }
}