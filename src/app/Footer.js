import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import acisImg from '../assets/acis.png';
import openwImg from '../assets/openw_logo.png';

const Footer = () => {
  return (
    <Navbar bg="#1CB5E0" sticky="bottom">
      <Navbar.Brand href="http://www.rcc-acis.org/" target="_blank">
        Data Provided By: &nbsp;
        <img
          alt="ACIS"
          title="ACIS"
          src={acisImg}
          width="150"
          className="d-inline-block align-top"
        ></img>
      </Navbar.Brand>
      <Navbar.Brand href="https://openweathermap.org" target="_blank">
        <img
          alt="openweathermap"
          title="openweathermap"
          src={openwImg}
          width="150"
          className="d-inline-block align-top"
        ></img>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Footer;
