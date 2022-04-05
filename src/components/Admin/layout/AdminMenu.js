import React from 'react';
import styled from "styled-components";
import AdminMenuCard from "./AdminMenuCard.jsx";

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
      url: "/admin/manage",
    },
    {
      title: "내 계정",
      url: "/admin/mypage",
    },
  ];

function AdminMenu() {
  return (
      <Menu>
        {menuItems.map((x) => (
          <AdminMenuCard key={x.title} title={x.title} url={x.url} />
        ))}
      </Menu>
  );
}

const Menu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
`;


export default AdminMenu;