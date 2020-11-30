import React from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';

import CurWeather from './components/currentWx/CurWeather';
import Navigation from './app/Navigation';
import HourlyForecast from './components/hourlyWx/HourlyForecast';
import GraphSelect from './components/historicalWx/GraphSelect';
import Footer from './app/Footer';
import Search from './components/search/Search';

const App = () => {
  return (
    <div>
      <Navigation />
      <Container className="mt-3 mb-3">
        <div className="d-flex justify-content-center">
          <Search />
        </div>
      </Container>
      <Container fluid="lg">
        <CurWeather />
        <Jumbotron className="bg-t-dark" id="jumbo-weather">
          <Row>
            <HourlyForecast />
          </Row>
        </Jumbotron>
        <GraphSelect />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
