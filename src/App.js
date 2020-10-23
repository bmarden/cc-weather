import React from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';

import CurWeather from './components/currentWx/CurWeather';
import Navigation from './app/Navigation';
import HourlyForecast from './components/hourlyWx/HourlyForecast';

const App = () => {
  return (
    <div>
      <Navigation />
      <div>
        <Container>
          <Jumbotron id="jumbo-weather">
            <h1>CC Weather</h1>
            <Row>
              <CurWeather />
              <HourlyForecast />
            </Row>
          </Jumbotron>
        </Container>
      </div>
    </div>
  );
};

export default App;
