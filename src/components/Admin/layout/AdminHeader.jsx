import React from "react";
import HomeButton from "../../button/homeButton";
import styled from "styled-components";

export default function AdminHeader() {
  return (
    <Header>
      <HomeButton url="/admin/main" />
      <Test>test</Test>
    </Header>
  );
}

const Header = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  padding: 0px 36px;
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
  background-color: rgb(255, 255, 255);
  z-index: 10000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Test = styled.button`
  margin-right: 0.5em;
`;
