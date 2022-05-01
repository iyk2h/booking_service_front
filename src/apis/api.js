import axios from 'axios';

export async function getReservedTime(fno, date) {
  return await axios.post(`/booking/${fno}/date`, date);
}