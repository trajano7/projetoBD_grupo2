import { useState } from "react";

const useInput = (validateValue, placeholder="") => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setIsTouched(false);
    setEnteredValue('');
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
