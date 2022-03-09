import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function AdminLogin() {
  const navigate = useNavigate();
  const aid = useRef('');
  const pw = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      aid : aid.current.value,
      pw : pw.current.value
    }
    requestAdminLogin(data);
  }

  async function requestAdminLogin(data) {
    try {
      const response = await axios.post('/admin/login', data);
      if(response.status === 201) {
        return navigate("/admin/main", { replace : true });
      }
    } catch (err) {
      if(err.response.status === 404) {
        alert("입력을 확인해 주세요.");
        reset();
      }
    }
  }
  
  function reset() {
    aid.current.value = '';
    pw.current.value = '';
  }
  
  return (
    <FORM onSubmit={handleSubmit}>
      <input name="aid" ref={aid} placeholder="id" />
      <input type="password" name="setPw" ref={pw} placeholder="pw" />
      <button>login</button>
    </FORM>
  );
}

const FORM = styled.form`
  display: flex;
  flex-direction: column;
`;