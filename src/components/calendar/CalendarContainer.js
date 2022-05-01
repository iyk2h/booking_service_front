import React, { useState } from "react";

import DateFilter from "./DateFilter";

const initialDate = new Date();

function CalendarContainer() {
  const [dateState, setDateState] = useState({
    viewYear: initialDate.getFullYear(),
    viewMonth: initialDate.getMonth() + 1,
    viewDate: initialDate.getDate(),
  });

  const { viewYear ,viewMonth, viewDate } = dateState;

  function handleFilter(e) {
    const className = e.target.className;
    if (!className.includes("-btn")) return;
    let currViewYear;
    let currViewMonth;
    if (className.includes("prev-btn")) {
      currViewYear = viewMonth === 1 ? viewYear - 1 : viewYear;
      currViewMonth = viewMonth === 1 ? 12 : viewMonth - 1;
    } else if (className.includes("next-btn")) {
      currViewYear = viewMonth === 12 ? viewYear + 1 : viewYear;
      currViewMonth = viewMonth === 12 ? 1 : viewMonth + 1;
    }
    setDateState({
      viewYear: currViewYear,
      viewMonth: currViewMonth,
      viewDate: null
    })
  }

  return (
    <div>
      <DateFilter handleFilter={handleFilter} dateState={dateState} />
    </div>
  );
}

export default CalendarContainer;