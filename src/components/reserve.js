import React from 'react';
import axios from "axios";

function Reserve(props) {
  const handleResrve = () => {
    console.log(props);
    // const url = `/${props.fno}/${}`
    // axios.post()
  }
  return (
    <div>
      <button onClick={handleResrve}>예약하기</button>
    </div>  
  );
}

export { Reserve }