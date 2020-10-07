import React from 'react';
import './packages/weather-icons/css/weather-icons.min.css';
import { Row, Accordion, Card, Container, Col } from 'react-bootstrap';
import './HourlyForecast.css';

const HourlyForecast = ({ hour, id }) => {
  console.log(hour);
  // Convert the unix time stamp to a local time
  const convertUnixTime = (dt) => {
    // Multiply by 1000 so arg is in milliseconds
    let date = new Date(dt * 1000);
    return date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
  };

  const capitalizeFirstChar = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        variant="link"
        eventKey={id.toString()}
      >
        <Container>
          <Row>
            <Col md="3">
              {' '}
              <i className={`hf-icon wi wi-owm-${hour.weather[0].id}`} /> &nbsp;
              &nbsp;
              <span className="hf-title">{convertUnixTime(hour.dt)}</span>{' '}
            </Col>

            <Col md="3" className="text-left">
              <span className="hf-val">
                {capitalizeFirstChar(hour.weather[0].description)}{' '}
              </span>
            </Col>
            <Col md="3" className="text-center">
              <span className="hf-title">Temp: </span>{' '}
              <span className="hf-val">{Math.round(hour.temp)} &#176;F </span>
            </Col>
            <Col md="3">
              <span className="hf-title">Feels like: </span>{' '}
              <span className="hf-val">
                {Math.round(hour.feels_like)} &#176;F{' '}
              </span>
            </Col>
          </Row>
        </Container>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={id.toString()}>
        <Card.Body>
          <Container>
            <Row>
              <Col>Feels like: {hour.feels_like} &#176;F</Col>
              <Col>Cloud cover: {hour.clouds}%</Col>
              <Col>Humidity: {hour.humidity}%</Col>
              <Col>Dew point: {hour.dew_point}</Col>
            </Row>
          </Container>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default HourlyForecast;
