import React from "react";

function AdminManageInput({ handleSubmit, form, onChange }) {
  const { sid } = form;

  return (
    <form onSubmit={() => handleSubmit(sid)}>
      <input value={sid} placeholder="학번 입력" onChange={onChange} />
      <button>검색</button>
    </form> 
  );
}

export default AdminManageInput;
