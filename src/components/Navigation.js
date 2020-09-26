import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';
import Search from './Search';

const Navigation = () => {
  const [place, setPlace] = useState('');
  console.log(place);
  console.log(place.formatted_address);
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
        <Search onChange={(place) => setPlace(place)} />
        {/* <Form inline>
          <FormControl
            type="text"
            placeholder="Enter a City"
            className="mr-sm-2"
          />
          <Button size="sm" variant="outline-info">
            Search
          </Button>
        </Form> */}
      </Navbar>
    </div>
  );
};

export default Navigation;
