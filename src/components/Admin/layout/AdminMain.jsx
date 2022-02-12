import React from "react";
import AdminHeader from "./AdminHeader.jsx";
import AdminFooter from "./AdminFooter";
import AdminMenuCard from "./AdminMenuCard.jsx";
import styled from "styled-components";

export default function AdminMain() {
  const menuItems = [
    {
      title: "예약 관리",
      url: "/admin/booking",
    },
    {
      title: "시설 관리",
      url: "/admin/facility",
    },
    {
      title: "사용자 관리",
      url: "/admin/user",
    },
    {
      title: "내 계정",
      url: "/admin/mypage",
    },
  ];

  return (
    <div>
      <AdminHeader />
      <Main>
        {menuItems.map((x) => (
          <AdminMenuCard key={x.title} title={x.title} url={x.url} />
        ))}
      </Main>
      <AdminFooter />
    </div>
  );
}

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
`;