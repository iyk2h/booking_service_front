import React from "react";
import axios from "axios";
// import "./cancel.css";

export default function Cancel(props) {
  const handleCancel = async () => {
    try {
      const url = `/students/booking/${props.bno}`;
      const response = await axios.delete(url);
      if (response.status === 204) {
        alert("예약이 취소되었습니다.");
        const new_list = props.list.filter((item) => item.bno !== props.bno);
        props.setList(new_list);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={handleCancel} className="cancel_btn">
        취소
      </button>
    </>
  );
}
