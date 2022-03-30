import React, { useEffect, useContext } from "react";
import {
  fetchStateContext,
  fetchDispatchContext,
} from "../../../context/fetchContext";
import styled from "styled-components";
import AdminFacilityItem from "./AdminFacilityItem";
import Loading from "../../modal/loading";
import axios from "axios";

const rows = [{ title: "no" }, { title: "이름" }, { title: "최대 시간" }, { title: "위치" }, { title: "url" }];

export default function AdminFacilityList({ setFid, deleteFacility }) {
  const state = useContext(fetchStateContext);
  const dispatch = useContext(fetchDispatchContext);

  const { loading, data: facilities, error } = state;

  useEffect(() => {
    async function getFacilities() {
      dispatch({ type: "LOADING" });
      try {
        const response = await axios.get("/manage/facility");
        dispatch({ type: "READ", payload: response.data });
      } catch (error) {
        dispatch({ type: "ERROR", payload: error });
      }
    }
    getFacilities();
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <h1>에러 발생!</h1>;
  if (!facilities) return null;

  return (
    <ul>
      <Title>{rows.map(row => <Row key={row.title}>{row.title}</Row>)}</Title>
      {facilities.map((f) => (
        <AdminFacilityItem
          key={f.fno}
          facility={f}
          setFid={setFid}
          deleteFacility={deleteFacility}
        />
      ))}
    </ul>
  );
}

const Title = styled.li`
  display: flex;
`;

const Row = styled.div`
  margin: 0 0.7rem;
  font-weight: bold;
`;