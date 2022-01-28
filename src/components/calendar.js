import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { TimeTable } from "./timetable";
import DateFilter from "./datefilter";
import DatePicker from "./datepicker";
import axios from "axios";
import "./calendar.css";

function Calendar() {  
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [clicked, setClicked] = useState(() => new Date().getDate());
  const [reservedTime, setReservedTime] = useState([]);

  const current_url = useParams();
  const location = useLocation();
  
  // Mount시 오늘 날짜로 예약 일정 받아오기
  useEffect(() => {
    if(location.state) {
      setViewYear(Number(location.state.userSelect.date.split(":"[0])));
      setViewMonth(Number(location.state.userSelect.date.split(":"[1])));
      setClicked(Number(location.state.userSelect.date.split(":"[2])));
      setReservedTime(location.state.time);
      return;
    }
    const url = `${current_url.fno}/date`;
    const f_month = viewMonth+1 < 10 ? `0${viewMonth+1}` : viewMonth + 1;
    const f_day = todayNum < 10 ? `0${todayNum}` : todayNum; 
    const data = {
      "date" : `${viewYear}-${f_month}-${f_day}`
    }
    requestTime(url, data, todayNum);
  }, []);

  const requestTime = (url, data, clicked_date) => { 
    const header = {"Content-type":"application/json"}
    axios.post(url, data, header)
    .then(response => response.data)
    .then(json => filterTimeInJson(json, clicked_date))
    .then(filteredTime => setReservedTime(filteredTime))
    .catch(err => console.log(err))
  }

  const filterTimeInJson = (json, clicked_date) => {
    if(json.length === 0 || !json) {
      return [];
    }
    const able_time = [];
    json.forEach(x => {
      if(x.startTime.split(" ")[0].split("-")[2] === String(clicked_date)) {
        console.log(x)
        able_time.push(x.startTime.split(" ")[1], x.endTime.split(" ")[1]);
      }
    })
    return able_time;
  }

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
    setClicked(null);
  };

  const handlePicker = (e) => {
    const dateClass = e.target.className;
    if (dateClass.includes("_able")) {
      const clicked_date = Number(e.target.textContent);
      const url = `${current_url.fno}/date`;
      const f_month = viewMonth+1 < 10 ? `0${viewMonth+1}` : viewMonth + 1;
      const f_day = todayNum < 10 ? `0${clicked}` : clicked; 
      const data = {
        "date" : `${viewYear}-${f_month}-${f_day}`
      }
      setClicked(clicked_date); 
      requestTime(url, data, clicked_date);
    }
  };
 
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
    selectableIndex = thisDates.indexOf(todayNum) + prevDates.length;
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

  const f_viewMonth = viewMonth+1 < 10 ? `0${viewMonth+1}` : viewMonth + 1;
  const f_clicked = clicked < 10 ? `0${clicked}` : clicked 
  return (
    <div className="calendar">
      <DateFilter
        viewYear={viewYear}
        viewMonth={viewMonth}
        onClick={handleFilter}
      />
      <DatePicker 
        dates={dates} 
        onClick={handlePicker}
      />
      <TimeTable 
        reservedTime={reservedTime}
        userSelect={
          {  
            fno : current_url.fno,
            date: `${viewYear}-${f_viewMonth}-${f_clicked}`,      
          }
        } 
      />
      {/* <Reserve /> */}
    </div>
  );
}

export { Calendar };