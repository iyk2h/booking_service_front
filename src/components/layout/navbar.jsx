import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function NavBar({ itemList }) {
  return (
    <Nav>
      {itemList.map((x) => {
        return (
          <NavLink
            key={x.title}
            to={x.url}
            style={{ display: "block", margin: "1rem 0" }}
            className={({ isActive }) => (isActive ? "isActive" : null)}
          >
            {x.title}
          </NavLink>
        );
      })}
    </Nav>
  );
}

const Nav = styled.nav`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-right: 1px solid whitesmoke;
  max-width: 130px;
  min-width: 130px;
`;