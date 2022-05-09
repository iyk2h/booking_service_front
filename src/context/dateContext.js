import React, { useReducer, useContext } from "react";

const initialDate = new Date();

const initialDateState = {
  viewYear: initialDate.getFullYear(),
  viewMonth: initialDate.getMonth() + 1,
  viewDate: initialDate.getDate(),
  reservedTime: [],
};

function dateReducer(state, action) {
  switch (action.type) {
    case "PREV":
      return {
        ...state,
        viewYear: state.viewMonth === 1 ? state.viewYear - 1 : state.viewYear,
        viewMonth: state.viewMonth === 1 ? 12 : state.viewMonth - 1,
        viewDate: null,
      };
    case "NEXT":
      return {
        ...state,
        viewYear: state.viewMonth === 12 ? state.viewYear + 1 : state.viewYear,
        viewMonth: state.viewMonth === 12 ? 1 : state.viewMonth + 1,
        viewDate: null,
      };
    case "PICK":
      return {
        ...state,
        viewDate: action.payload,
      };
    case "SET_TIME":
      return {
        ...state,
        reservedTime: action.payload,
      };
    case "LOADING":
      return {
        ...state,
        reservedTime: null,
      }
    default:
      return state;
  }
}

export const dateStateContext = React.createContext(null);
export const dateDispatchContext = React.createContext(null);

export function DateContextProvider({ children }) {
  const [state, dispatch] = useReducer(dateReducer, initialDateState);

  return (
    <dateStateContext.Provider value={state}>
      <dateDispatchContext.Provider value={dispatch}>
        {children}
      </dateDispatchContext.Provider>
    </dateStateContext.Provider>
  );
}

export function useDateState() {
  const context = useContext(dateStateContext);
  if (context === undefined) {
    throw new Error("useDate must be used within a DateContextProvider");
  }
  return context;
}

export function useDateDispatch() {
  const dispatch = useContext(dateDispatchContext);
  if (!dispatch) {
    throw new Error(
      "useDateDispatch must be used within a DateContextProvider"
    );
  }
  return dispatch;
}
