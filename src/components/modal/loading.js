import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styled from 'styled-components';

const Loading = () => (
  <div className="loader">
    <Position>
    <RotatingLines
      width="50"
      strokeColor="black"
      strokeWidth="2"
    />
    </Position>
  </div>
);

const Position = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export default Loading;
