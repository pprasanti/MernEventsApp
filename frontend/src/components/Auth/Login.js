import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import axiosClient from '../../Utils/AxiosClient'
import Card from '../UI/Card'
import ErrorModal from '../UI/ErrorModal'
import './../../css/Login.css'
import Wrapper from './../Helpers/Wrapper'

const Login = () => {
    const [username, setUsername] = React.useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('');
    const validateEmpty = (value) => value == null || value.length === 0 || value === undefined;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // if (validateEmpty(username)) {
            //     setError('Username required');
            //     return;
            // }

            if (validateEmpty(email)) {
                setError('Email required');
                return;
            }

            if (validateEmpty(password)) {
                setError('Password required');
                return;
            }

            const response = await axiosClient.post("/auth/login", {
                // username: username,
                email: email,
                password: password,
            });
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            console.log(response.data.user.id);
            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data.user))
                localStorage.setItem("token", response.data.user.accessToken)
                navigate('/events');
            } else {
                setError('Invalid user credential');
            }
        } catch (e) {
            setError('Invalid user credential');
        }
    }


    const errorHandler = () => {
        setError(null)
    }

    return (
        <Wrapper>
            {error && <ErrorModal onConfirm={errorHandler} title={error.title} message={error.message}></ErrorModal>}
            <Card className="login">
                <div className="login__form">
                    <form className="loginForm" onSubmit={handleSubmit}>
                        {/* <span className="loginTitle"><b>Login</b></span> */}
                        <h1>Log In</h1>
                        {error && <p className="error">{error}</p>}
                        <div className='login__controls'>
                            <div className='login__control'>
                                {/* <label>Username </label>
                                <input type="text" className="loginInput" placeholder="Enter Your Username." value={username} onChange={(e) => setUsername(e.target.value)} /> */}
                                <label>Email </label>
                                <input type="text" className="loginInput" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='login__control'>
                                <label>Password </label>
                                <input type="password" className="loginInput" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='login__control'>
                                <button className="btn btn-success login__btn" type="submit">Login</button>
                                {/* <Link className="link loginRegisterButton" to='/register'>Register</Link> */}
                            </div>
                        </div>
                    </form>
                </div>
            </Card>
        </Wrapper>
    )
}

export default Login