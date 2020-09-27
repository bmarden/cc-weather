import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Search from './Search';

const Navigation = ({ setDailyForecast }) => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">CC-Weather</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#five-day-forecast">5 day forecast</Nav.Link>
          <Nav.Link href="#historical">Historical Weather</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
        <Search setDailyForecast={setDailyForecast} />
      </Navbar>
    </div>
  );
};

export default Navigation;
