import React, { useEffect } from 'react';
import { Jumbotron, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Ring } from 'react-spinners-css';
import DailyWxItem from './DailyWxItem';

import { fetchWeather } from './weatherSlice';

const DailyWeather = () => {
  const dispatch = useDispatch();
  const weatherStatus = useSelector((state) => state.weather.status);
  const dailyForecast = useSelector((state) => state.weather.dailyWx);
  const search = useSelector((state) => state.search);

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
      return dailyForecast.map((dailyWx, index) => {
        if (index < 4) {
          return <DailyWxItem key={dailyWx.dt} dailyWx={dailyWx} />;
        } else return undefined;
      });
    }
  };
  return (
    <Jumbotron className="bg-t-dark">
      <h1 className="text-center text-white-50">5 Day Forecast - {search.place.city}</h1>
      <Row>{renderContent()}</Row>
    </Jumbotron>
  );
};

export default DailyWeather;
