import React, { useEffect } from 'react';
import { Accordion, Col, Jumbotron, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import './HourlyForecast.css';

import { fetchHourlyWx, selectAllHours } from './hourlyWxSlice';
import ForecastItem from './ForecastItem';
import { Ring } from 'react-spinners-css';

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
      <div className="d-flex justify-content-center">
        <Ring color="#023e8aff">
          <span className="sr-only">Loading...</span>
        </Ring>
      </div>
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
      <Jumbotron className="bg-t-dark" id="jumbo-weather">
        <Row>
          <Col lg="8">
            <Accordion>{content}</Accordion>
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
};

export default HourlyForecast;
