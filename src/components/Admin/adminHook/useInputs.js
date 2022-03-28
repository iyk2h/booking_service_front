import { useReducer } from "react";

function inputReducer(state, action) {
  switch (action.type) {
    case "RESET":
      return Object.keys(state).reduce((acc, curr) => {
        acc[curr] = "";
        return acc;
      }, {});
    case "ON_CHANGE":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}

function useInputChange(initialForm) {
  const [form, dispatch] = useReducer(inputReducer, initialForm);

  function onReset() {
    dispatch({ type: "RESET" });
  }

  function onChange(e) {
    const { name, value } = e.target;
    dispatch({ type: "ON_CHANGE", payload: { name, value } });
  }

  return [onReset, onChange];
}
