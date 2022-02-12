import React from 'react';
import styled from 'styled-components';

export default function AdminFooter() {
  return (
    <Wrapper>
      footer입니다.
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left : 0;
  width : 100vw;
  height : 5em;
  border-top : 1px solid;
`;
