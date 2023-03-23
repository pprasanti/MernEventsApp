import { useReducer } from "react";

const initialInputState = {
    value: "",
    isTouched: false
}

const inputStateReducer = (state, action) => {
    if (action.type === "INPUT") {
        return { value: action.val.trim(), isTouched: state.isTouched }
    }
    if (action.type === "BLUR") {
        return { value: state.value, isTouched: true }
    }
    if (action.type === "RESET") {
        return { value: '', isTouched: false }
    }
    return initialInputState;
}

const useInput = (validateValue = false) => {
    const [inputState, dispatchInput] = useReducer(
        inputStateReducer, initialInputState
    )

    const valueIsValid = validateValue && validateValue(inputState.value)
    const hasError = !valueIsValid && inputState.isTouched

    const inputChangeHandler = (event) => {
        dispatchInput({ type: "INPUT", val: event.target.value })
    }
    const inputBlurHandler = (event) => {
        dispatchInput({ type: "BLUR" })
    }

    const reset = () => {
        dispatchInput({ type: "RESET" })
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput;