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
  position: fixed;
  bottom: 0;
  left : 0;
  width : 100vw;
  height : 5em;
  border-top : 1px solid;
`;
