import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Search from './Search';

const DailyForecast = () => {
  return (
    <Jumbotron>
      <h1>CC Weather</h1>
      <div>
        <Search onChange={() => null} />
      </div>
      <div className="media"></div>
    </Jumbotron>
  );
};

export default DailyForecast;
