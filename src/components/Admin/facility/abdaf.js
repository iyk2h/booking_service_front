import React, { useReducer } from "react";

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

const success = (data) => ({
  loading: false,
  data,
  error: null,
});

const error = (error) => ({
  loading: false,
  data: null,
  error,
});

function fetchReducer(state, action) {
  let new_data;
  switch (action.type) {
    case "LOADING":
      return loadingState;
    case "ERROR":
      return error(action.payload);
    case "CREATE":
      new_data = state.data.concat(action.payload);
      return success(new_data);
    case "DELETE":
      new_data = state.data.filter((d) => d.fno !== action.payload);
      return success(new_data);
    case "UPDATE":
      new_data = state.data.map((d) => {
        if (d.fno === action.paylod.id) {
          return action.payload.facility;
        } else {
          return d;
        }
      });
      return success(new_data);
    default:
      throw new Error(`Unable Action Type : ${action.type}`);
  }
}
