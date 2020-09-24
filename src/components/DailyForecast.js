import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Search from './Search';

const DailyForecast = () => {
  return (
    <Jumbotron>
      <h1>
        CC Weather
        <Search onChange={() => null} />
      </h1>
      <div className="media"></div>
    </Jumbotron>
  );
};

export default DailyForecast;
