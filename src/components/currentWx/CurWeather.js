import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Spinner, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { iconMap } from '../../common/utils';
import './CurWeather.css';
import { fetchCurWx } from '../currentWx/currentWxSlice';

const CurWeather = () => {
  const dispatch = useDispatch();
  const curWxStatus = useSelector((state) => state.currentWx.status);
  const curWx = useSelector((state) => state.currentWx.curWx);

  // If there isn't any weather loaded, dispatch with default location
  useEffect(() => {
    if (curWxStatus === 'idle') {
      dispatch(fetchCurWx('Chico, CA, USA'));
    }
  }, [curWxStatus, dispatch]);

  // Display spinner if data is still loading
  let content;
  if (curWxStatus === 'loading') {
    content = (
      <Spinner animation="grow" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else if (curWxStatus === 'succeeded') {
    content = (
      <>
        <Card.Title as="h3">Current weather in {curWx.name} </Card.Title>
        <Row>
          <Col md={3}>
            <i
              className={`icon-cw-large mb-3 wi ${
                iconMap[curWx.weather[0].icon]
              }`}
            />
            <h3>{curWx.weather[0].main}</h3>
            <h2>{Math.round(curWx.main.temp)} &#176;F</h2>
          </Col>
          <Col md={9}>
            <ul>
              <li>Feels like: {Math.round(curWx.main.feels_like)}&#176;F</li>
              <li>Humidity: {curWx.main.humidity}%</li>
              <li>Pressure: {(curWx.main.pressure / 33.86).toFixed(2)} in</li>
              <li>
                <div>
                  <span>Wind:</span>
                  <div className="icon-wrap">
                    <i
                      className={`icon-wind wi wi-wind from-${curWx.wind.deg}-deg`}
                    ></i>
                  </div>
                  <span>{curWx.wind.speed}</span>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </>
    );
  } else {
    content = <p>Error loading content...</p>;
  }

  return (
    <Card className="mb-3 bg-gray">
      <Card.Body>{content}</Card.Body>
    </Card>
  );
};

export default CurWeather;
