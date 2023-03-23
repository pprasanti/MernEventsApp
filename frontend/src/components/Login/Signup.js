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
import useInput from "../../hooks/use-input";


const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isNotEmpty = (value) => value.trim() !== '';
const isValidFirstName = (value) => isNotEmpty && value.trim().length >= 3;
const isValidPassword = (value) => isNotEmpty && value.trim().length >= 5;
const isValidConfirmationPassword = (value) => isNotEmpty;
const isValidPhone = (value) => isNotEmpty && value.trim().length >= 10;
const isValidLength = (value, n) => value.trim().length >= n;
const isEmail = (value) => value.includes('@') && emailRegExp.test(value.trim());


const SignupForm = () => {
    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        inputChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName,
    } = useInput(isValidFirstName);
    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        inputChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastName,
    } = useInput();
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
    } = useInput(isEmail);
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        inputChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword,
    } = useInput(isValidPassword);
    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        inputChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: resetConfirmPassword,
    } = useInput(isValidConfirmationPassword(passwordValue));
    const {
        value: phoneValue,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        inputChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
        reset: resetPhone,
    } = useInput(isValidPhone);

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    let formIsValid = false;
    const [formIsTouched, setFormIsTouched] = useState(false);

    if (firstNameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid && phoneIsValid) {
        formIsValid = true
        setFormIsTouched(true)
    }

    const handleSubmit = async (event) => {
        try {
            setIsEditing(true)
            event.preventDefault();

            if (!formIsValid) {
                return;
            }

            const userData = {
                firstName: firstNameValue.trim(),
                lastName: lastNameValue.trim(),
                email: emailValue.trim(),
                password: passwordValue.trim(),
                phone: phoneValue.trim(),
            }
            console.log(userData)

            await axiosClient.post('/users', userData)
                .then((result) => {
                    setIsEditing(false)
                    resetFirstName();
                    resetLastName();
                    resetEmail();
                    resetPassword();
                    resetConfirmPassword();
                    resetPhone();
                    console.log(result)
                    // navigate("/login");
                }).catch((err) => {
                    console.log(err)
                });
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
                            isValid={!firstNameHasError}
                            value={firstNameValue}
                            onChange={firstNameChangeHandler}
                            onBlur={firstNameBlurHandler}
                            error="First Name must be at least 3 characters"
                        />
                        <Input
                            id="lastName" label="Last Name"
                            type="text"
                            className="input"
                            placeholder="Enter Your Last Name"
                            isValid={!lastNameHasError}
                            value={lastNameValue}
                            onChange={lastNameChangeHandler}
                        // onBlur={validateLastNameHandler}
                        // error="Name must be at least 3 characters"
                        />
                        <Input
                            id="email" label="Email"
                            type="email"
                            className="input"
                            placeholder="Enter Your Email"
                            isValid={!emailHasError}
                            value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            error="Invalid email address"
                        />
                        <Input
                            id="password" label="Password"
                            type="password"
                            className="input"
                            placeholder="Enter Your Password"
                            isValid={!passwordHasError}
                            value={passwordValue}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            error="Password must be at least 5 characters"
                        />
                        <Input
                            id="confirmPassword" label="Confirm Password"
                            type="password"
                            className="input"
                            placeholder="Enter Your Password"
                            isValid={!confirmPasswordHasError}
                            value={confirmPasswordValue}
                            onChange={confirmPasswordChangeHandler}
                            onBlur={confirmPasswordBlurHandler}
                            error="Password and confirm password do not match"
                        />
                        <Input
                            id="phone" label="Phone"
                            type="text"
                            className="input"
                            placeholder="Enter Your Phone Number"
                            isValid={!phoneHasError}
                            value={phoneValue}
                            onChange={phoneChangeHandler}
                            onBlur={phoneBlurHandler}
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