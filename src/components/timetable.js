import { useState } from "react";
import { Reserve } from "./reserve";
import "./timetable.css";

function TimeTable(props) {
  const [userTime, setUserTime] = useState([]);

  const inputTmp = (tmp) => {
    return `${tmp}:00`;
  };

  const maxHour = 3;

  let reservation_status = [];
  for (let i = 8; i < 20; i++) {
    const booking_time = i < 10 ? `0${i}:00` : `${i}:00`;
    //const validation = (props.userSelect.date.split("-")[1] <= new Date().getMonth && i < (new Date()).getHours()) ? "expire" : null
    const className = props.reservedTime.length !== 0 && props.reservedTime.indexOf(booking_time) !== -1 ? "reserved" : "can_reserve";
    const clicked = userTime.length !== 0 && userTime.indexOf(booking_time) !== -1 ? "clicked" : null;
    // let ableClick = null;
    // if (userTime.length && userTime.length < maxHour) {
    //   let tmp = Number(userTime[userTime.length - 1].split(":")[0]);
    //   ableClick = tmp < i && i <= tmp + maxHour - userTime.length ? "ableClick" : null;
    // }
    let ableClick = null;
    if (userTime.length === 1) {
      let tmp = Number(userTime[0].split(":")[0]);
      if (tmp + maxHour - 1 < i) {
        ableClick = null;
      } else if (tmp < i) {
        ableClick = "ableClick";
      } 
    }
    reservation_status.push(
      <div className={[className, clicked, ableClick].join(" ")} key={i}>
        {booking_time}
      </div>
    );
  }

  // const handleTimeClick = e => {
  //   const timeClass = e.target.className;
  //   if(timeClass.includes('can_reserve') && !timeClass.includes('expire')) {
  //     let tmp = e.target.textContent.split(":")[0];
  //     if(userTime.indexOf(inputTmp(tmp)) !== -1) {
  //       const cancle = userTime.filter(time => time !== inputTmp(tmp));
  //       setUserTime(cancle);
  //       return;
  //     }
  //     if(userTime.length) {
  //       const diff = userTime[userTime.length - 1].split(":")[0] - tmp;
  //       if(Math.abs(diff) > 1) {
  //         alert("연속된 시간을 선택해 주세요");
  //         return;
  //       }
  //     }
  //     if(userTime.length === maxHour) {
  //       alert(`최대 ${maxHour}시간 이용 가능합니다!`);
  //       return;
  //     }
  //     setUserTime(userTime.concat([inputTmp(tmp)]));
  //   }
  // }
  const handleTimeClick = (e) => {
    const timeClass = e.target.className;
    if (timeClass.includes("can_reserve") && !timeClass.includes("expire")) {
      let tmp = e.target.textContent.split(":")[0];
      if (userTime.length === maxHour || userTime.length === 2) {
        setUserTime([inputTmp(tmp)]);
        return;
      }
      if (userTime.length >= 1 && userTime.length <= maxHour) {
        const diff = userTime[0].split(":")[0] - tmp;
        if (diff === 0) {
          setUserTime([]);
          return;
        } else if (diff > 0) {
          setUserTime([inputTmp(tmp)]);
          return;
        } else if (Math.abs(diff) > maxHour - 1) {
          alert(`최대 사용 시간은  ${maxHour} 입니다.`);
          setUserTime([]);
          return;
        } else {
          const arr = [];
          let init = Number(userTime[0].split(":")[0]);
          for (let i = init; i <= tmp; i++) {
            i = i < 10 ? `0${i}` : i;
            arr.push(inputTmp(i));
          }
          setUserTime(arr);
          return;
        }
      }
      setUserTime([inputTmp(tmp)]); //if(userTime.length === 0 )
    }
  };
  return (
    <div className="test" onClick={handleTimeClick}>
      {reservation_status}
      <Reserve userSelect={props.userSelect} time={userTime} />
    </div>
  );
}

export { TimeTable };
