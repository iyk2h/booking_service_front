// ex) 1 -> 01
function dateFormatter(date) {
  return Number(date) < 10 ? `0${date}` : date;
}

// ex) 2022,5,1 -> 2022-05-01
export function fullDateFormatter(dateState) {
  return `${dateState.viewYear}-${dateFormatter(dateState.viewMonth)}-${dateFormatter(dateState.viewDate)}`
}

// ex) 12 -> 12:00
export function timeFormatter(time) {
  return Number(time) < 10 ? `0${time}:00` : `${time}:00`;
}

// ex range(8, 10) -> [8, 9, 10]
export function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function stringTimeToNumber(startTime) {
  return Number(startTime.split(" ")[1].split(":")[0]);
}
export function setTimeListFromReservedTime(data) {
  return data.map(booking => stringTimeToNumber(booking.startTime));
}