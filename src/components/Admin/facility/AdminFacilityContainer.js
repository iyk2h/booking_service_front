import React, { useState, useContext, useEffect } from "react";
import AdminFacilityList from "./AdminFacilityList";
import AdminFacilityForm from "./AdminFacilityForm";
import useInputChange from "../../hook/useInputs";
import {
  fetchStateContext,
  fetchDispatchContext,
} from "../../../context/fetchContext";
import styled from "styled-components";
import { postFacility, removeFacility, putFacility } from '../adminApi';

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

  useEffect(() => {
    if (!fid) return;
    const target_data = setEditFormData(state.data, fid);
    setForm(target_data);
  }, [fid]);

  async function createFacility() {
    alertForConfirm("등록하시겠습니까?")
    dispatch({ type: "LOADING" });
    try {
      await postFacility(form);
      dispatch({
        type: "SUCCESS",
        payload: addNewFacilityAtList(state.data, form),
      });
      alert('등록이 완료되었습니다.')
      reset();
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  async function deleteFacility(fno) {
    alertForConfirm("정말 삭제하시겠습니까?")
    dispatch({ type: "LOADING" });
    try {
      await removeFacility(fno);
      dispatch({
        type: "SUCCESS",
        payload: deleteFacilityAtList(state.data, fno),
      });
      alert("삭제가 완료되었습니다.");
      reset();
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  async function editFacility(fno) {
    if (!fno) return;
    alertForConfirm("변경 하시겠습니까?")
    dispatch({ type: "LOADING" });
    try {
      await putFacility(fno, form);
      dispatch({
        type: "SUCCESS",
        payload: editFacilityAtList(state.data, fno, form),
      });
      alert("변경이 완료되었습니다..");
      reset(); 
      setFid(null); 
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
        onChange={onChange}
        form={form}
        reset={reset}
        fid={fid}
      />
    </ListContainer>
  );
}

function addNewFacilityAtList(arr, form) {
  const newValue = {
    fno: arr[arr.length - 1].fno + 1,
    ...form,
  };
  return arr.concat(newValue);
}

function deleteFacilityAtList(arr, index) {
  return arr.filter((f) => f.fno !== index);
}

function editFacilityAtList(arr, index, form) {
  return arr.map((facility) => {
    if (facility.fno === index) {
      return { fno: index, ...form };
    }
    return facility;
  });
}

function setEditFormData(arr, fid) {
  let target_data;
  arr.forEach((d) => {
    if (d.fno === Number(fid)) {
      target_data = Object.keys(d)
        .filter((d, idx) => idx !== 0)
        .reduce((acc, curr) => {
          acc[curr] = d[curr];
          return acc;
        }, {});
    }
  });
  return target_data;
}

function alertForConfirm(msg) {
  if (!window.confirm(msg)) return;
}

const ListContainer = styled.div`
  margin: 0 auto;
  width: 90vw;
  height: 65vh;
  padding: 1rem;
  border: 1px solid;
  border-radius: 3px;
`;

export default AdminFacilityContainer;
