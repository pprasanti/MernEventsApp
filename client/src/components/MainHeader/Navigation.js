import React, { useContext } from 'react';
import '../../css/Common.css'
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import classes from './Navigation.module.css';
import AuthContext from '../../context/auth-context';

const Navigation = () => {
    const authCtx = useContext(AuthContext);

    return (
        <>
            <Navbar.Collapse className="d-flex justify-content-end">
                {!authCtx.isLoggedIn
                    ? (<Nav>
                        <Nav.Link as={NavLink} to={authCtx.isLoggedIn ? "/" : "/login"}>Login</Nav.Link>
                        <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                    </Nav>)
                    : (<Nav>
                        <Navbar.Text>
                            Signed in as: <a href="#login">{authCtx.user.email}</a>
                        </Navbar.Text>
                        <Nav.Link as={NavLink} to="/login" onClick={authCtx.onLogout}>Logout</Nav.Link>
                    </Nav>)
                }
            </Navbar.Collapse>
        </>
    )
}

export default Navigation;
