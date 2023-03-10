import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import '../../css/Common.css'
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";


const TopBar = () => {

  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem('user'))
  );
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem("token")
    setUser(null);
  }

  return (
    <>
      <Navbar bg="primary" variant="dark" >
        <Container>
          <Navbar.Brand as={NavLink} to="/" >
            <Image className='logo-img' fluid="true" rounded="true"
              roundedCircle="true"
              thumbnail="true" src='/images.png' ></Image>
            <label className='logo-text'>&nbsp;Live Space </label>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">About</Nav.Link>
            <Nav.Link as={NavLink} to="/events">Events</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {
              !user ? (
                <Nav>
                  <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                  <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                </Nav>
              )
                : (
                  <Nav>
                    <Navbar.Text>
                      Signed in as: <a href="#login">{user.email}</a>
                    </Navbar.Text>
                    <Nav.Link as={NavLink} to="/login" onClick={handleLogout}>Logout</Nav.Link>
                  </Nav>
                )
            }
          </Navbar.Collapse>
        </Container >
      </Navbar >
    </>
  )
}
export default TopBar