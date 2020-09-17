import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

const DailyForecast = () => {
  return (
    <Jumbotron>
      <h1>
        CC Weather
        <input type="search"></input>
      </h1>
      <div className="media"></div>
    </Jumbotron>
  );
};

export default DailyForecast;
