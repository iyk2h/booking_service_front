import React, { useEffect, useContext } from "react";
import {
  fetchStateContext,
  fetchDispatchContext,
} from "../../../context/fetchContext";
import styled from "styled-components";
import Loading from "../../modal/loading";
import axios from "axios";

const rows = [{ row: "no" }, { row: "이름" }, { row: "위치" }, { row: "url" }];

async function deleteFacility(fno, dispatch) {
  dispatch({ type: "LOADING" });
  try {
    axios.delete(`​/manage​/facility​/${fno}`);
    dispatch({ type: "DELETE", payload: fno });
    alert('시설이 삭제 되었습니다.');
  } catch (error) {
    dispatch({ type: "ERROR", payload: error });
  }
}

export default function AdminFacilityList({ setFid }) {
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
      {facilities.map((f) => (
        <AdminFacilityItem key={f.fno} facility={f} setFid={setFid} dispatch={dispatch} />
      ))}
    </ul>
  );
}

function AdminFacilityItem({ facility, setFid, dispatch }) {
  return (
    <ListItem onClick={() => setFid(facility.fno)}>
      <ListData>{facility.fno}</ListData>
      <ListData>{facility.name}</ListData>
      <ListData>{facility.maxHour}</ListData>
      <ListData>{facility.place}</ListData>
      <ListData>{facility.placeUrl}</ListData>
      <button onClick={null}>수정</button>
      <button
        onClick={() => deleteFacility(facility.fno, dispatch)}
      >
        삭제
      </button>
    </ListItem>
  );
}

const ListItem = styled.li`
  display: flex;
`;

const ListData = styled.div`
  margin: 0 0.7rem;
`;
