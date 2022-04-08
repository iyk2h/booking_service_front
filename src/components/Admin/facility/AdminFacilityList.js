import React, { useEffect, useContext } from "react";
import {
  fetchStateContext,
  fetchDispatchContext,
} from "../../../context/fetchContext";
import styled from "styled-components";
import AdminFacilityItem from "./AdminFacilityItem";
import Loading from "../../modal/loading";
import { getFacility } from '../adminApi';

const rows = [
  { title: "no" },
  { title: "이름" },
  { title: "최대 시간" },
  { title: "위치" },
  { title: "url" },
];

export default function AdminFacilityList({ setFid, deleteFacility }) {
  const state = useContext(fetchStateContext);
  const dispatch = useContext(fetchDispatchContext);

  const { loading, data: facilities, error } = state;

  useEffect(() => {
    getFacilities();
  }, [dispatch]);

  async function getFacilities() {
    dispatch({ type: "LOADING" });
    try {
      const data = await getFacility();
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  if (loading) return <Loading />;
  if (error) return <h1>에러 발생!</h1>;
  if (!facilities) return null;

  return (
    <UL>
      <Title>
        {rows.map((row) => (
          <Row key={row.title}>{row.title}</Row>
        ))}
      </Title>
      {facilities.map((f) => (
        <AdminFacilityItem
          key={f.fno}
          facility={f}
          setFid={setFid}
          deleteFacility={deleteFacility}
        />
      ))}
    </UL>
  );
}

const UL = styled.ul`
  overflow: auto;
`;

const Title = styled.li`
  display: flex;
`;

const Row = styled.div`
  margin: 0 0.7rem;
  font-weight: bold;
`;
