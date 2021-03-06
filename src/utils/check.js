import axios from "axios";

const REGEX = {
  ID : /^[0-9]{6}$/,
  PW : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  NAME : /^[가-힣]{2,5}$/,
  PHONE : /^010-?([0-9]{4})-?([0-9]{4})$/,
}

// Login
export function checkIdFormat(id) {
  return REGEX.ID.test(id);
}

export function checkPhoneFormat(phone) {
  return REGEX.PHONE.test(phone);
}

export function checkNameFormat(name) {
  return REGEX.NAME.test(name);
}

export function chekcBothPwMatch(pw, confirm) {
  return pw === confirm;
}

export async function checkDuplicate(id) {
  try{
    await axios.post(`/students/idcheck`, { id });
  } catch (err) {
    return err.response.status === 400 && alert("이미 존재하는 아이디 입니다.");
  }
}

// Calendar
export function isPicked(state, date) {
  return Number(date) === Number(state.viewDate);
}

export function isValid(TODAY, state, date) {
  date = date ? date : 1;
  return new Date(`${state.viewYear}-${state.viewMonth}-${date}`) > TODAY; // 일단 때웟음. 고쳐야함.
}

export function isToday(TODAY, state, date) {
  return (
    TODAY.getDate() === date &&
    TODAY.getMonth() + 1 === state.viewMonth &&
    TODAY.getFullYear() === state.viewYear
  );
}

// Time
export function isPastTime(hour) {
  const [currHour] = new Date().toTimeString().split(":");
  return Number(hour) < Number(currHour);
}