import { DateContextProvider } from "../../context/dateContext";
import { useParams } from 'react-router-dom';
import DateFilter from "./DateFilter";
import DatePicker from "./DatePicker";

// async function handleClick(e) {
//   if (e.target.className.includes("__")) return;
//   try {

//   } catch (err) {

//   }
// }

function CalendarContainer() {  
  const urlParams = useParams();

  return (
    <DateContextProvider>
      <DateFilter />
      <DatePicker/>
    </DateContextProvider>
  );
}

export default CalendarContainer;
