import React from 'react';
import { Col } from 'react-bootstrap';

const ForecastItem = ({ forecast }) => {
  const convertUnixTime = (dt) => {
    // Multiply by 1000 so arg is in milliseconds
    const date = new Date(dt * 1000);
    return date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
  };

  const capitalizeFirstChar = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  return (
    <>
      <Col md="3">
        {' '}
        <i
          className={`hf-icon wi wi-owm-${forecast.hourlyWx.weather[0].id}`}
        />{' '}
        &nbsp; &nbsp;
        <span className="hf-title">{convertUnixTime(forecast.dt)}</span>{' '}
      </Col>

      <Col md="3" className="text-left">
        <span className="hf-val">
          {capitalizeFirstChar(forecast.weather[0].description)}{' '}
        </span>
      </Col>
      <Col md="3" className="text-center">
        <span className="hf-title">Temp: </span>{' '}
        <span className="hf-val">{Math.round(forecast.temp)} &#176;F </span>
      </Col>
      <Col md="3">
        <span className="hf-title">Feels like: </span>{' '}
        <span className="hf-val">
          {Math.round(forecast.feels_like)} &#176;F{' '}
        </span>
      </Col>
    </>
  );
};

export default ForecastItem;
