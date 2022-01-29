import React from 'react';

export default function Profile() {
  const phone = "010-1111-2222";

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>연락처 <input type="phone" placeholder={phone}/></label>
        <button className='confirm_btn'>연락처 변경</button>
      </form>
    </div>
  );
}