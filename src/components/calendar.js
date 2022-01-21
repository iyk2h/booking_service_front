import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TimeTable } from "./timetable";
import { getData } from "./data";
import { Reserve } from './reserve';
import DateFilter from "./datefilter";
import DatePicker from "./datepicker";
import axios from "axios";
import "./calendar.css";


// 최상위 달력 컴포넌트
function Calendar() {  
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [clicked, setClicked] = useState(null);
  const [reservedTime, setReservedTime] = useState();
  const [userTime, setUserTime] = useState([]);

  const current_url = useParams();

  // Mount시 오늘 날짜로 예약 일정 받아오기
  useEffect(() => {
    const url = `http://localhost:8000/booking/${current_url.fno}/date`;
    const f_month = viewMonth+1 < 10 ? `0${viewMonth+1}` : viewMonth + 1;
    const data = {
      "date" : `${viewYear}-${f_month}-${todayNum}`

    }
    requestTime(url, data);
  }, []);

  const requestTime = (url, data) => { // reservedTime state를 변경시킴.
    // console.log(url, typeof url);
    // console.log(data);
    const header = {"Content-type":"application/json"}
    const crossOriginIsolated = {withCredentials: true}
    axios.post(url, data, header, crossOriginIsolated)
    .then(response => response.data)
    .then(json => filterTimeInJson(json))
    .then(filtered_time => setReservedTime(filtered_time))
    .catch(err => console.log("* GET 에러 "+err))
  }

  const filterTimeInJson = json => {
    const able_time = [];
    json.forEach(x => {
      able_time.push(x.startTime.split(" ")[1], x.endTime.split(" ")[1]);
    })
    return able_time;
  }

  // state를 변경하는 함수이므로 부모 Component에 선언되있어야 함.
  const handleFilter = (e) => {
    const btnClass = e.target.className;
    if (!btnClass.includes('_btn')) {
      return;
    }

    let currViewYear;
    let currViewMonth;
    if (btnClass === "prev_btn") {
      currViewYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      currViewMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    } else if (btnClass === "next_btn") {
      currViewYear = viewMonth === 11 ? viewYear + 1 : viewYear;
      currViewMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    }
    setViewYear(currViewYear);
    setViewMonth(currViewMonth);
  };

  // state를 변경하는 함수이므로 부모 Component에 선언되있어야 함.
  const handlePicker = (e) => {
    const dateClass = e.target.className;
    if (dateClass.includes("_able")) {
      const clicked_date = Number(e.target.textContent);
      const url = `BASE_URL/fno/${current_url}/${clicked_date}`;
      setClicked(clicked_date);
      requestTime(url); 
    }
  };

  // 따로 빼도 되는지 애매함.
  const handleTimeClick = e => {
    const timeClass = e.target.className;
    if(timeClass.includes('can_reserve')) {
      let tmp = e.target.textContent;
      if(userTime.indexOf(tmp) !== -1) { // 누른거 취소
        const cancle = userTime.filter(time => time !== tmp);
        setUserTime(cancle);
        return;
      }
      if(userTime.length === 1) {
        if(Math.abs(Number(userTime[0].split(":")[0] - Number(tmp.split(":")[0]))) !== 1) {
          return;
        }
      }
      if(userTime.length < 2) {
        setUserTime(userTime.concat([tmp]));
      }
    }
  }

  // 달력 UI
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0); 

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();
  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();
  
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  // ??? 요일
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const today = new Date();
  const todayNum = today.getDate();

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  let selectableIndex = 0;
  if (today.getFullYear() === viewYear && today.getMonth() === viewMonth) {
    selectableIndex = dates.indexOf(todayNum);
  } else if (viewYear < today.getFullYear()) { // ???
    selectableIndex = 100;
  }

  dates.forEach((date, i) => {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    const selectable =
      i >= selectableIndex && condition === "this"
      ? "_able"
      : i > lastDateIndex
      ? null
      : "disable";

    const isClicked = (selectable === "_able" &&  date === clicked) ? "isClick" : null;
    const todayClass =
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      todayNum === date
        ? "today"
        : null;

    dates[i] = (
      <li
        className={["date", condition, selectable, todayClass, isClicked].join(" ")}
        key={i}
      >
        {date}
      </li>
    );
  });

  let timeTable = null;
  if(reservedTime) {
    timeTable = (
    <TimeTable
      reservedTime={reservedTime}
      userTime={userTime}
      onClick={handleTimeClick}
    />
    )
  }
  
  return (
    <div className="calendar">
      <DateFilter
        viewYear={viewYear}
        viewMonth={viewMonth}
        onClick={handleFilter}
      />
      <DatePicker dates={dates} onClick={handlePicker}/>
      {timeTable}
      <Reserve
        userSelect={
          {  
            fno : current_url.fno,
            date: `${viewYear}-${viewMonth+1}-${clicked}`,
            time : userTime            
          }
        } 
      />
    </div>
  );
}

export { Calendar };
// Array.(TLDate+1).keys() -> 배열의 idx를 key로 하는 'Array Iterator'객체 반환
  // 'Array Iterrator'란? ->
  // 전개구문('...') -> 배열같은 반복 가능한 구문을 1개의 인수가 아닌 전개하여 여러개의 인수로 확장시킴.