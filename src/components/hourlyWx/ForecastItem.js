import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Accordion, Container, Row, Card } from 'react-bootstrap';
import { selectHourById } from './hourlyWxSlice';
import { convertUnixTime, capitalizeFirstChar, iconMap } from '../../common/utils';
import PropTypes from 'prop-types';

const ForecastItem = ({ hourWxId }) => {
  // Get data for the hour at hourWxId
  const hourForecast = useSelector((state) => selectHourById(state, hourWxId));

  return (
    <>
      <Card>
        <Accordion.Toggle as={Card.Header} variant="link" eventKey={hourWxId}>
          <Container>
            <Row>
              <Col md="3">
                <i className={`icon-hw wi ${iconMap[hourForecast.weather[0].icon]}`} />
                &nbsp; &nbsp;
                <span className="hf-title">{convertUnixTime(hourWxId)}</span>{' '}
              </Col>

              <Col md="3" className="text-left">
                <span className="hf-val">
                  {capitalizeFirstChar(hourForecast.weather[0].description)}{' '}
                </span>
              </Col>
              <Col md="3" className="text-center">
                <span className="hf-title">Temp: </span>{' '}
                <span className="hf-val">{Math.round(hourForecast.temp)}</span>
                <i className="icon-hw wi wi-fahrenheit" />
              </Col>
              <Col md="3">
                <span className="hf-title">Feels like: </span>{' '}
                <span className="hf-val">
                  {Math.round(hourForecast.feels_like)}
                  <i className="icon-hw wi wi-fahrenheit" />
                </span>
              </Col>
            </Row>
          </Container>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={hourWxId}>
          <Card.Body>
            <Container>
              <Row>
                <Col>Cloud cover: {hourForecast.clouds}%</Col>
                <Col>Humidity: {hourForecast.humidity}%</Col>
                <Col>Dew point: {hourForecast.dew_point}</Col>
                <Col>Pressure: {hourForecast.pressure}</Col>
              </Row>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
};

ForecastItem.propTypes = {
  hourWxId: PropTypes.number,
};

export default ForecastItem;
