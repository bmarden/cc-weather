import React from 'react';
import { Col, Row, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { format, fromUnixTime } from 'date-fns';
import { iconMap } from '../../common/utils';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Weather.css';

const CurWxItem = ({ curWx }) => {
  return (
    <Row>
      <Col md={3}>
        <i className={`icon-cw-large mb-3 wi ${iconMap[curWx.weather[0].icon]}`} />
        <h3>{curWx.weather[0].main}</h3>
        <h2>{Math.round(curWx.temp)} &#176;F</h2>
      </Col>
      <Col md={3}>
        <ul>
          <li>Feels like: {Math.round(curWx.feels_like)}&#176;F</li>
          <li>Humidity: {curWx.humidity}%</li>
          <li>Dew Point: {Math.round(curWx.dew_point)}&#176;F</li>
          <li>Pressure: {(curWx.pressure / 33.86).toFixed(2)} in</li>
          <li>
            <div>
              <span>Wind:</span>
              <div className="icon-wrap">
                <i className={`icon-wind wi wi-wind from-${curWx.wind_deg}-deg`}></i>
              </div>
              <span>{curWx.wind_speed}</span>
            </div>
          </li>
        </ul>
      </Col>
      <Col md={3}>
        <Row className="mb-3">
          <OverlayTrigger overlay={<Tooltip>Sunrise</Tooltip>}>
            <i className="wi wi-sunrise icon-cw"></i>
          </OverlayTrigger>
          <span className="h5">{format(fromUnixTime(new Date(curWx.sunrise)), 'p')}</span>
        </Row>
        <Row>
          <OverlayTrigger overlay={<Tooltip>Sunset</Tooltip>}>
            <i className="wi wi-sunset icon-cw"></i>
          </OverlayTrigger>
          <span className="h5">{format(fromUnixTime(new Date(curWx.sunset)), 'p')}</span>
        </Row>
      </Col>
      <Col>
        <Row className="mb-3">
          <Button as={Link} to="/hourly-weather" className="btn-cw" variant="primary">
            Hourly Weather
          </Button>
        </Row>
        <Row>
          <Button as={Link} to="/daily-weather" className="btn-cw" variant="primary">
            Daily Forecast
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

CurWxItem.propTypes = {
  curWx: PropTypes.object,
};

export default CurWxItem;
