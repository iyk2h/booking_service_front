import React from 'react';
import { Link } from 'react-router-dom';
import "./find.css";

// 변경하기 버튼
export default function Find() {
  return (
    <>
      <Link to="/" className='find'>비밀번호를 잊으셨나요?</Link> 
    </>
  );
}