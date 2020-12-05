import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Card } from 'react-bootstrap';
import { iconMap } from '../../common/utils';
import { fetchCurWx } from '../currentWx/currentWxSlice';
import { Ring } from 'react-spinners-css';
import './CurWeather.css';

const CurWeather = () => {
  const dispatch = useDispatch();
  const curWxStatus = useSelector((state) => state.currentWx.status);
  const search = useSelector((state) => state.search);
  const curWx = useSelector((state) => state.currentWx.curWx);

  // If there isn't any weather loaded, dispatch with default location
  useEffect(() => {
    if (search.status === 'loaded') {
      dispatch(
        fetchCurWx({ lat: search.place.coords.lat, lon: search.place.coords.lng })
      );
    }
  }, [search, dispatch]);

  // Display spinner if data is still loading
  let content;
  if (curWxStatus === 'loading' || curWxStatus === 'idle') {
    content = (
      <div className="d-flex justify-content-center">
        <Ring color="#023e8aff">
          <span className="sr-only">Loading...</span>
        </Ring>
      </div>
    );
  } else if (curWxStatus === 'succeeded') {
    content = (
      <>
        <Card.Title as="h3">Current weather in {search.place.city} </Card.Title>
        <Row>
          <Col md={3}>
            <i className={`icon-cw-large mb-3 wi ${iconMap[curWx.weather[0].icon]}`} />
            <h3>{curWx.weather[0].main}</h3>
            <h2>{Math.round(curWx.temp)} &#176;F</h2>
          </Col>
          <Col md={9}>
            <ul>
              <li>Feels like: {Math.round(curWx.feels_like)}&#176;F</li>
              <li>Humidity: {curWx.humidity}%</li>
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
        </Row>
      </>
    );
  } else if (curWxStatus === 'failed') {
    content = <p>Error loading content...</p>;
  }

  return (
    <Card className="mb-3 bg-gray">
      <Card.Body>{content}</Card.Body>
    </Card>
  );
};

export default CurWeather;
