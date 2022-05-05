import axios from 'axios';

export function getReservedTime(fno, date) {
  return axios.post(`/booking/${fno}/date`, date);
}