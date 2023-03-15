import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import '../../css/Common.css'


const MainHeader = () => {
  return (
    <header className={classes['main-header']}>
      <Navbar variant={`dark ${classes['navbar']}`} >
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
          <Navigation />
        </Container >
      </Navbar >
    </header>
  );
};

export default MainHeader;
