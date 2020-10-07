import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Jumbotron, Spinner } from 'react-bootstrap';
import openw from './api/openw';
import CurWeather from './components/CurWeather';
import Navigation from './components/Navigation';
import HourlyForecast from './components/HourlyForecast';

export default () => {
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [curWeather, setCurWeather] = useState(null);
  const [searchText, setSearchText] = useState('Chico, CA, USA');
  const [weatherLoaded, setWeatherLoaded] = useState(false);
  const [forecastLoaded, setForecastLoaded] = useState(false);

  const handleSearch = (s) => {
    setSearchText(s);
  };

  useEffect(() => {
    if (curWeather == null) {
      return;
    }
    const getHourlyForecast = async () => {
      const response = await openw.get('/onecall', {
        params: {
          lat: curWeather.coord.lat,
          lon: curWeather.coord.lon,
        },
      });
      setHourlyForecast(response.data);
      setForecastLoaded(true);
    };
    getHourlyForecast();
  }, [searchText, curWeather]);

  useEffect(() => {
    const getCurWeather = async () => {
      const response = await openw.get('/weather', {
        params: {
          q: searchText,
        },
      });
      setCurWeather(response.data);
      setWeatherLoaded(true);
    };
    getCurWeather();
  }, [searchText]);

  return (
    <div>
      <Navigation onButtonClick={handleSearch} />
      <div>
        <h1>CC Weather</h1>
        <Container>
          <Jumbotron id="jumbo-weather">
            <Row>
              <Col>
                {weatherLoaded === false ? (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : (
                  <CurWeather weather={curWeather} />
                )}
              </Col>
              {forecastLoaded === false ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                hourlyForecast.hourly.map((item) => (
                  <HourlyForecast hour={item} />
                ))
              )}
            </Row>
          </Jumbotron>
        </Container>
      </div>
    </div>
  );
};
