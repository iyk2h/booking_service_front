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
    case "SET_FORM":
      return action.payload;
    default:
      return state;
  }
}

export default function useInputChange(initialForm) {
  const [form, dispatch] = useReducer(inputReducer, initialForm);

  function onReset(e) {
    e.preventDefault();
    dispatch({ type: "RESET" });
  }

  function onChange(e) {
    const { name, value } = e.target;
    dispatch({ type: "ON_CHANGE", payload: { name, value } });
  }

  function setForm(values) {
    dispatch({ type: "SET_FORM", payload: values });
  }

  return [form, onReset, onChange, setForm];
}
