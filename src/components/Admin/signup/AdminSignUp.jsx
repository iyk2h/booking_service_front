import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function AdminSignup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    aid : '',
    email: '',
    name: '',
    phone: '',
    pw: ''
  })

  const { aid, email, name, phone, pw } = inputs;

  async function handleSubmit(e) {
    e.preventDefault();
    if(!checkDuplicate({ aid, pw })) {
      return alert('존재하는 계정 입니다.');
    }
    try {
      const data = { aid, email, name, phone, pw };
      const response = await axios.post('/admin/singup', data);
      if(response.status === 201) {
        alert('가입 완료');
        navigate("/admin/login", { replace : true })
      }
    } catch (error) {}
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name] : value
    })
  }

  async function checkDuplicate(data) {
    try {
      const response = await axios.post('/admin/check' , data);
      if(response.status === 201) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  return (
    <FORM onSubmit={e => handleSubmit(e)}>
      <input value={aid} name="aid" onChange={e => handleChange(e)} placeholder="ID" />
      <input value={email} name="email" placeholder="Email" onChange={e => handleChange(e)} />
      <input value={name} name="name" placeholder="Name" onChange={e => handleChange(e)} />
      <input value={phone} name="phone" placeholder="Phone" onChange={e => handleChange(e)} />
      <input value={pw} name="pw" placeholder="Pw" onChange={e => handleChange(e)} />
      <button type="submit">회원가입</button>
    </FORM>
  );
}

const FORM = styled.form`
  display: flex;
  flex-direction: column;
`;