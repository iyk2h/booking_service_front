import React, { useState, useEffect, useReducer } from "react";
import AdminManageUser from "./AdminManageUser";
import Loading from "../../modal/loading";
import styled from "styled-components";
import axios from "axios";

function userSearchReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        user: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        user: action.payload,
        erorr: null,
      };
    case "ERROR":
      return {
        loading: false,
        user: null,
        erorr: action.payload,
      };
    default:
      throw new Error(`Unable Action.Type : ${action.type}`);
  }
}

function AdminManageSearchResult({ searchId, deleteUser }) {
  const [state, dispatch] = useReducer(userSearchReducer, {
    loading: false,
    user: null,
    error: null,
  });

  const { loading, user, error } = state;

  useEffect(() => {
    if (!searchId) return;
    async function getUser() {
      dispatch({ type: "LOADING" });
      try {
        const response = await axios.get(`/manage/students/${searchId}`);
        dispatch({ type: "SUCCESS", payload: response.data});
      } catch (error) {}
    }
    getUser();
  }, [searchId]);

  if (loading) return <Loading />;
  if (error) return <h1>에러 발생!</h1>;
  if (!user) return null;

  // 컴포넌트를 따로 만들어서 전체 목록중에 유저가 삭제되도 그대로 남아있을거같음.
  // -> container의 deleteUser함수 마지막에 searchId를 null로 바꿔서 테스트 해보기
  return (
    <searchedUser>
      <AdminManageUser user={user} deleteUser={deleteUser} />
    </searchedUser>
  );
}

const searchedUser = styled.div`
  border-top: 1px solid;
  margin-bottom: 0.5rem;
`
export default AdminManageSearchResult;
