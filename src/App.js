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
  const [loading, setLoading] = useState(true);

  const handleSearch = (s) => {
    setSearchText(s);
  };

  useEffect(() => {
    const getHourlyForecast = async () => {
      try {
        const response = await openw.get('/onecall', {
          params: {
            lat: curWeather.coord.lat,
            lon: curWeather.coord.lon,
          },
        });
        setHourlyForecast(response);
      } catch (err) {
        console.error = (msg) => {
          throw new Error(msg);
        };
      }
    };
    getHourlyForecast();
  }, [searchText, curWeather]);

  useEffect(() => {
    const getCurWeather = async () => {
      try {
        const response = await openw.get('/weather', {
          params: {
            q: searchText,
          },
        });
        setCurWeather(response.data);
        setLoading(false);
      } catch (err) {
        console.error = (msg) => {
          throw new Error(msg);
        };
      }
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
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : (
                  <CurWeather weather={curWeather} />
                )}
              </Col>
              <HourlyForecast forecast={hourlyForecast} />
            </Row>
          </Jumbotron>
        </Container>
      </div>
    </div>
  );
};
