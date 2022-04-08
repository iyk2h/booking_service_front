import React from "react";
import AdminHeader from "./AdminHeader.jsx";
import AdminFooter from "./AdminFooter";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

function AdminMain() {
  return (
    <Container>
      <AdminHeader />
      <MainContent>
        <Outlet />
      </MainContent>
      <AdminFooter />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 0.5fr auto 1fr;
  place-items: center;
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  
`

export default AdminMain;
