import axios from 'axios';

export function getReservedTime(fno, data) {
  return axios.post(`/booking/${fno}/date`, data);
}

export function postReserve(fno, data) {
  return axios.post(`/booking/${fno}`, data)
}