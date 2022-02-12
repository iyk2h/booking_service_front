import React from 'react';
import HomeButton from '../../button/homeButton';
import styled from 'styled-components';

export default function AdminHeader() {
  return (
    <Header>
      <HomeButton url="/admin/"/>
    </Header>
  );
}

const Header = styled.header`
  position : fixed;
  top : 0;
  left : 0;
  min-width : 100vw;
  min-height : 2.5em;
  max-height : 2.5em;
  border-bottom : 1px solid
`;