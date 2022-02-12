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
  border: 1px solid;
  border-radius: 5px;
  padding: 2em;
  text-align: center;
`