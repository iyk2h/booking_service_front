import React, { useState, useContext, useEffect } from "react";
import {
  fetchStateContext,
  fetchDispatchContext,
} from "../../../context/fetchContext";
import AdminManageInput from "./AdminManageInput";
import AdminManageUserList from "./AdminManageUserList";
import AdminManageUser from "./AdminManageUser";
import AdminManageSearchResult from "./AdminManageSearchResult";
import useInputChange from "../../hook/useInputs";
import styled from "styled-components";
import axios from "axios";

function AdminManageContainer() {
  const state = useContext(fetchStateContext);
  const dispatch = useContext(fetchDispatchContext);
  const [searchId, setSearchId] = useState(null);
  const [form, reset, onChange, setForm] = useInputChange({ sid: "" });

  useEffect(() => {
    async function getUsers() {
      dispatch({ type: "LOADING" });
      try {
        const response = await axios.get(`/manage/students`);
        dispatch({ type: "SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "ERROR", paylod: error });
      }
    }
    getUsers();
  }, [form, dispatch]);

  async function deleteUser(sid) {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    dispatch({ type: "LOADING" });
    try {
      await axios.delete(`/manage/students/${sid}`);
      dispatch({
        type: "SUCCESS",
        payload: state.data.filter((user) => user.sid !== sid),
      });
      // setSearchId(null);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  function handleSubmit(e, sid) {
    e.preventDefault();
    setSearchId(sid);
    reset();
  }

  return (
    <div>
      <AdminManageUserList state={state} deleteUser={deleteUser} />
      <AdminManageInput
        handleSubmit={handleSubmit}
        form={form}
        onChange={onChange}
      />
      <AdminManageSearchResult searchId={searchId} deleteUser={deleteUser} />
    </div>
  );
}

export default AdminManageContainer;
