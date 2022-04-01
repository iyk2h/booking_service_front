import React, { useState, useContext, useEffect } from "react";
import AdminFacilityList from "./AdminFacilityList";
import AdminFacilityForm from "./AdminFacilityForm";
import useInputChange from "../../hook/useInputs";
import {
  fetchStateContext,
  fetchDispatchContext,
} from "../../../context/fetchContext";
import styled from "styled-components";
import axios from "axios";

function AdminFacilityContainer() {
  const state = useContext(fetchStateContext);
  const dispatch = useContext(fetchDispatchContext);
  const [fid, setFid] = useState(null);
  const [form, reset, onChange, setForm] = useInputChange({
    maxHour: "",
    name: "",
    place: "",
    placeUrl: "",
  });

  // 수정 버튼 클릭시, 입력창에 해당 데이터 
  useEffect(() => {
    if (!fid) return;
    let target_data;
    state.data.forEach((d) => {
      if (d.fno === Number(fid)) {
        target_data = Object.keys(d)
          .filter((d, idx) => idx !== 0)
          .reduce((acc, curr) => {
            acc[curr] = d[curr];
            return acc;
          }, {});
        setForm(target_data);
      }
    });
  }, [fid]);

  async function createFacility() {
    dispatch({ type: "LOADING" });
    try {
      await axios.post("/manage/facility/join", form);
      dispatch({
        type: "SUCCESS",
        payload: state.data.concat({
          fno: state.data[state.data.length - 1].fno + 1,
          ...form,
        }),
      });
      reset();
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  async function deleteFacility(fno) {
    alert("정말 삭제하시겠습니까?");
    dispatch({ type: "LOADING" });
    try {
      await axios.delete(`/manage/facility/${fno}`);
      const deleted = state.data.filter((f) => f.fno !== fno);
      dispatch({ type: "SUCCESS", payload: deleted });
      alert("삭제가 완료되었습니다.");
      reset();
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  async function editFacility(fno) {
    if (!fno) return;
    setFid(null);
    dispatch({ type: "LOADING" });
    try {
      await axios.put(`/manage/facility/${fno}`, form);
      const updated = state.data.map((facility) => {
        if (facility.fno === fno) {
          return { fno, ...form };
        }
        return facility;
      });
      dispatch({ type: "SUCCESS", payload: updated });
      alert("변경이 완료되었습니다..");
      reset(); // reset inputs
      setFid(null); // init Fid
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (fid) {
      await editFacility(fid);
    } else {
      await createFacility();
    }
  }

  return (
    <ListContainer>
      <AdminFacilityList setFid={setFid} deleteFacility={deleteFacility} />
      <AdminFacilityForm
        handleSubmit={handleSubmit}
        form={form}
        onChange={onChange}
        reset={reset}
      />
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 90vw;
  height: 90vh;
  padding: 1rem;
  border: 1px solid;
  border-radius: 3px;
`;

export default AdminFacilityContainer;
