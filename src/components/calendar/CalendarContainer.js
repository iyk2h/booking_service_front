import { DateContextProvider } from "../../context/dateContext";
import DateFilter from "./DateFilter";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

function CalendarContainer() {  
  return (
    <DateContextProvider>
      <DateFilter />
      <DatePicker/>
      <TimePicker />
    </DateContextProvider>
  );
}

export default CalendarContainer;
