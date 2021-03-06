import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ccweather from '../assets/cc-weather.png';

const Navigation = () => {
  return (
    <Navbar collapseOnSelect bg="#000046" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        <img
          src={ccweather}
          className="d-inline-block align-top"
          alt="cc-weather"
          width="40"
          height="40"
        />
      </Navbar.Brand>
      <Navbar.Brand as={NavLink} to="/">
        CC Weather
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/hourly-weather">
            Hourly Weather
          </Nav.Link>
          <Nav.Link as={NavLink} to="/daily-weather">
            5 day forecast
          </Nav.Link>
          <Nav.Link as={NavLink} to="/historical-weather">
            Historical Weather
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
