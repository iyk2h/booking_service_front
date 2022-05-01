export function dateFormatter(date) {
  return Number(date) < 10 ? `0${date}` : date;
}

export function fullDateFormatter(year, month, date) {
  return {
    date: `${year}-${dateFormatter(month)}-${dateFormatter(date)}`,
  };
}
