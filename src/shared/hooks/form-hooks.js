import { useCallback, useReducer } from "react";

// REDUCER FOR STATE CHANGES
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.input) {
        if (!state.input[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.input[inputId].isValid;
        }
      }
      return {
        ...state,
        input: {
          ...state.input,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        input: action.input,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  // Reducer for state for validation - usereducer gives back a dispatch to dispatch actions and rerender a component
  const [formState, dispatch] = useReducer(formReducer, {
    input: initialInputs,
    isValid: initialFormValidity,
  });

  const InputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  // after is used after db has fetched data - specifically for update page
  // this will be used to preload data into the form, because fetching from db is async
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      input: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, InputHandler, setFormData];
};
