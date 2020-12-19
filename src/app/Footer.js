import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import acisImg from '../assets/acis.png';
import openwImg from '../assets/openw_logo.png';

const Footer = () => {
  return (
    <Navbar bg="#1CB5E0" sticky="bottom">
      <Navbar.Text>Data Provided By: &nbsp;</Navbar.Text>
      <Navbar.Brand href="http://www.rcc-acis.org/" target="_blank">
        <img
          alt="ACIS"
          title="ACIS"
          src={acisImg}
          width="100"
          className="d-inline-block align-top"
        ></img>
      </Navbar.Brand>
      <Navbar.Brand href="https://openweathermap.org" target="_blank">
        <img
          alt="openweathermap"
          title="openweathermap"
          src={openwImg}
          width="100"
          className="d-inline-block align-top"
        ></img>
      </Navbar.Brand>
      <Navbar.Text className="text-center">Created By: Ben Marden</Navbar.Text>
    </Navbar>
  );
};

export default Footer;
