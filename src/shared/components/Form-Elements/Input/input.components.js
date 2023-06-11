import React, { useReducer, useEffect } from "react";

import { validate } from "../../../utils/validators";
import "./input.styles.css";

// Reducer
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = ({
  id,
  label,
  placeholder,
  rows,
  type,
  element,
  errorText,
  validators,
  onInput,
  initialValue,
  initialValid,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || "",
    isTouched: false,
    isValid: initialValid || false,
  });

  const { value, isValid } = inputState;

  // input re-renders if any of the dependencies change - used for validators
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const main =
    element === "input" ? (
      <input
        onChange={changeHandler}
        onBlur={touchHandler}
        id={id}
        type={type}
        placeholder={placeholder}
        value={inputState.value}
      />
    ) : (
      <textarea
        onChange={changeHandler}
        onBlur={touchHandler}
        id={id}
        rows={rows || 3}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {main}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
