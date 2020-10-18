import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Accordion,
  Jumbotron,
  Spinner,
} from 'react-bootstrap';
import openw from './api/openw';
import CurWeather from './components/CurWeather';
import Navigation from './components/Navigation';
import HourlyForecast from './components/HourlyForecast';

const App = () => {
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
      console.log(response.data);
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
      console.log(response.data);
    };
    getCurWeather();
  }, [searchText]);

  return (
    <div>
      <Navigation onButtonClick={handleSearch} />
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
                {forecastLoaded === false ? (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : (
                  <Accordion>
                    {Object.keys(hourlyForecast.hourly).map((key) => {
                      // Only show hourly data for 12 hours
                      if (key >= 12) {
                        return undefined;
                      }
                      return (
                        <HourlyForecast
                          key={key}
                          hour={hourlyForecast.hourly[key]}
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
