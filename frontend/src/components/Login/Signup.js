import React, { useState, useRef, useEffect, useReducer, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../../utils/AxiosClient";
import useForm from "../../utils/formConfig"
import Wrapper from "../Helpers/Wrapper";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import Input from "../UI/Input";
import classes from "./Login.module.css";


const firstNameReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        let ss = { value: action.val.trim(), isValid: action.val.trim().length > 3, isTouched: false }
        console.log(action)
        console.log(ss)
        return ss
    }
    if (action.type === "USER_BLUR") {
        let ss = { value: state.value.trim(), isValid: state.value.length > 3, isTouched: true }
        console.log(action)
        console.log(ss)
        return ss
    }
    // return { value: '', isValid: false }
}

const lastNameReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        let ss = { value: action.val.trim(), isValid: action.val.trim().length > 3, isTouched: false }
        console.log(action)
        console.log(ss)
        return ss
    }
    if (action.type === "USER_BLUR") {
        let ss = { value: state.value.trim(), isValid: state.value.trim().length > 3, isTouched: true }
        console.log(action)
        console.log(ss)
        return ss
    }
    // return { value: '', isValid: false }
}

const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val.trim(), isValid: action.val.trim().includes('@'), isTouched: false }
    }
    if (action.type === "USER_BLUR") {
        return { value: state.value, isValid: state.isValid, isTouched: true }
    }
    // return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val.trim(), isValid: action.val.trim().length > 5, isTouched: false }
    }
    if (action.type === "USER_BLUR") {
        return { value: state.value, isValid: state.isValid, isTouched: true }
    }
    // return { value: '', isValid: false }
}

const confirmPasswordReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        console.log(action)
        return { value: action.val.trim(), isValid: action.password === action.val.trim(), isTouched: false }
    }
    if (action.type === "USER_BLUR") {
        return { value: state.value, isValid: state.isValid, isTouched: true }
    }
    // return { value: '', isValid: false }
}

const phoneReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val.trim(), isValid: action.val.trim().length >= 10, isTouched: true }
    }
    if (action.type === "USER_BLUR") {
        return { value: state.value, isValid: state.isValid, isTouched: true }
    }
    // return { value: '', isValid: false }
}



const SignupForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);
    const [formIsTouched, setFormIsTouched] = useState(false);
    const [firstNameState, dispatchFirstName] = useReducer(firstNameReducer, { value: "", isValid: true, isTouched: false }
    )
    const [lastNameState, dispatchLastName] = useReducer(lastNameReducer,
        { value: "", isValid: true, isTouched: false }
    )
    const [emailState, dispatchEmail] = useReducer(emailReducer,
        { value: "", isValid: true, isTouched: false }
    )
    const [passwordState, dispatchPassword] = useReducer(passwordReducer,
        { value: "", isValid: true, isTouched: false }
    )
    const [confirmPasswordState, dispatchConfirmPassword] = useReducer(confirmPasswordReducer,
        { value: "", isValid: true, isTouched: false }
    )
    const [phoneState, dispatchPhone] = useReducer(phoneReducer,
        { value: "", isValid: true, isTouched: false }
    )

    const firstNameChangeHandler = (event) => {
        dispatchFirstName({ type: "USER_INPUT", val: event.target.value })
    }
    const validateFirstNameHandler = (event) => {
        setFormIsTouched(true)
        dispatchFirstName({ type: "USER_BLUR" })
    }

    const lastNameChangeHandler = (event) => {
        dispatchLastName({ type: "USER_INPUT", val: event.target.value })
    }
    // const validateLastNameHandler = (event) => {
    //     setFormIsTouched(true)
    //     dispatchLastName({ type: "USER_BLUR" })
    // }

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "USER_INPUT", val: event.target.value })
    }
    const validateEmailHandler = (event) => {
        setFormIsTouched(true)
        dispatchEmail({ type: "USER_BLUR" })
    }

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: "USER_INPUT", val: event.target.value })
    }

    const validatePasswordHandler = (event) => {
        setFormIsTouched(true)
        dispatchPassword({ type: "USER_BLUR" })
    }

    const confirmPasswordChangeHandler = (event) => {
        dispatchConfirmPassword({ type: "USER_INPUT", val: event.target.value, password: passwordState.value })
    }
    const validateConfirmPasswordHandler = (event) => {
        setFormIsTouched(true)
        dispatchConfirmPassword({ type: "USER_BLUR" })
    }

    const phoneChangeHandler = (event) => {
        dispatchPhone({ type: "USER_INPUT", val: event.target.value })
    }
    const validatePhoneHandler = (event) => {
        setFormIsTouched(true)
        dispatchPhone({ type: "USER_BLUR" })
    }

    const handleSubmit = async (event) => {
        try {
            setIsEditing(true)
            event.preventDefault();
            const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let errorMessage = '';

            await dispatchFirstName({ type: "USER_BLUR" })
            // await dispatchFirstName({ type: "USER_INPUT", val: firstNameState.value })
            await dispatchEmail({ type: "USER_INPUT", val: emailState.value })
            await dispatchPassword({ type: "USER_INPUT", val: passwordState.value })
            await dispatchConfirmPassword({ type: "USER_INPUT", val: confirmPasswordState.value, password: passwordState.value })
            await dispatchPhone({ type: "USER_INPUT", val: phoneState.value })

            if (firstNameState.value.trim().length > 3 && regExp.test(emailState.value.trim())
                && passwordState.value.trim().length > 5 && passwordState.value.trim() === confirmPasswordState.value.trim()
                && phoneState.value.trim().length >= 10) {
                console.log("Success Register")
                setFormIsValid(true)
                setFormIsTouched(true)

                const userData = {
                    firstName: firstNameState.value.trim(),
                    lastName: lastNameState.value.trim(),
                    email: emailState.value.trim(),
                    password: passwordState.value.trim(),
                    phone: phoneState.value.trim(),
                }
                console.log(userData)

                const user = await axiosClient.post('/users', userData)
                    .then((result) => {
                        setIsEditing(false)
                        console.log('result')
                        console.log(result)
                        navigate("/login");
                    }).catch((err) => {
                        console.log(err)

                    });
            } else {
                setFormIsValid(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const onErrorConfirm = () => {
        setError(null)
    }

    return (
        <Wrapper>
            {/* {error && <ErrorModal
                title={error.title}
                message={error.message}
                onConfirm={onErrorConfirm}
            />} */}
            <Card className={classes.login}>
                <h1>Register</h1>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.controls}>
                        <Input
                            id="firstName" label="First Name"
                            type="text"
                            className="input"
                            placeholder="Enter Your First Name"
                            isValid={(!firstNameState.isValid && firstNameState.isTouched) ? false : true}
                            value={firstNameState.value}
                            onChange={firstNameChangeHandler}
                            onBlur={validateFirstNameHandler}
                            error="First Name must be at least 3 characters"
                        />
                        <Input
                            id="lastName" label="Last Name"
                            type="text"
                            className="input"
                            placeholder="Enter Your Last Name"
                            isValid={(!lastNameState.isValid && lastNameState.isTouched) ? false : true}
                            value={lastNameState.value}
                            onChange={lastNameChangeHandler}
                        // onBlur={validateLastNameHandler}
                        // error="Name must be at least 3 characters"
                        />
                        <Input
                            id="email" label="Email"
                            type="email"
                            className="input"
                            placeholder="Enter Your Email"
                            isValid={emailState.isValid}
                            value={emailState.value}
                            onChange={emailChangeHandler}
                            onBlur={validateEmailHandler}
                            error="Invalid email address"
                        />
                        <Input
                            id="password" label="Password"
                            type="password"
                            className="input"
                            placeholder="Enter Your Password"
                            isValid={passwordState.isValid}
                            value={passwordState.value}
                            onChange={passwordChangeHandler}
                            onBlur={validatePasswordHandler}
                            error="Password must be at least 5 characters"
                        />
                        <Input
                            id="confirmPassword" label="Confirm Password"
                            type="password"
                            className="input"
                            placeholder="Enter Your Password"
                            isValid={confirmPasswordState.isValid}
                            value={confirmPasswordState.value}
                            onChange={confirmPasswordChangeHandler}
                            onBlur={validateConfirmPasswordHandler}
                            error="Password and confirm password do not match"
                        />
                        <Input
                            id="phone" label="Phone"
                            type="text"
                            className="input"
                            placeholder="Enter Your Phone Number"
                            isValid={phoneState.isValid}
                            value={phoneState.value}
                            onChange={phoneChangeHandler}
                            onBlur={validatePhoneHandler}
                            error="Phone Number should be 10 digit"
                        />
                        <div className={classes.action}>
                            <Button className={` ${classes.btn}`} type="submit" disabled={!formIsValid && formIsTouched}>
                                Signup
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </Wrapper>
    )
}

export default SignupForm;