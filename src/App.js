import React from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';

import CurWeather from './components/currentWx/CurWeather';
import Navigation from './app/Navigation';
import HourlyForecast from './components/hourlyWx/HourlyForecast';
import GraphSelect from './components/historicalWx/GraphSelect';
import Historical from './components/historicalWx/Historical';

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
          <GraphSelect />
          <Historical />
        </Container>
      </div>
    </div>
  );
};

export default App;
