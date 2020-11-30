import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar collapseOnSelect bg="#000046" variant="dark" expand="lg">
      <Navbar.Brand href="#home">CC-Weather</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#five-day-forecast">5 day forecast</Nav.Link>
          <Nav.Link href="#historical">Historical Weather</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
