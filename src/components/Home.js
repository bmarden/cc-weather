import React from 'react';
import Historical from './historicalWx/Historical';
import CurWeather from './weather/CurWeather';
import Welcome from './Welcome';

const Home = () => {
  return (
    <>
      <Welcome />
      <CurWeather />
      <Historical />
    </>
  );
};

export default Home;
