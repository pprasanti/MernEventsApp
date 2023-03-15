import React, { useState, useRef, useEffect, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import Login from "./Login.module.css";
import Wrapper from "./../Helpers/Wrapper";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button";
import Input from "../UI/Input";

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@') }
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.isValid }
    }
    return { value: '', isValid: false }
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.trim().length > 5 }
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.isValid }
    }
    return { value: '', isValid: false }
};

const LoginForm = () => {
    // Use Ref
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext)

    const [error, setError] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
    const navigate = useNavigate();

    const [emailState, dispatchEmail] = useReducer(emailReducer,
        { value: "", isValid: false, }
    )

    const [passwordState, dispatchPassword] = useReducer(passwordReducer,
        { value: "", isValid: false, }
    )

    const { isValid: emailIsValid } = emailState
    const { isValid: passwordIsValid } = passwordState

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                emailIsValid && passwordIsValid
            )
        }, 500);

        return () => {
            clearTimeout(identifier);
        }
    }, [emailIsValid, passwordIsValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
        setFormIsValid(
            event.target.value.includes('@') && passwordState.isValid
        );
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value })
        setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6
        );
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' })
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR' })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailState.isValid) {
            setError({ title: "Email required", message: "Email can't be empty" });
            return;
        }

        if (!passwordState.isValid) {
            setError({
                title: "Password required",
                message: "Password can't be empty",
            });
            return;
        }

        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value)
            if (authCtx.isLoggedIn === '1') {
                navigate("/");
            }
        } else if (!emailIsValid) {
            emailInputRef.current.focus()
        } else {
            passwordInputRef.current.focus()
        }
    };

    // const errorHandler = () => {
    //     authCtx.setError(null);
    // };

    return (
        <Wrapper>
            {authCtx.error && (
                <ErrorModal
                    title={authCtx.error.title}
                    message={authCtx.error.message}
                    onConfirm={authCtx.onErrorConfirm}
                />
            )}
            <Card className={Login.login}>
                <h1>Log In</h1>
                <form className={Login.form} onSubmit={handleSubmit}>
                    <div className={Login.controls}>
                        <Input
                            ref={emailInputRef}
                            id="email" label="Email"
                            type="email"
                            className="input"
                            placeholder="Enter Your Email"
                            isValid={emailState.isValid}
                            value={emailState.value}
                            onChange={emailChangeHandler}
                            onBlur={validateEmailHandler}
                        />
                        <Input
                            ref={passwordInputRef}
                            id="password" label="Password"
                            type="password"
                            className="input"
                            placeholder="Enter Your Password"
                            isValid={passwordState.isValid}
                            value={passwordState.value}
                            onChange={passwordChangeHandler}
                            onBlur={validatePasswordHandler}
                        />
                        <div className={Login.action}>
                            <Button className={` ${Login.btn}`} type="submit" disabled={!formIsValid}>
                                Login
                            </Button>
                            {/* <Link className="link loginRegisterButton" to='/register'>Register</Link> */}
                        </div>
                    </div>
                </form>
            </Card>
        </Wrapper >
    );
};

export default LoginForm;
