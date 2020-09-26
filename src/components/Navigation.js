import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Search from './Search';

const Navigation = () => {
  const [place, setPlace] = useState('');

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
        <Search onChange={() => place} />
      </Navbar>
    </div>
  );
};

export default Navigation;
