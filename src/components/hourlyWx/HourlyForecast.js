import React, { useEffect } from 'react';
import { Accordion, Spinner, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import './HourlyForecast.css';
import '../../packages/weather-icons/css/weather-icons.min.css';
import '../../packages/weather-icons/css/weather-icons-wind.min.css';

import { fetchHourlyWx, selectAllHours } from './hourlyWxSlice';
import ForecastItem from './ForecastItem';

const HourlyForecast = () => {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.currentWx.curWx.coord);
  const hourlyWxStatus = useSelector((state) => state.hourlyWx.status);
  const hours = useSelector(selectAllHours);

  useEffect(() => {
    if (coords) {
      dispatch(fetchHourlyWx({ lat: coords.lat, lon: coords.lon }));
    }
  }, [coords, dispatch]);

  let content;

  if (hourlyWxStatus === 'loading' || hourlyWxStatus === 'idle') {
    content = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else if (hourlyWxStatus === 'succeeded') {
    content = hours.map((hourWxId, index) => {
      if (index < 12) {
        return <ForecastItem key={hourWxId} hourWxId={hourWxId} />;
      } else return undefined;
    });
  }

  return (
    <>
      <Col lg="8">
        <Accordion>{content}</Accordion>
      </Col>
    </>
  );
};

export default HourlyForecast;
