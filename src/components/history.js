import React from 'react';

function History(props) {
  const booking_list = props.list.map((x, idx) => {
    const place = getPlace(props.list.fno);
    const time = props.list.startTime;
    return <div key={idx}>{place} , {time}</div>
  })

  const getPlace = fno => {
    switch (fno) {
      case "1":
        return "족구장";
      case "2":
        return "풋살장";
      case "3":
        return "테니스장";
      case "4":
        return "대운동장";
      default:
        return;
    }  
  }

  return(
    <div>
      <ul>{booking_list}</ul>
    </div>
  );
}

export { History }