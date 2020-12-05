import React from 'react';
import { Accordion, Col, Jumbotron, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Ring } from 'react-spinners-css';

import ForecastItem from './ForecastItem';
import './Weather.css';

const HourlyForecast = () => {
  // const coords = useSelector((state) => state.currentWx.curWx.coord);
  const weatherStatus = useSelector((state) => state.weather.status);
  const hourlyData = useSelector((state) => state.weather.hourlyWx);

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
          return <ForecastItem key={index} hourWx={hourWx} />;
        } else return undefined;
      });
    }
  };

  return (
    <>
      <Jumbotron className="bg-t-dark" id="jumbo-weather">
        <Row>
          <Col lg="8">
            <Accordion>{renderContent()}</Accordion>
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
};

export default HourlyForecast;
