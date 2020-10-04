import React, { useState, useEffect, useCallback } from 'react';
import CurWeather from './components/CurWeather';
import HourlyForecast from './components/HourlyForecast';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Axios from 'axios';
import { Spinner } from 'react-bootstrap';

export default () => {
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [curWeather, setCurWeather] = useState(null);
  const [searchText, setSearchText] = useState('Chico, CA, USA');
  const [loading, setLoading] = useState(true);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    console.log(searchText);
  };

  useEffect(() => {
    const getHourlyForecast = async () => {
      try {
        const response = Axios.get(
          'https://api.openweathermap.org/data/2.5/forecast',
          {
            params: {
              q: searchText,
              units: 'imperial',
              appid: process.env.REACT_APP_OW_API_KEY,
            },
          }
        );
        setHourlyForecast(response);
      } catch (err) {
        console.log(err);
      }
    };
    getHourlyForecast();
  }, [searchText]);

  useEffect(() => {
    const getCurWeather = async () => {
      try {
        const response = await Axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              q: searchText,
              units: 'imperial',
              appid: process.env.REACT_APP_OW_API_KEY,
            },
          }
        );
        setCurWeather(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getCurWeather();
  }, [searchText]);

  return (
    <div>
      <Navigation onButtonClick={handleSearch} />
      <div>
        <Container>
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
        </Container>
      </div>
    </div>
  );
};
