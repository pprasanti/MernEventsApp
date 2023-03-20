import axios from 'axios';
import React from 'react';
import axiosClient from '../Utils/AxiosClient';

const AuthContext = React.createContext({
    user: false,
    isLoggedIn: false,
    error: false,
    onLogout: () => { },
    onLogin: (email, password) => { },
    onErrorConfirm: () => { }
})

export const AuthContextProvider = (props) => {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === '1') {
            setIsLoggedIn(true)
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token")
        localStorage.removeItem("isLoggedIn")
        setIsLoggedIn(false);
        setUser(false);
    }

    const loginHandler = async (email, password) => {
        try {
            const response = await axiosClient.post("/api/auth/login", {
                // username: enteredUsername,
                email: email,
                password: password,
            });

            if (response.status === 200 && response.data.status === 200) {
                console.log(JSON.stringify(response))
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.user.accessToken);
                localStorage.getItem('isLoggedIn', '1');
                setIsLoggedIn(true);
                setUser(JSON.parse(localStorage.getItem('user')));
                return true;
            } else {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
                setUser(false);
                setError({ title: "Login Error", message: "Invalid user credential" });
                return false;
            }
        } catch (error) {
            console.log(error)
            return false;
        }

    }

    const errorHandler = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user: user,
                isLoggedIn: isLoggedIn,
                error: error,
                onLogout: logoutHandler,
                onLogin: loginHandler,
                onErrorConfirm: errorHandler
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;