// ex) 1 -> 01
function dateFormatter(date) {
  return Number(date) < 10 ? `0${date}` : date;
}

// ex) 2022,5,1 -> 2022-05-01
export function fullDateFormatter(year, month, date) {
  return {
    date: `${year}-${dateFormatter(month)}-${dateFormatter(date)}`,
  };
}

// ex) 12 -> 12:00
export function timeFormatter(time) {
  return Number(time) < 10 ? `0${time}:00` : `${time}:00`;
}

export function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
