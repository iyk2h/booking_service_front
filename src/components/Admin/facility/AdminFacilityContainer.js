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

  useEffect(() => {  // 안될거같음.
    if (fid === null) return;
    let target_data;
    state.data.forEach((d) => {
      if (d.fno === Number(fid)) {
        target_data = Object.keys(d).filter((d, idx) => idx !== 0).reduce((acc, curr) => {
          acc[curr] = d[curr];
          return acc;
        }, {});
        setForm(target_data);
      }
    });
  }, [fid]);

  async function deleteFacility(fno) {
    alert("정말 삭제하시겠습니까?");
    dispatch({ type: "LOADING" });
    try {
      await axios.delete(`/manage/facility/${fno}`);
      const deleted = state.data.filter((f) => f.fno !== fno);
      dispatch({ type: "DELETE", payload: deleted });
      alert("삭제가 완료되었습니다.");
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  async function editFacility(fno) {
    if (fid === null) return;
    dispatch({ type: "LOADING" });
    try {
      await axios.delete(`/manage/facility/${fno}`);
      const updated = state.data.map((f) => {
        if (f.fno === fno) {
          return form;
        }
        return f;
      });
      dispatch({ type: "UPDATE", payload: updated });
      alert("변경이 완료되었습니다..");
      reset(); // reset inputs
      setFid(null); // init Fid & exit Edit Form
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  async function createFacility() {
    dispatch({ type: "LOADING" });
    try {
      await axios.post("/manage/facility/join", form);
      dispatch({ type: "CREATE", payload: state.data.concat(form) });
      reset();
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  return (
    <ListContainer>
      <AdminFacilityList setFid={setFid} deleteFacility={deleteFacility} />
      <AdminFacilityForm
        fid={fid}
        editFacility={editFacility}
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
