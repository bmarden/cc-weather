import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Media, Col, Spinner, Card } from 'react-bootstrap';
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
        <Card.Title>Current weather in {curWx.name} </Card.Title>
        <Media>
          <i className={`icon-cw-large wi ${iconMap[curWx.weather[0].icon]}`} />
          <Media.Body>
            <h2>{Math.round(curWx.main.temp)} &#176; F</h2>
            <ul>
              <li>Feels like: {Math.round(curWx.main.feels_like)}&#176;F</li>
              <li>Conditions: {curWx.weather[0].main}</li>
              <li>
                Wind:{' '}
                <i className={`icon-cw wi wi-wind from-${curWx.wind.deg}-deg`}>
                  &nbsp;
                </i>
                {curWx.wind.speed}
              </li>
            </ul>
          </Media.Body>
        </Media>
      </>
    );
  } else {
    content = <p>Error loading content...</p>;
  }

  return (
    <Card className="bg-t-dark mb-3 text-white-50">
      <Card.Body>{content}</Card.Body>
    </Card>
  );
};

export default CurWeather;
