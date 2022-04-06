import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    <LoadingContainer>
      <h2>로딩중...</h2>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
`;

export default Loading;
