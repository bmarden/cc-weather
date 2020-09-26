import React from 'react';
import DailyForecast from './components/DailyForecast';
import Navigation from './components/Navigation';

export default () => {
  return (
    <div>
      <Navigation />
      <div>
        <DailyForecast />
      </div>
    </div>
  );
};
