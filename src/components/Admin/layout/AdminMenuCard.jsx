import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function AdminMenuCard({ title, url }) {
  return (
    <>
      <Wrapper>
        <Link to={url}>{title}</Link>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  &:hover {
    transform: scale(1.05);
    transition: 0.3s;
  }
  transition: 0.3s;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 2em;
  text-align: center;
`