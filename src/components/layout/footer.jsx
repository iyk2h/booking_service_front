import React from "react";
import styled from "styled-components";

export default function Footer() {
  return <Wrap>© 목대컴공</Wrap>;
}

const Wrap = styled.div`
  position: fixed;
  bottom: 0;
  padding: 1em;
`;
