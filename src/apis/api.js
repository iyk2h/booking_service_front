import axios from "axios";
import { fullDateFormatter } from "../utils/format";

export function getReservedTime(fno, data) {
  return axios.post(`/booking/${fno}/date`, data);
}

export function postReserve(fno, dateState, userPick) {
  const data = {
    date: fullDateFormatter(dateState),
    maxHour: userPick.length,
    selectedTime: userPick[0],
  };
  return axios.post(`/booking/${fno}`, data);
}
