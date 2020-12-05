import React from 'react';
import { Col, Accordion, Container, Row, Card } from 'react-bootstrap';
import { convertUnixTime, capitalizeFirstChar, iconMap } from '../../common/utils';
import PropTypes from 'prop-types';

const ForecastItem = ({ hourWx }) => {
  // Get data for the hour at hourWx

  return (
    <>
      <Card>
        <Accordion.Toggle as={Card.Header} variant="link" eventKey={hourWx.dt}>
          <Container>
            <Row>
              <Col md="3">
                <i className={`icon-hw wi ${iconMap[hourWx.weather[0].icon]}`} />
                &nbsp; &nbsp;
                <span className="hf-title">{convertUnixTime(hourWx.dt)}</span>{' '}
              </Col>

              <Col md="3" className="text-left">
                <span className="hf-val">
                  {capitalizeFirstChar(hourWx.weather[0].description)}{' '}
                </span>
              </Col>
              <Col md="3" className="text-center">
                <span className="hf-title">Temp: </span>{' '}
                <span className="hf-val">{Math.round(hourWx.temp)}</span>
                <i className="icon-hw wi wi-fahrenheit" />
              </Col>
              <Col md="3">
                <span className="hf-title">Feels like: </span>{' '}
                <span className="hf-val">
                  {Math.round(hourWx.feels_like)}
                  <i className="icon-hw wi wi-fahrenheit" />
                </span>
              </Col>
            </Row>
          </Container>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={hourWx}>
          <Card.Body>
            <Container>
              <Row>
                <Col>Cloud cover: {hourWx.clouds}%</Col>
                <Col>Humidity: {hourWx.humidity}%</Col>
                <Col>Dew point: {hourWx.dew_point}</Col>
                <Col>Pressure: {hourWx.pressure}</Col>
              </Row>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
};

ForecastItem.propTypes = {
  hourWx: PropTypes.object,
};

export default ForecastItem;
