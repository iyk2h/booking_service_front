import axios from "axios";

const REGEX = {
  ID : /^[0-9]{6}$/,
  PW : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  NAME : /^[가-힣]{2,5}$/,
  PHONE : /^010-?([0-9]{4})-?([0-9]{4})$/,
}

function checkIdFormat(id) {
  return REGEX.ID.test(id);
}

function checkPhoneFormat(phone) {
  return REGEX.PHONE.test(phone);
}

function checkNameFormat(name) {
  return REGEX.NAME.test(name);
}

function chekcBothPwMatch(pw, confirm) {
  return pw === confirm;
}

async function checkDuplicate(id) {
  try{
    await axios.post(`/students/idcheck`, { id });
  } catch (err) {
    return err.response.status === 400 && alert("이미 존재하는 아이디 입니다.");
  }
}

function setPlace(item) {
  switch (item) {
    case 1:
      return "족구장";
    case 2:
      return "풋살장";
    case 3:
      return "테니스장";
    case 4:
      return "대운동장";
    default:
      break;
  }
};

export {
  checkIdFormat,
  checkPhoneFormat,
  chekcBothPwMatch,
  checkNameFormat,
  checkDuplicate,
  setPlace
};
