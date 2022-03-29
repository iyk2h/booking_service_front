import { useReducer } from 'react';
import React from 'react';

const initialFetchState = {
  loading: false,
  data: null,
  error: null
}

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
  switch (action.type) {
    case "LOADING":
      return loadingState;
    case "ERROR":
      return error(action.payload);
    case "CREATE":
      return success(state.data.concat(action.payload));
    case "READ":
      return success(action.payload);
    case "DELETE":
      return success(action.payload);
    case "UPDATE":
      return success(state.data.map((d) => {
        if (d.fno === action.paylod.id) {
          return action.payload.facility;
        } else {
          return d;
        }
      }));
    default:
      throw new Error(`Unable Action Type : ${action.type}`);
  }
}

export const fetchStateContext = React.createContext(null);
export const fetchDispatchContext = React.createContext(null);

export function FetchContextProvider({ children }) {
  const [state, dispatch] = useReducer(fetchReducer, initialFetchState);
  return (
    <fetchStateContext.Provider value={state}>
      <fetchDispatchContext.Provider value={dispatch}>
        {children}
      </fetchDispatchContext.Provider>
    </fetchStateContext.Provider>
  );
}