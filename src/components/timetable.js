import "./timetable.css"

function TimeTable(props) {
  let reservation_status = [];
  for(let i=8; i<20; i++) {
    const booking_time = i < 10 ? `0${i}:00` : `${i}:00`;
    const className = props.reservedTime.indexOf(booking_time) !== -1 ? "reserved" : "can_reserve";
    const clicked = props.userTime.length !== 0 && props.userTime.indexOf(booking_time) !== -1 ? "clicked" : null;
    reservation_status.push(
      <div
        className={[className, clicked].join(" ")}
        key={i}>{booking_time}
      </div>
    ) 
  }

  return (
    <div className="test" onClick={props.onClick}>
      {reservation_status}  
    </div>
  ); 
}

export { TimeTable };

