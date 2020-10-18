import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

const Navigation = ({ onButtonClick }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onButtonClick(searchValue);
    }
  };

  return (
    <Navbar collapseOnSelect bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="#home">CC-Weather</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto ">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#five-day-forecast">5 day forecast</Nav.Link>
          <Nav.Link href="#historical">Historical Weather</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSubmit}
          />
          <Button onClick={() => onButtonClick(searchValue)}>Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
