import React from "react";
import DateFilter from "./DateFilter";
import { DateContextProvider } from "./dateContext";
import DatePicker from "./DatePicker";

function CalendarContainer() {
  return (
    <DateContextProvider>
      <DateFilter />
      <DatePicker />
    </DateContextProvider>
  );
}

export default CalendarContainer;