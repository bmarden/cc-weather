import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

const Navigation = ({ onButtonClick }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onButtonClick(searchValue);
    }
  };

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
        {/* <Search setDailyForecast={setDailyForecast} /> */}
      </Navbar>
    </div>
  );
};

export default Navigation;
