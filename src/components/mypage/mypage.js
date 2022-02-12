import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../layout/header";
import Loading from "../modal/loading";
import "./mypage.css";
import styled from "styled-components";

export default function Mypage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // 내 예약목록은 굳이 들어갈때마다 요청할 필요가 없음.
  // 여기서 예약 목록을 state로 관리해서 자식 컴포넌트한테 props로 주면
  // 들어갈때마다 요청하지 않아도 될듯
  useEffect(() => {
    axios
      .get("/check")
      .then((response) => response.status === 200 && setLoading(false))
      .catch((err) => err.response.status === 401 && navigate("/login"));
  });

  const navItems = [
    {
      title: "예약 내역",
      url: "history",
    },
    {
      title: "개인정보 변경",
      url: "profile",
    },
    {
      title: "비밀번호 변경",
      url: "password",
    },
  ];

  return (
    <Wrapper>
      <Header />
      <Nav>
        {navItems.map((x) => {
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
      <div className="outlet">{loading ? <Loading /> : <Outlet />}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 99vw;
  max-width: 600px;
  height: calc(100vh - 50px);
  margin-top: 40px;
  display: flex;
`;

const Nav = styled.nav`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-right: 1px solid whitesmoke;
  max-width: 130px;
  min-width: 130px;
`;
