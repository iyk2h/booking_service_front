import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { TimeTable } from "./timetable";
import DateFilter from "./datefilter";
import DatePicker from "./datepicker";
import axios from "axios";
import "./calendar.css";

export default function Calendar() {
  const urlParams = useParams();
  const location = useLocation();

  const [state, setState] = useState({
    viewYear: new Date().getFullYear(),
    viewMonth: new Date().getMonth(),
    clicked: new Date().getDate(),
    reservedTime: [],
  });

  const { viewYear, viewMonth, clicked, reservedTime } = state;

  useEffect(() => {
    if (location.state) {
      const prev_select = location.state.userSelect.date.split("-").map((x) => Number(x));
      return setState({
        ...state,
        viewYear: prev_select[0],
        viewMonth: prev_select[1] - 1,
        clicked: prev_select[2],
      });
    }
    const f_month = viewMonth + 1 < 10 ? `0${viewMonth + 1}` : viewMonth + 1;
    const f_day = todayNum < 10 ? `0${todayNum}` : todayNum;
    const url = `/booking/${urlParams.fno}/date`;
    const data = { date: `${viewYear}-${f_month}-${f_day}` };
    requestTime(url, data, todayNum);
  }, []);

  const requestTime = async (url, data, clicked_date) => {
    try {
      const response = await axios.post(url, data);
      const filteredTime = filterTimeInJson(response.data);
      setState({
        ...state,
        clicked: clicked_date,
        reservedTime: filteredTime,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const filterTimeInJson = (json, clicked_date) => {
    if (!json || json.length === 0) {
      return [];
    }
    const filteredTime = [];
    json.forEach((x) => {
      if (x.startTime.split(" ")[1].split("-")[2] === clicked_date) {
        filteredTime.push(x.startTime.split(" ")[1], x.endTime.split(" ")[1]);
      }
    });
    return filteredTime;
  };

  const handleFilter = (e) => {
    const btnClass = e.target.className;
    if (!btnClass.includes("_btn")) {
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
    setState({
      viewYear: currViewYear,
      viewMonth: currViewMonth,
      clicked: null,
      reservedTime: [],
    });
  };

  const handlePicker = (e) => {
    const dateClass = e.target.className;
    if (dateClass.includes("_able")) {
      const clicked_date = Number(e.target.textContent);
      const url = `/booking/${urlParams.fno}/date`;
      const f_month = viewMonth + 1 < 10 ? `0${viewMonth + 1}` : viewMonth + 1;
      const f_day = clicked_date < 10 ? `0${clicked_date}` : clicked_date;
      const data = {
        date: `${viewYear}-${f_month}-${f_day}`,
      };
      setState({
        ...state,
        clicked: clicked_date,
      });
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
  // console.log({ viewMonth })
  if (today.getFullYear() === viewYear && today.getMonth() === viewMonth) {
    selectableIndex = thisDates.indexOf(todayNum) + prevDates.length; // 애매
  } else if (viewYear !== today.getFullYear() && viewMonth !== today.getMonth()) {
    // ???
    selectableIndex = 100;
  }

  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    const selectable =
      i >= selectableIndex && condition === "this"
        ? "_able"
        : i > lastDateIndex
        ? null
        : "disable";
    const isClicked =
      selectable === "_able" && date === clicked ? "isClick" : null;
    const todayClass =
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      i === thisDates.indexOf(todayNum) + prevDates.length
        ? "today"
        : null;

    dates[i] = (
      <li
        className={["date", condition, selectable, todayClass, isClicked].join(
          " "
        )}
        key={i}
      >
        {date}
      </li>
    );
  });

  const f_viewMonth = viewMonth + 1 < 10 ? `0${viewMonth + 1}` : viewMonth + 1;
  const f_clicked = clicked < 10 ? `0${clicked}` : clicked;
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
        userSelect={{
          fno: urlParams.fno,
          date: `${viewYear}-${f_viewMonth}-${f_clicked}`,
        }}
      />
    </div>
  );
}