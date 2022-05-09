import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styled from "styled-components";

const Loading = () => (
  <div className="loader">
    <Position>
      <RotatingLines width="50" strokeColor="black" strokeWidth="2" />
    </Position>
  </div>
);

export const TimePickerLoader = () => {
  return (
    <StTimePickerLoaderPositioner>
      <RotatingLines width="30" strokeColor="black" strokeWidth="4" />
    </StTimePickerLoaderPositioner>
  );
};

const Position = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StTimePickerLoaderPositioner = styled.div`
  position: absolute;
  left: 50%;
  top: 65%;
  transform: translate(-50%, -50%);
  z-index: 10;

`;

export default Loading;
