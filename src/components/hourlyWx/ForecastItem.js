import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Accordion, Container, Row, Card } from 'react-bootstrap';
import { selectHourById } from './hourlyWxSlice';
import { convertUnixTime, capitalizeFirstChar } from '../../common/utils';

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
                {' '}
                <i
                  className={`hf-icon wi wi-owm-${hourForecast.weather[0].id}`}
                />{' '}
                &nbsp; &nbsp;
                <span className="hf-title">
                  {convertUnixTime(hourWxId)}
                </span>{' '}
              </Col>

              <Col md="3" className="text-left">
                <span className="hf-val">
                  {capitalizeFirstChar(hourForecast.weather[0].description)}{' '}
                </span>
              </Col>
              <Col md="3" className="text-center">
                <span className="hf-title">Temp: </span>{' '}
                <span className="hf-val">
                  {Math.round(hourForecast.temp)} &#176;F{' '}
                </span>
              </Col>
              <Col md="3">
                <span className="hf-title">Feels like: </span>{' '}
                <span className="hf-val">
                  {Math.round(hourForecast.feels_like)} &#176;F{' '}
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

export default ForecastItem;