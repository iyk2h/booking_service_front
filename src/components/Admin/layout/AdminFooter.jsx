import React from 'react';
import styled from 'styled-components';

function AdminFooter() {
  return (
    <Wrapper>
      footer입니다.
    </Wrapper>
  );
}

export default AdminFooter;

const Wrapper = styled.footer`
  border-top : 1px solid silver;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 70px;
  padding: 0px 36px;
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
  background-color: rgb(255, 255, 255);
  z-index: 10000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
