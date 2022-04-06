import axios from "axios";
import React, { useContext, useEffect } from "react";
import {
  fetchStateContext,
  fetchDispatchContext,
} from "../../../context/fetchContext";
import styled from "styled-components";
import AdminBookingList from "./AdminBookingList";

function AdminBookingContainer() {
  const state = useContext(fetchStateContext);
  const dispatch = useContext(fetchDispatchContext);

  useEffect(() => {
    fetchBookingList();
  }, [dispatch]);

  async function fetchBookingList() {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get("/manage/booking");
      dispatch({ type: "SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  async function deleteBooking(bno) {
    dispatch({ type: "LOADING" });
    try {
      await axios.delete(`/manage/booking/${bno}`);
      const deleted = state.data.filter(
        (booking) => booking.bno !== Number(bno)
      );
      dispatch({ type: "SUCCESS", payload: deleted });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  // function createDispatch(dispatch, promiseFn) {
  //   async function actionHandler(callback, ...rest) {
  //     dispatch({ type: "LOADING " });
  //     try {
  //       const data = await promiseFn(...rest);
  //       callback(data);// 애매
  //       dispatch({ type: "SUCCESS", payload: data && null });
  //     } catch (error) {
  //       dispatch({ type: "ERROR", payload: error });
  //     }
  //   }
  // }

  return (
    <ListContainer>
      <AdminBookingList state={state} deleteBooking={deleteBooking} />
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

export default AdminBookingContainer;
