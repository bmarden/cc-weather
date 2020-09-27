import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Search from './Search';

const DailyForecast = ({ forecast }) => {
  // Holds the place returned from Search

  return (
    <Jumbotron>
      <h1>CC Weather</h1>
      <div className="media"></div>
    </Jumbotron>
  );
};

export default DailyForecast;
