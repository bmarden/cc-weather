import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import Navigation from './components/Navigation';

export default () => {
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [curWeather, setCurWeather] = useState(null);
  const [searchText, setSearchText] = useState('Chico, CA, USA');

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    console.log(searchText);
  };

  useEffect(() => {
    const getHourlyForecast = async () => {
      try {
        const response = Axios.get(
          'https://api.openweathermap.org/data/2.5/forecast',
          {
            params: {
              q: searchText,
              units: 'imperial',
              appid: process.env.REACT_APP_OW_API_KEY,
            },
          }
        );
        setHourlyForecast(response);
      } catch (err) {
        console.log(err);
      }
    };
    getHourlyForecast();
  }, [searchText]);

  return (
    <div>
      <Navigation onButtonClick={handleSearch} />
      <div>
        <HourlyForecast forecast={hourlyForecast} />
        {/* <DailyForecast hourlyForecast={hourlyForecast} /> */}
      </div>
    </div>
  );
};
