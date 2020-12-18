import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { fetchWeather } from './weatherSlice';
import { Ring } from 'react-spinners-css';
import './Weather.css';
import CurWxItem from './CurWxItem';

const CurWeather = () => {
  const dispatch = useDispatch();
  const weatherStatus = useSelector((state) => state.weather.status);
  const search = useSelector((state) => state.search);
  const curWx = useSelector((state) => state.weather.curWx);

  // If there isn't any weather loaded, dispatch with default location
  useEffect(() => {
    if (search.status === 'loaded' && weatherStatus !== 'succeeded') {
      dispatch(
        fetchWeather({ lat: search.place.coords.lat, lon: search.place.coords.lng })
      );
    }
  }, [search, weatherStatus, dispatch]);

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
          <Card.Title as="h3">Current weather in {search.place.city} </Card.Title>
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
