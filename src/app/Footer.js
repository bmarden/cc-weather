import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import acisImg from './acis.png';

const Footer = () => {
  return (
    <Navbar bg="#1CB5E0" sticky="bottom">
      <Navbar.Brand href="http://www.rcc-acis.org/" target="_blank">
        Data Provided By: &nbsp;
        <img
          alt="ACIS"
          title="ACIS"
          src={acisImg}
          width="200"
          className="d-inline-block align-top"
        ></img>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Footer;
