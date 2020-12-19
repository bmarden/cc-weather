import React, { useEffect } from 'react';
import { Accordion, Col, Jumbotron, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Ring } from 'react-spinners-css';

import { fetchWeather } from './weatherSlice';
import ForecastItem from './ForecastItem';
import './Weather.css';

const HourlyForecast = () => {
  const dispatch = useDispatch();
  const weatherStatus = useSelector((state) => state.weather.status);
  const hourlyData = useSelector((state) => state.weather.hourlyWx);
  const search = useSelector((state) => state.search);

  useEffect(() => {
    if (search.status === 'loaded' && weatherStatus !== 'succeeded') {
      dispatch(
        fetchWeather({ lat: search.place.coords.lat, lon: search.place.coords.lng })
      );
    }
  }, [search, weatherStatus, dispatch]);

  const renderContent = () => {
    if (weatherStatus === 'loading' || weatherStatus === 'idle') {
      return (
        <div className="d-flex justify-content-center">
          <Ring color="#023e8aff">
            <span className="sr-only">Loading...</span>
          </Ring>
        </div>
      );
    } else if (weatherStatus === 'succeeded') {
      return hourlyData.map((hourWx, index) => {
        if (index < 12) {
          return <ForecastItem key={hourWx.dt} hourWx={hourWx} />;
        } else return undefined;
      });
    }
  };

  return (
    <>
      <Jumbotron className="bg-t-dark" id="jumbo-weather">
        <Row>
          <Col>
            <h1 className="text-center text-white-50">
              Hourly Weather Forecast - {search.place.city}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Accordion>{renderContent()}</Accordion>
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
};

export default HourlyForecast;
