import React from 'react';
import styled from 'styled-components';
import HomeButton from '../button/homeButton';
import AccountButton from '../button/accountButton';

export default function HeaderTest() {
  return (
    <HeaderBar>
      <HomeButton />
      <AccountButton />
    </HeaderBar>
  );
}

const HeaderBar = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100px;
  padding: 0px 36px;
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
  background-color: rgb(255, 255, 255);
  z-index: 10000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;