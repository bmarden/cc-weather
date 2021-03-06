import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Ring } from 'react-spinners-css';
import './Weather.css';
import CurWxItem from './CurWxItem';

const CurWeather = () => {
  const weatherStatus = useSelector((state) => state.weather.status);
  const search = useSelector((state) => state.search);
  const curWx = useSelector((state) => state.weather.curWx);

  const renderContent = () => {
    if (weatherStatus === 'loading' || weatherStatus === 'idle') {
      return (
        <div className="d-flex justify-content-center">
          <Ring color="#023e8aff">
            <span className="sr-only">Loading...</span>
          </Ring>
        </div>
      );
    } else if (weatherStatus === 'succeeded') {
      return (
        <>
          <Card.Title className="pb-3" as="h3">
            Current weather in {search.place.city}{' '}
          </Card.Title>
          <CurWxItem curWx={curWx} />
        </>
      );
    }
    // Default case
    return <p>Error loading content...</p>;
  };

  return (
    <Card className="mb-3 bg-gray">
      <Card.Body>{renderContent()}</Card.Body>
    </Card>
  );
};

export default CurWeather;
