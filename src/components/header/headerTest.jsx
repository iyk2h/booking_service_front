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
  position : fixed;
  top : 0;
  left : 0;
  min-width : 100vw;
  min-height : 2.5em;
  max-height : 2.5em;
  border-bottom : 1px solid
`;