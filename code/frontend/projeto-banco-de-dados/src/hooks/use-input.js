import { useState } from "react";

const useInput = (validateValue, initialValue="") => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    // setIsTouched(false);
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setIsTouched(false);
    setEnteredValue(initialValue);
  }

  return {
    value: enteredValue,
    hasError: hasError,
    isValid: valueIsValid,
    valueChangeHandler: valueChangeHandler,
    valueBlurHandler: valueBlurHandler,
    resetInput: resetInput
  };
};

export default useInput;
