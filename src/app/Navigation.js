import React, { Component } from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateSearchTerm, fetchCurWeather } from '../actions';

class Navigation extends Component {
  handleUpdateTerm = (e) => {
    this.props.updateSearchTerm(e.target.value);
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  handleSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.fetchCurWeather();
    }
  };

  render() {
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
              value={this.props.term}
              onChange={this.handleUpdateTerm}
              onKeyDown={this.handleSubmit}
            />
            <Button onClick="">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return { term: state.term, weather: state.weather };
};

export default connect(mapStateToProps, { updateSearchTerm, fetchCurWeather })(
  Navigation
);
