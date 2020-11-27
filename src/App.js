import React from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';

import CurWeather from './components/currentWx/CurWeather';
import Navigation from './app/Navigation';
import HourlyForecast from './components/hourlyWx/HourlyForecast';
import GraphSelect from './components/historicalWx/GraphSelect';
import Footer from './app/Footer';

const App = () => {
  return (
    <div>
      <Navigation />
      <div>
        <Container fluid="lg">
          <Jumbotron id="jumbo-weather">
            <h1>CC Weather</h1>
            <Row>
              <CurWeather />
              <HourlyForecast />
            </Row>
          </Jumbotron>
          <GraphSelect />
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default App;
