import React from 'react';
import '../../packages/weather-icons/css/weather-icons.min.css';
import '../../packages/weather-icons/css/weather-icons-wind.min.css';
import { Row, Accordion, Card, Container, Col, Spinner } from 'react-bootstrap';
import './HourlyForecast.css';
import ForecastItem from './ForecastItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchHourlyWx } from './hourlyWxSlice';

const HourlyForecast = () => {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.currentWx.curWx.coord);
  const hourlyWxStatus = useSelector((state) => state.hourlyWx.status);
  const forecast = useSelector((state) => state.hourlyWx.hourlyWx);

  let content;
  const id = 0;

  useEffect(() => {
    if (coords != null) {
      dispatch(fetchHourlyWx());
    } else {
      console.log('not loading');
    }
  }, [coords, dispatch]);

  return (
    <>
      {hourlyWxStatus === 'loading' ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        forecast.map((item, index) => (
          <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey={index}>
              <Container>
                <Row>
                  <ForecastItem item={item} />
                </Row>
              </Container>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index}>
              <Card.Body>
                <Container>
                  <Row>
                    <Col>Cloud cover: {item.clouds}%</Col>
                    <Col>Humidity: {item.humidity}%</Col>
                    <Col>Dew point: {item.dew_point}</Col>
                    <Col>Pressure: {item.pressure}</Col>
                  </Row>
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))
      )}
    </>
  );
};

export default HourlyForecast;
