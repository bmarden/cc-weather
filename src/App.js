import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Accordion,
  Jumbotron,
  Spinner,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchHourlyForecast } from './actions';
import CurWeather from './components/currentWx/CurWeather';
import Navigation from './app/Navigation';
import HourlyForecast from './components/hourlyWx/HourlyForecast';

const App = () => {
  // const [hourlyForecast, setHourlyForecast] = useState(null);
  // const [curWeather, setCurWeather] = useState(null);
  // const [searchText, setSearchText] = useState('Chico, CA, USA');
  // const [weatherLoaded, setWeatherLoaded] = useState(false);
  // const [forecastLoaded, setForecastLoaded] = useState(false);

  const weatherLoaded = false;
  const curWeather = {};
  // const { forecast } = this.props;
  return (
    <div>
      <Navigation />
      <div>
        <Container>
          <Jumbotron id="jumbo-weather">
            <h1>CC Weather</h1>
            <Row>
              <Col md="12" lg="4">
                {weatherLoaded === false ? (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : (
                  <CurWeather weather={curWeather} />
                )}
              </Col>
              <Col lg="8">
                {this.props.forecast.isLoaded === false ? (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : (
                  <Accordion>
                    {Object.keys(this.props.forecast.data.hourly).map((key) => {
                      // Only show hourly data for 12 hours
                      if (key >= 12) {
                        return undefined;
                      }
                      return (
                        <HourlyForecast
                          key={key}
                          hour={this.props.forecast.data.hourly[key]}
                          id={key}
                        />
                      );
                    })}
                  </Accordion>
                )}
              </Col>
            </Row>
          </Jumbotron>
        </Container>
      </div>
    </div>
  );
};

export default App;
