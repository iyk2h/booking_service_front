import { DateContextProvider } from "../../context/dateContext";
import DateFilter from "./DateFilter";
import DatePicker from "./DatePicker";

function CalendarContainer() {  
  return (
    <DateContextProvider>
      <DateFilter />
      <DatePicker/>
    </DateContextProvider>
  );
}

export default CalendarContainer;
